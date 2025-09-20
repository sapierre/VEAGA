import { z } from "zod";
import { Node, Edge } from "reactflow";

// Node types for the agent workflow
export const AgentNodeTypeSchema = z.enum([
  'input',
  'orchestration',
  'welcome',
  'reactivation',
  'major-gift',
  'decision',
  'approval',
  'email',
  'sms',
  'handwritten',
  'output'
]);

export type AgentNodeType = z.infer<typeof AgentNodeTypeSchema>;

// Agent workflow node schema
export const AgentWorkflowNodeSchema = z.object({
  id: z.string(),
  type: AgentNodeTypeSchema,
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  data: z.object({
    label: z.string(),
    description: z.string().optional(),
    config: z.record(z.any()).optional(),
    agentPrompt: z.string().optional(),
    tools: z.array(z.string()).optional()
  })
});

export type AgentWorkflowNode = z.infer<typeof AgentWorkflowNodeSchema>;

// Agent workflow edge schema
export const AgentWorkflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
  data: z.object({
    condition: z.string().optional(),
    label: z.string().optional()
  }).optional()
});

export type AgentWorkflowEdge = z.infer<typeof AgentWorkflowEdgeSchema>;

// Complete agent workflow schema
export const AgentWorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  nodes: z.array(AgentWorkflowNodeSchema),
  edges: z.array(AgentWorkflowEdgeSchema),
  variables: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    default: z.any().optional()
  })).optional()
});

export type AgentWorkflow = z.infer<typeof AgentWorkflowSchema>;

// Pre-built workflow templates
export const WORKFLOW_TEMPLATES: Record<string, AgentWorkflow> = {
  NEW_DONOR_WELCOME: {
    id: "new_donor_welcome",
    name: "New Donor Welcome",
    description: "Welcome new donors with personalized messaging",
    nodes: [
      {
        id: "input-1",
        type: "input",
        position: { x: 100, y: 100 },
        data: {
          label: "Donor Upload",
          description: "Upload CSV of new donors"
        }
      },
      {
        id: "orchestration-1",
        type: "orchestration",
        position: { x: 300, y: 100 },
        data: {
          label: "Orchestration Agent",
          description: "Analyze donor data and route to appropriate agents",
          agentPrompt: "You are a donor engagement orchestration agent. Analyze donor data and determine the best welcome strategy based on gift amount, channel preference, and engagement indicators."
        }
      },
      {
        id: "welcome-1",
        type: "welcome",
        position: { x: 500, y: 100 },
        data: {
          label: "Welcome Agent",
          description: "Generate personalized welcome messages",
          agentPrompt: "You are an AI Engagement Specialist. Create warm, personalized welcome messages for new donors expressing gratitude and highlighting impact."
        }
      },
      {
        id: "approval-1",
        type: "approval",
        position: { x: 700, y: 100 },
        data: {
          label: "Gift Officer Approval",
          description: "Human review before sending"
        }
      },
      {
        id: "email-1",
        type: "email",
        position: { x: 900, y: 50 },
        data: {
          label: "Send Email",
          description: "Send via ESP"
        }
      },
      {
        id: "sms-1",
        type: "sms",
        position: { x: 900, y: 150 },
        data: {
          label: "Send SMS",
          description: "Send via SMS provider"
        }
      }
    ],
    edges: [
      { id: "e1", source: "input-1", target: "orchestration-1" },
      { id: "e2", source: "orchestration-1", target: "welcome-1" },
      { id: "e3", source: "welcome-1", target: "approval-1" },
      { id: "e4", source: "approval-1", target: "email-1", data: { condition: "channel === 'email'" } },
      { id: "e5", source: "approval-1", target: "sms-1", data: { condition: "channel === 'sms'" } }
    ]
  },

  LAPSED_REACTIVATION: {
    id: "lapsed_reactivation",
    name: "Lapsed Donor Reactivation",
    description: "Re-engage donors who haven't given recently",
    nodes: [
      {
        id: "input-1",
        type: "input",
        position: { x: 100, y: 100 },
        data: {
          label: "Lapsed Donor List",
          description: "Upload CSV of lapsed donors"
        }
      },
      {
        id: "orchestration-1",
        type: "orchestration",
        position: { x: 300, y: 100 },
        data: {
          label: "Orchestration Agent",
          description: "Analyze lapse duration and past engagement",
          agentPrompt: "Analyze lapsed donor data including last gift date, total giving history, and past campaign responses to determine reactivation strategy."
        }
      },
      {
        id: "reactivation-1",
        type: "reactivation",
        position: { x: 500, y: 100 },
        data: {
          label: "Reactivation Agent",
          description: "Generate compelling reactivation messages",
          agentPrompt: "Create personalized reactivation messages that acknowledge the donor's past support and present compelling reasons to give again."
        }
      },
      {
        id: "approval-1",
        type: "approval",
        position: { x: 700, y: 100 },
        data: {
          label: "Campaign Approval",
          description: "Review reactivation messaging"
        }
      },
      {
        id: "email-1",
        type: "email",
        position: { x: 900, y: 100 },
        data: {
          label: "Send Reactivation Email",
          description: "Multi-step email sequence"
        }
      }
    ],
    edges: [
      { id: "e1", source: "input-1", target: "orchestration-1" },
      { id: "e2", source: "orchestration-1", target: "reactivation-1" },
      { id: "e3", source: "reactivation-1", target: "approval-1" },
      { id: "e4", source: "approval-1", target: "email-1" }
    ]
  }
};

// Node configuration for different agent types
export const NODE_CONFIGS: Record<AgentNodeType, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  defaultTools?: string[];
}> = {
  input: {
    label: "Input",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: "📥"
  },
  orchestration: {
    label: "Orchestration Agent",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: "🎯",
    defaultTools: ["donorLookup", "segmentAnalyzer", "routingDecision"]
  },
  welcome: {
    label: "Welcome Agent",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: "👋",
    defaultTools: ["contentGenerator", "personalization", "impactCalculator"]
  },
  reactivation: {
    label: "Reactivation Agent",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    icon: "🔄",
    defaultTools: ["lapseAnalyzer", "contentGenerator", "engagementScorer"]
  },
  "major-gift": {
    label: "Major Gift Agent",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: "💎",
    defaultTools: ["capacityAnalyzer", "contentGenerator", "meetingScheduler"]
  },
  decision: {
    label: "Decision Point",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: "🔀"
  },
  approval: {
    label: "Human Approval",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    icon: "✋"
  },
  email: {
    label: "Send Email",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: "📧",
    defaultTools: ["emailSender", "espIntegration", "deliveryTracker"]
  },
  sms: {
    label: "Send SMS",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: "📱",
    defaultTools: ["smsSender", "twilioIntegration", "deliveryTracker"]
  },
  handwritten: {
    label: "Handwritten Note",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: "✍️",
    defaultTools: ["handwrittenAPI", "addressValidator"]
  },
  output: {
    label: "Output",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    icon: "📤"
  }
};

// Convert workflow to React Flow format
export function workflowToReactFlow(workflow: AgentWorkflow): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = workflow.nodes.map(node => ({
    id: node.id,
    type: 'agentNode',
    position: node.position,
    data: {
      ...node.data,
      nodeType: node.type,
      config: NODE_CONFIGS[node.type]
    }
  }));

  const edges: Edge[] = workflow.edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: edge.type || 'smoothstep',
    label: edge.data?.label,
    data: edge.data
  }));

  return { nodes, edges };
}