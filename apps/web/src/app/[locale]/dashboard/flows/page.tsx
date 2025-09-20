"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@turbostarter/ui-web/button";
import {
  Plus,
  Play,
  Pause,
  Settings,
  Edit3,
  Trash2,
  Archive,
  FileText,
  Clock,
  TrendingUp,
  Users,
  Mail,
  List,
  PenTool,
  Save,
  Upload,
} from "lucide-react";
import Link from "next/link";
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AgentNode } from "~/components/agent-node";
import { WORKFLOW_TEMPLATES, workflowToReactFlow, type AgentWorkflow } from "~/lib/agent-workflow";

// Mock data for development - will be replaced with database queries
const mockFlows = [
  {
    id: "flow_1",
    name: "Monthly Upgrade Campaign",
    description: "Engage monthly donors for upgrade opportunities based on giving history",
    template: "MONTHLY_UPGRADE",
    status: "ACTIVE",
    lastRun: "2 hours ago",
    runCount: 156,
    successRate: "78%",
    createdAt: "2024-09-01",
    pendingApprovals: 3,
  },
  {
    id: "flow_2",
    name: "Lapsed Donor Reactivation",
    description: "Re-engage donors who haven't given in the past 12 months",
    template: "LAPSED_REACTIVATION",
    status: "DRAFT",
    lastRun: "Never",
    runCount: 0,
    successRate: "N/A",
    createdAt: "2024-09-18",
    pendingApprovals: 0,
  },
  {
    id: "flow_3",
    name: "Matching Gift Follow-up",
    description: "Automated follow-up for potential matching gift donors",
    template: "MATCHING_GIFT",
    status: "PAUSED",
    lastRun: "1 day ago",
    runCount: 42,
    successRate: "92%",
    createdAt: "2024-08-15",
    pendingApprovals: 1,
  },
];

