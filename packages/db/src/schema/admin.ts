import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { organizations } from "./flows";

// Agent template status
export const agentTemplateStatusEnum = pgEnum("agent_template_status", [
  "draft",
  "published",
  "deprecated"
]);

// Execution status
export const executionStatusEnum = pgEnum("execution_status", [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
]);

// Agent templates - reusable agent configurations
export const agentTemplates = pgTable("agent_templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  nodeType: text("node_type").notNull(), // matches AgentNodeType
  systemPrompt: text("system_prompt").notNull(),
  tools: jsonb("tools").$type<string[]>().default([]),
  configuration: jsonb("configuration").$type<Record<string, unknown>>().default({}),
  status: agentTemplateStatusEnum("status").default("draft"),
  version: text("version").notNull().default("1.0.0"),
  createdBy: text("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
}, (table) => ({
  nodeTypeIdx: index("agent_templates_node_type_idx").on(table.nodeType),
  statusIdx: index("agent_templates_status_idx").on(table.status),
  createdByIdx: index("agent_templates_created_by_idx").on(table.createdBy),
}));

// Workflow execution logs - track all workflow runs
export const workflowExecutions = pgTable("workflow_executions", {
  id: text("id").primaryKey(),
  workflowId: text("workflow_id").notNull(),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
  triggeredBy: text("triggered_by").notNull().references(() => users.id),
  status: executionStatusEnum("status").default("pending"),
  startedAt: timestamp("started_at").$defaultFn(() => new Date()).notNull(),
  completedAt: timestamp("completed_at"),
  duration: integer("duration"), // in milliseconds
  nodeExecutions: jsonb("node_executions").$type<unknown[]>().default([]),
  inputData: jsonb("input_data").$type<Record<string, unknown>>().default({}),
  outputData: jsonb("output_data").$type<Record<string, unknown>>().default({}),
  error: text("error"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
}, (table) => ({
  workflowIdx: index("workflow_executions_workflow_idx").on(table.workflowId),
  orgIdx: index("workflow_executions_org_idx").on(table.organizationId),
  statusIdx: index("workflow_executions_status_idx").on(table.status),
  startedAtIdx: index("workflow_executions_started_at_idx").on(table.startedAt),
  triggeredByIdx: index("workflow_executions_triggered_by_idx").on(table.triggeredBy),
}));

// Agent execution logs - detailed logs for each agent node execution
export const agentExecutions = pgTable("agent_executions", {
  id: text("id").primaryKey(),
  workflowExecutionId: text("workflow_execution_id").notNull().references(() => workflowExecutions.id),
  nodeId: text("node_id").notNull(),
  nodeType: text("node_type").notNull(),
  agentTemplateId: text("agent_template_id").references(() => agentTemplates.id),
  status: executionStatusEnum("status").default("pending"),
  startedAt: timestamp("started_at").$defaultFn(() => new Date()).notNull(),
  completedAt: timestamp("completed_at"),
  duration: integer("duration"), // in milliseconds
  inputTokens: integer("input_tokens").default(0),
  outputTokens: integer("output_tokens").default(0),
  cost: integer("cost").default(0), // in cents
  inputData: jsonb("input_data").$type<Record<string, unknown>>().default({}),
  outputData: jsonb("output_data").$type<Record<string, unknown>>().default({}),
  error: text("error"),
  logs: jsonb("logs").$type<unknown[]>().default([]),
}, (table) => ({
  workflowExecutionIdx: index("agent_executions_workflow_execution_idx").on(table.workflowExecutionId),
  nodeIdx: index("agent_executions_node_idx").on(table.nodeId),
  statusIdx: index("agent_executions_status_idx").on(table.status),
  startedAtIdx: index("agent_executions_started_at_idx").on(table.startedAt),
  agentTemplateIdx: index("agent_executions_agent_template_idx").on(table.agentTemplateId),
}));

// System health monitoring
export const systemHealth = pgTable("system_health", {
  id: text("id").primaryKey(),
  metric: text("metric").notNull(),
  value: text("value").notNull(),
  timestamp: timestamp("timestamp").$defaultFn(() => new Date()).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
}, (table) => ({
  metricIdx: index("system_health_metric_idx").on(table.metric),
  timestampIdx: index("system_health_timestamp_idx").on(table.timestamp),
}));

// API key management for AI providers
export const apiKeys = pgTable("api_keys", {
  id: text("id").primaryKey(),
  provider: text("provider").notNull(), // openai, anthropic, etc.
  name: text("name").notNull(),
  keyHash: text("key_hash").notNull(), // hashed for security
  isActive: boolean("is_active").default(true),
  usageLimit: integer("usage_limit"), // monthly limit in cents
  currentUsage: integer("current_usage").default(0),
  organizationId: text("organization_id").references(() => organizations.id), // null for global keys
  createdBy: text("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  lastUsedAt: timestamp("last_used_at"),
}, (table) => ({
  providerIdx: index("api_keys_provider_idx").on(table.provider),
  orgIdx: index("api_keys_org_idx").on(table.organizationId),
  isActiveIdx: index("api_keys_is_active_idx").on(table.isActive),
}));