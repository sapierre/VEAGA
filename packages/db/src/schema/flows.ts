import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "../utils/ids";
import { users } from "./auth";

// Enums
export const flowTemplate = pgEnum("flow_template", [
  "MONTHLY_UPGRADE",
  "LAPSED_REACTIVATION",
  "MATCHING_GIFT",
  "CUSTOM",
]);

export const flowStatus = pgEnum("flow_status", [
  "DRAFT",
  "ACTIVE",
  "PAUSED",
  "ARCHIVED",
]);

export const approvalStatus = pgEnum("approval_status", [
  "PENDING",
  "APPROVED",
  "EDITED",
  "REJECTED",
]);

export const kbStatus = pgEnum("kb_status", [
  "PROCESSING",
  "READY",
  "ERROR",
]);

export const metricType = pgEnum("metric_type", [
  "FLOW_RUN",
  "TOKENS_USED",
  "DOCUMENTS_PROCESSED",
  "EMAILS_SENT",
  "SMS_SENT",
  "APPROVALS_PROCESSED",
]);

// Organizations table for multi-tenancy
export const organizations = pgTable("organizations", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tables
export const donorFlows = pgTable(
  "donor_flows",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    organizationId: varchar("organization_id", { length: 128 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),
    templateType: flowTemplate("template_type"),
    flowiseId: varchar("flowise_id", { length: 128 }).notNull().unique(),
    flowiseData: json("flowise_data").notNull(),
    
    status: flowStatus("status").default("DRAFT").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    lastRunAt: timestamp("last_run_at"),
    runCount: integer("run_count").default(0).notNull(),
    
    createdById: varchar("created_by_id", { length: 128 })
      .notNull()
      .references(() => users.id),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ([
    index("donor_flows_org_idx").on(table.organizationId),
    index("donor_flows_flowise_idx").on(table.flowiseId),
    index("donor_flows_status_idx").on(table.status),
  ])
);

export const flowApprovals = pgTable(
  "flow_approvals",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    organizationId: varchar("organization_id", { length: 128 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    
    flowId: varchar("flow_id", { length: 128 })
      .notNull()
      .references(() => donorFlows.id, { onDelete: "cascade" }),
    
    sessionId: varchar("session_id", { length: 256 }).notNull(),
    draftContent: json("draft_content").notNull(),
    editedContent: json("edited_content"),
    metadata: json("metadata"),
    
    status: approvalStatus("status").default("PENDING").notNull(),
    approverId: varchar("approver_id", { length: 128 })
      .references(() => users.id),
    approvedAt: timestamp("approved_at"),
    rejectionReason: text("rejection_reason"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ([
    index("flow_approvals_org_idx").on(table.organizationId),
    index("flow_approvals_flow_idx").on(table.flowId),
    index("flow_approvals_status_idx").on(table.status),
    index("flow_approvals_session_idx").on(table.sessionId),
  ])
);

export const knowledgeBases = pgTable(
  "knowledge_bases",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    organizationId: varchar("organization_id", { length: 128 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    
    fileName: varchar("file_name", { length: 256 }).notNull(),
    fileUrl: text("file_url").notNull(),
    fileSize: integer("file_size").notNull(),
    mimeType: varchar("mime_type", { length: 128 }).notNull(),
    
    vectorStoreId: varchar("vector_store_id", { length: 128 }),
    documentStoreId: varchar("document_store_id", { length: 128 }),
    status: kbStatus("status").default("PROCESSING").notNull(),
    processingError: text("processing_error"),
    
    metadata: json("metadata"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ([
    index("knowledge_bases_org_idx").on(table.organizationId),
    index("knowledge_bases_status_idx").on(table.status),
  ])
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    organizationId: varchar("organization_id", { length: 128 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => users.id),
    
    flowId: varchar("flow_id", { length: 128 })
      .references(() => donorFlows.id),
    
    action: varchar("action", { length: 128 }).notNull(),
    details: json("details"),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ([
    index("audit_logs_org_idx").on(table.organizationId),
    index("audit_logs_user_idx").on(table.userId),
    index("audit_logs_action_idx").on(table.action),
    index("audit_logs_created_at_idx").on(table.createdAt),
  ])
);

export const usageMetrics = pgTable(
  "usage_metrics",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    organizationId: varchar("organization_id", { length: 128 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    
    flowId: varchar("flow_id", { length: 128 })
      .references(() => donorFlows.id),
    
    metricType: metricType("metric_type").notNull(),
    value: integer("value").notNull(),
    metadata: json("metadata"),
    
    billingPeriod: timestamp("billing_period").notNull(),
    reportedToStripe: boolean("reported_to_stripe").default(false).notNull(),
    stripeEventId: varchar("stripe_event_id", { length: 256 }),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ([
    index("usage_metrics_org_idx").on(table.organizationId),
    index("usage_metrics_type_idx").on(table.metricType),
    index("usage_metrics_billing_period_idx").on(table.billingPeriod),
    index("usage_metrics_reported_idx").on(table.reportedToStripe),
  ])
);

export const organizationSettings = pgTable(
  "organization_settings",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    organizationId: varchar("organization_id", { length: 128 })
      .notNull()
      .unique()
      .references(() => organizations.id, { onDelete: "cascade" }),
    
    // Encrypted credentials
    espCredentials: json("esp_credentials"),
    twilioCredentials: json("twilio_credentials"),
    crmCredentials: json("crm_credentials"),
    
    // Policy settings
    quietHours: json("quiet_hours"), // {start: "21:00", end: "09:00"}
    consentFlags: json("consent_flags"), // GDPR/compliance
    frequencyCaps: json("frequency_caps"), // {daily: 2, weekly: 5}
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ([
    index("organization_settings_org_idx").on(table.organizationId),
  ])
);

// Relations
export const donorFlowsRelations = relations(donorFlows, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [donorFlows.organizationId],
    references: [organizations.id],
  }),
  createdBy: one(users, {
    fields: [donorFlows.createdById],
    references: [users.id],
  }),
  approvals: many(flowApprovals),
  auditLogs: many(auditLogs),
  usageMetrics: many(usageMetrics),
}));

export const flowApprovalsRelations = relations(flowApprovals, ({ one }) => ({
  organization: one(organizations, {
    fields: [flowApprovals.organizationId],
    references: [organizations.id],
  }),
  flow: one(donorFlows, {
    fields: [flowApprovals.flowId],
    references: [donorFlows.id],
  }),
  approver: one(users, {
    fields: [flowApprovals.approverId],
    references: [users.id],
  }),
}));

export const knowledgeBasesRelations = relations(knowledgeBases, ({ one }) => ({
  organization: one(organizations, {
    fields: [knowledgeBases.organizationId],
    references: [organizations.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [auditLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
  flow: one(donorFlows, {
    fields: [auditLogs.flowId],
    references: [donorFlows.id],
  }),
}));

export const usageMetricsRelations = relations(usageMetrics, ({ one }) => ({
  organization: one(organizations, {
    fields: [usageMetrics.organizationId],
    references: [organizations.id],
  }),
  flow: one(donorFlows, {
    fields: [usageMetrics.flowId],
    references: [donorFlows.id],
  }),
}));

export const organizationSettingsRelations = relations(organizationSettings, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationSettings.organizationId],
    references: [organizations.id],
  }),
}));