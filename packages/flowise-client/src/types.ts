import { z } from "zod";

// Chatflow types
export const ChatflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  flowData: z.string(),
  deployed: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  type: z.enum(["CHATFLOW", "MULTIAGENT"]).optional(),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
  apiConfig: z.any().optional(),
  category: z.string().optional(),
});

export type Chatflow = z.infer<typeof ChatflowSchema>;

// Prediction types
export const PredictionRequestSchema = z.object({
  chatflowId: z.string(),
  question: z.string(),
  overrideConfig: z
    .object({
      sessionId: z.string().optional(),
      returnSourceDocuments: z.boolean().optional(),
      systemMessage: z.string().optional(),
      temperature: z.number().optional(),
      maxTokens: z.number().optional(),
      variables: z.record(z.any()).optional(),
    })
    .optional(),
  streaming: z.boolean().optional(),
  uploads: z.array(z.any()).optional(),
});

export type PredictionRequest = z.infer<typeof PredictionRequestSchema>;

export const PredictionResponseSchema = z.object({
  text: z.string(),
  sourceDocuments: z.array(z.any()).optional(),
  sessionId: z.string().optional(),
  messageId: z.string().optional(),
  memoryType: z.string().optional(),
  agentReasoning: z.array(z.any()).optional(),
  artifacts: z.array(z.any()).optional(),
  usedTools: z.array(z.any()).optional(),
});

export type PredictionResponse = z.infer<typeof PredictionResponseSchema>;

// Variable types
export const VariableSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.any(),
  type: z.enum(["string", "number", "boolean", "json"]).optional(),
});

export type Variable = z.infer<typeof VariableSchema>;

// Document Store types
export const DocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  loaders: z.array(z.string()).optional(),
  status: z.enum(["PROCESSING", "READY", "ERROR"]).optional(),
});

export type Document = z.infer<typeof DocumentSchema>;

export const DocumentStoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  documents: z.array(DocumentSchema).optional(),
  vectorStoreId: z.string().optional(),
});

export type DocumentStore = z.infer<typeof DocumentStoreSchema>;

// Vector Store types
export const VectorStoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  embeddingModel: z.string().optional(),
  dimension: z.number().optional(),
});

export type VectorStore = z.infer<typeof VectorStoreSchema>;

// File Upload types
export const FileUploadSchema = z.object({
  fileName: z.string(),
  mimeType: z.string(),
  data: z.string(), // Base64 encoded
});

export type FileUpload = z.infer<typeof FileUploadSchema>;

// API Response wrapper
export const ApiResponseSchema = <T extends z.ZodType>(
  dataSchema: T
) =>
  z.object({
    data: dataSchema,
    success: z.boolean().optional(),
    message: z.string().optional(),
  });

// HITL Approval types
export const ApprovalNodeStateSchema = z.object({
  nodeId: z.string(),
  sessionId: z.string(),
  state: z.enum(["WAITING_APPROVAL", "APPROVED", "REJECTED"]),
  content: z.any(),
  metadata: z.record(z.any()).optional(),
});

export type ApprovalNodeState = z.infer<typeof ApprovalNodeStateSchema>;

// Stream event types for SSE
export const StreamEventSchema = z.object({
  event: z.string(),
  data: z.any(),
});

export type StreamEvent = z.infer<typeof StreamEventSchema>;

// Error types
export const FlowiseErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
});

export type FlowiseError = z.infer<typeof FlowiseErrorSchema>;

// Client configuration
export const FlowiseClientConfigSchema = z.object({
  baseUrl: z.string().url(),
  apiKey: z.string().optional(),
  timeout: z.number().optional().default(30000),
  maxRetries: z.number().optional().default(3),
  headers: z.record(z.string()).optional(),
});

export type FlowiseClientConfig = z.infer<typeof FlowiseClientConfigSchema>;