CREATE TYPE "public"."approval_status" AS ENUM('PENDING', 'APPROVED', 'EDITED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."flow_status" AS ENUM('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."flow_template" AS ENUM('MONTHLY_UPGRADE', 'LAPSED_REACTIVATION', 'MATCHING_GIFT', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."kb_status" AS ENUM('PROCESSING', 'READY', 'ERROR');--> statement-breakpoint
CREATE TYPE "public"."metric_type" AS ENUM('FLOW_RUN', 'TOKENS_USED', 'DOCUMENTS_PROCESSED', 'EMAILS_SENT', 'SMS_SENT', 'APPROVALS_PROCESSED');--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"organization_id" varchar(128) NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"flow_id" varchar(128),
	"action" varchar(128) NOT NULL,
	"details" json,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donor_flows" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"organization_id" varchar(128) NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"template_type" "flow_template",
	"flowise_id" varchar(128) NOT NULL,
	"flowise_data" json NOT NULL,
	"status" "flow_status" DEFAULT 'DRAFT' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"last_run_at" timestamp,
	"run_count" integer DEFAULT 0 NOT NULL,
	"created_by_id" varchar(128) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "donor_flows_flowise_id_unique" UNIQUE("flowise_id")
);
--> statement-breakpoint
CREATE TABLE "flow_approvals" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"organization_id" varchar(128) NOT NULL,
	"flow_id" varchar(128) NOT NULL,
	"session_id" varchar(256) NOT NULL,
	"draft_content" json NOT NULL,
	"edited_content" json,
	"metadata" json,
	"status" "approval_status" DEFAULT 'PENDING' NOT NULL,
	"approver_id" varchar(128),
	"approved_at" timestamp,
	"rejection_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_bases" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"organization_id" varchar(128) NOT NULL,
	"file_name" varchar(256) NOT NULL,
	"file_url" text NOT NULL,
	"file_size" integer NOT NULL,
	"mime_type" varchar(128) NOT NULL,
	"vector_store_id" varchar(128),
	"document_store_id" varchar(128),
	"status" "kb_status" DEFAULT 'PROCESSING' NOT NULL,
	"processing_error" text,
	"metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_settings" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"organization_id" varchar(128) NOT NULL,
	"esp_credentials" json,
	"twilio_credentials" json,
	"crm_credentials" json,
	"quiet_hours" json,
	"consent_flags" json,
	"frequency_caps" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organization_settings_organization_id_unique" UNIQUE("organization_id")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"owner_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "usage_metrics" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"organization_id" varchar(128) NOT NULL,
	"flow_id" varchar(128),
	"metric_type" "metric_type" NOT NULL,
	"value" integer NOT NULL,
	"metadata" json,
	"billing_period" timestamp NOT NULL,
	"reported_to_stripe" boolean DEFAULT false NOT NULL,
	"stripe_event_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_flow_id_donor_flows_id_fk" FOREIGN KEY ("flow_id") REFERENCES "public"."donor_flows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_flows" ADD CONSTRAINT "donor_flows_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_flows" ADD CONSTRAINT "donor_flows_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flow_approvals" ADD CONSTRAINT "flow_approvals_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flow_approvals" ADD CONSTRAINT "flow_approvals_flow_id_donor_flows_id_fk" FOREIGN KEY ("flow_id") REFERENCES "public"."donor_flows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flow_approvals" ADD CONSTRAINT "flow_approvals_approver_id_users_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_bases" ADD CONSTRAINT "knowledge_bases_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_settings" ADD CONSTRAINT "organization_settings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_metrics" ADD CONSTRAINT "usage_metrics_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_metrics" ADD CONSTRAINT "usage_metrics_flow_id_donor_flows_id_fk" FOREIGN KEY ("flow_id") REFERENCES "public"."donor_flows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_logs_org_idx" ON "audit_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "audit_logs_user_idx" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "donor_flows_org_idx" ON "donor_flows" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "donor_flows_flowise_idx" ON "donor_flows" USING btree ("flowise_id");--> statement-breakpoint
CREATE INDEX "donor_flows_status_idx" ON "donor_flows" USING btree ("status");--> statement-breakpoint
CREATE INDEX "flow_approvals_org_idx" ON "flow_approvals" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "flow_approvals_flow_idx" ON "flow_approvals" USING btree ("flow_id");--> statement-breakpoint
CREATE INDEX "flow_approvals_status_idx" ON "flow_approvals" USING btree ("status");--> statement-breakpoint
CREATE INDEX "flow_approvals_session_idx" ON "flow_approvals" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "knowledge_bases_org_idx" ON "knowledge_bases" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "knowledge_bases_status_idx" ON "knowledge_bases" USING btree ("status");--> statement-breakpoint
CREATE INDEX "organization_settings_org_idx" ON "organization_settings" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "usage_metrics_org_idx" ON "usage_metrics" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "usage_metrics_type_idx" ON "usage_metrics" USING btree ("metric_type");--> statement-breakpoint
CREATE INDEX "usage_metrics_billing_period_idx" ON "usage_metrics" USING btree ("billing_period");--> statement-breakpoint
CREATE INDEX "usage_metrics_reported_idx" ON "usage_metrics" USING btree ("reported_to_stripe");