// Agent workflow templates
const agentWorkflowTemplates = [
  {
    type: "NEW_DONOR_WELCOME",
    name: "New Donor Welcome",
    description: "Welcome new donors with personalized messaging",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    type: "LAPSED_REACTIVATION",
    name: "Lapsed Donor Reactivation",
    description: "Re-engage donors who haven't given recently",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    type: "MAJOR_GIFT_PROSPECTING",
    name: "Major Gift Prospecting",
    description: "Identify and cultivate major gift prospects",
    icon: Mail,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

const statusColors = {
  ACTIVE: "bg-green-100 text-green-800",
  DRAFT: "bg-gray-100 text-gray-800",
  PAUSED: "bg-yellow-100 text-yellow-800",
  ARCHIVED: "bg-red-100 text-red-800",
};

// Agent Workflow Canvas Component
interface AgentWorkflowCanvasProps {
  workflowToLoad?: keyof typeof WORKFLOW_TEMPLATES | null;
  onWorkflowLoaded?: () => void;
}

function AgentWorkflowCanvas({ workflowToLoad, onWorkflowLoaded }: AgentWorkflowCanvasProps) {
  const [currentWorkflow, setCurrentWorkflow] = useState<AgentWorkflow | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Initialize with template or empty workflow
  const initialWorkflow = useMemo(() => {
    if (workflowToLoad && WORKFLOW_TEMPLATES[workflowToLoad]) {
      return WORKFLOW_TEMPLATES[workflowToLoad];
    }
    return null;
  }, [workflowToLoad]);

  // Convert workflow to React Flow format
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    if (initialWorkflow) {
      return workflowToReactFlow(initialWorkflow);
    }
    return { nodes: [], edges: [] };
  }, [initialWorkflow]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Custom node types
  const nodeTypes = useMemo(() => ({
    agentNode: AgentNode,
  }), []);

  // Handle workflow execution
  const handleExecuteWorkflow = useCallback(async () => {
    setIsExecuting(true);
    // TODO: Implement actual workflow execution with Vercel AI SDK agents
    console.log('Executing workflow:', currentWorkflow);

    // Simulate execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExecuting(false);
  }, [currentWorkflow]);

  const handleSaveDraft = useCallback(() => {
    // TODO: Save workflow to database
    console.log('Saving draft workflow with nodes:', nodes, 'edges:', edges);
  }, [nodes, edges]);

  const handleSaveAndActivate = useCallback(() => {
    // TODO: Save and activate workflow
    console.log('Saving and activating workflow');
    handleSaveDraft();
    handleExecuteWorkflow();
  }, [handleSaveDraft, handleExecuteWorkflow]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Agent Workflow Canvas</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
              <span className="text-sm text-muted-foreground">
                {isExecuting ? 'Executing workflow...' : 'Ready'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-1" />
              Save Draft
            </Button>
            <Button size="sm" onClick={handleSaveAndActivate}>
              <Play className="h-4 w-4 mr-1" />
              Save & Activate
            </Button>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="w-full h-[600px] rounded border overflow-hidden bg-white">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#f1f5f9" />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                const nodeData = node.data as any;
                return nodeData.config?.bgColor || '#f1f5f9';
              }}
              className="!bg-white !border !border-gray-200"
            />
          </ReactFlow>
        </div>

        {/* Workflow Info */}
        {initialWorkflow && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">{initialWorkflow.name}</h4>
            <p className="text-sm text-blue-700">{initialWorkflow.description}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-blue-600">
              <span>{nodes.length} nodes</span>
              <span>{edges.length} connections</span>
              <span>Status: Draft</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FlowsPage() {
  const [activeTab, setActiveTab] = useState<"list" | "canvas">("list");
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof WORKFLOW_TEMPLATES | null>(null);

  const handleUseTemplate = useCallback((templateType: string) => {
    if (templateType in WORKFLOW_TEMPLATES) {
      setSelectedTemplate(templateType as keyof typeof WORKFLOW_TEMPLATES);
      setActiveTab("canvas");
    }
  }, []);

  const handleTemplateLoaded = useCallback(() => {
    setSelectedTemplate(null);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Donor Flows
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            Create and manage AI-powered donor engagement workflows
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setActiveTab("canvas")}
            className="flex items-center gap-2"
          >
            <PenTool className="h-4 w-4" />
            Flow Designer
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href="/dashboard/flows/new">
              <Plus className="h-4 w-4" />
              Quick Create
            </Link>
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "list"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Flow List
            </div>
          </button>
          <button
            onClick={() => setActiveTab("canvas")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "canvas"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Flow Canvas
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "list" ? (
        <FlowListContent onUseTemplate={handleUseTemplate} />
      ) : (
        <ReactFlowProvider>
          <AgentWorkflowCanvas workflowToLoad={selectedTemplate} onWorkflowLoaded={handleTemplateLoaded} />
        </ReactFlowProvider>
      )}
    </div>
  );
}

// Extracted Flow List Content
interface FlowListContentProps {
  onUseTemplate: (templateType: string) => void;
}

function FlowListContent({ onUseTemplate }: FlowListContentProps) {
  return (
    <>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">{mockFlows.filter(f => f.status === 'ACTIVE').length}</div>
          <p className="text-sm text-muted-foreground">Active Flows</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">{mockFlows.reduce((sum, f) => sum + f.runCount, 0)}</div>
          <p className="text-sm text-muted-foreground">Total Runs</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">{mockFlows.reduce((sum, f) => sum + f.pendingApprovals, 0)}</div>
          <p className="text-sm text-muted-foreground">Pending Approvals</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">83%</div>
          <p className="text-sm text-muted-foreground">Avg Success Rate</p>
        </div>
      </div>

      {/* Quick Start Templates */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Quick Start Templates</h2>
          <p className="text-sm text-muted-foreground">
            Choose from pre-built templates optimized for nonprofit fundraising
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {agentWorkflowTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.type}
                  className={`group relative cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${template.borderColor} hover:border-primary`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-2 ${template.bgColor}`}>
                      <Icon className={`h-5 w-5 ${template.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-primary">
                        {template.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => onUseTemplate(template.type)}
                  >
                    Use Template
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flows Table */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Your Flows</h2>
        </div>
        <div className="divide-y">
          {mockFlows.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 p-3">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium">No flows yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Get started by creating your first donor engagement flow
              </p>
              <Button asChild>
                <Link href="/dashboard/flows/new">Create Your First Flow</Link>
              </Button>
            </div>
          ) : (
            mockFlows.map((flow) => (
              <div key={flow.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{flow.name}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[flow.status as keyof typeof statusColors]
                        }`}
                      >
                        {flow.status}
                      </span>
                      {flow.pendingApprovals > 0 && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                          {flow.pendingApprovals} pending approval{flow.pendingApprovals !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {flow.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        <span>{flow.runCount} runs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{flow.successRate} success</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Last run: {flow.lastRun}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Template: {flow.template.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {flow.status === "ACTIVE" ? (
                      <Button size="sm" variant="outline" title="Pause flow">
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : flow.status === "PAUSED" ? (
                      <Button size="sm" variant="outline" title="Resume flow">
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" title="Activate flow">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline" asChild title="Edit flow">
                      <Link href={`/dashboard/flows/${flow.id}/edit`}>
                        <Edit3 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" title="Archive flow">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Delete flow">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}