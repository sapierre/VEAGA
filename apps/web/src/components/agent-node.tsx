import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Button } from '@turbostarter/ui-web/button';
import { Settings, Play, Pause } from 'lucide-react';
import { AgentNodeType, NODE_CONFIGS } from '~/lib/agent-workflow';

interface AgentNodeData {
  label: string;
  description?: string;
  nodeType: AgentNodeType;
  config: {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: string;
  };
  isExecuting?: boolean;
  executionStatus?: 'pending' | 'running' | 'completed' | 'error';
  agentPrompt?: string;
}

export const AgentNode = memo(({ data, selected }: NodeProps<AgentNodeData>) => {
  const { label, description, nodeType, config, isExecuting, executionStatus } = data;

  const getStatusColor = () => {
    switch (executionStatus) {
      case 'running':
        return 'border-blue-400 bg-blue-50';
      case 'completed':
        return 'border-green-400 bg-green-50';
      case 'error':
        return 'border-red-400 bg-red-50';
      default:
        return config.borderColor + ' ' + config.bgColor;
    }
  };

  const getStatusIndicator = () => {
    if (isExecuting) {
      return (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
      );
    }

    switch (executionStatus) {
      case 'completed':
        return (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
        );
      case 'error':
        return (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        );
      default:
        return null;
    }
  };

  const showInputHandle = !['input'].includes(nodeType);
  const showOutputHandle = !['output', 'email', 'sms', 'handwritten'].includes(nodeType);

  return (
    <div className={`relative min-w-[200px] rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    } ${getStatusColor()}`}>
      {/* Input Handle */}
      {showInputHandle && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 border-2 border-white bg-gray-400"
        />
      )}

      {/* Status Indicator */}
      {getStatusIndicator()}

      {/* Node Content */}
      <div className="flex items-start gap-3">
        <div className="text-2xl">{config.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`text-sm font-semibold ${config.color}`}>
              {label}
            </h3>
            {['orchestration', 'welcome', 'reactivation', 'major-gift'].includes(nodeType) && (
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            )}
          </div>

          {description && (
            <p className="text-xs text-gray-600 mb-2 leading-tight">
              {description}
            </p>
          )}

          {/* Agent-specific info */}
          {['orchestration', 'welcome', 'reactivation', 'major-gift'].includes(nodeType) && (
            <div className="text-xs text-gray-500">
              Agent ready
            </div>
          )}

          {/* Approval node status */}
          {nodeType === 'approval' && (
            <div className="text-xs text-orange-600 font-medium">
              Awaiting review
            </div>
          )}

          {/* Execution controls for action nodes */}
          {['email', 'sms', 'handwritten'].includes(nodeType) && (
            <div className="flex items-center gap-1 mt-2">
              <Button size="sm" variant="ghost" className="h-6 px-2">
                <Play className="h-3 w-3" />
              </Button>
              <span className="text-xs text-gray-500">Ready to send</span>
            </div>
          )}
        </div>
      </div>

      {/* Output Handle */}
      {showOutputHandle && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 border-2 border-white bg-gray-400"
        />
      )}
    </div>
  );
});

AgentNode.displayName = 'AgentNode';