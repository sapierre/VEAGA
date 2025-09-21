CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'super_admin');--> statement-breakpoint
CREATE TYPE "public"."agent_template_status" AS ENUM('draft', 'published', 'deprecated');--> statement-breakpoint
CREATE TYPE "public"."execution_status" AS ENUM('pending', 'running', 'completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TABLE "agent_executions" (
	"id" text PRIMARY KEY NOT NULL,
	"workflow_execution_id" text NOT NULL,
	"node_id" text NOT NULL,
	"node_type" text NOT NULL,
	"agent_template_id" text,
	"status" "execution_status" DEFAULT 'pending',
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"duration" integer,
	"input_tokens" integer DEFAULT 0,
	"output_tokens" integer DEFAULT 0,
	"cost" integer DEFAULT 0,
	"input_data" jsonb DEFAULT '{}'::jsonb,
	"output_data" jsonb DEFAULT '{}'::jsonb,
	"error" text,
	"logs" jsonb DEFAULT '[]'::jsonb
);
--> statement-breakpoint
CREATE TABLE "agent_templates" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"node_type" text NOT NULL,
	"system_prompt" text NOT NULL,
	"tools" jsonb DEFAULT '[]'::jsonb,
	"configuration" jsonb DEFAULT '{}'::jsonb,
	"status" "agent_template_status" DEFAULT 'draft',
	"version" text DEFAULT '1.0.0' NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_keys" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"name" text NOT NULL,
	"key_hash" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"usage_limit" integer,
	"current_usage" integer DEFAULT 0,
	"organization_id" text,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"last_used_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "system_health" (
	"id" text PRIMARY KEY NOT NULL,
	"metric" text NOT NULL,
	"value" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "workflow_executions" (
	"id" text PRIMARY KEY NOT NULL,
	"workflow_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"triggered_by" text NOT NULL,
	"status" "execution_status" DEFAULT 'pending',
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"duration" integer,
	"node_executions" jsonb DEFAULT '[]'::jsonb,
	"input_data" jsonb DEFAULT '{}'::jsonb,
	"output_data" jsonb DEFAULT '{}'::jsonb,
	"error" text,
	"metadata" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role";--> statement-breakpoint
ALTER TABLE "agent_executions" ADD CONSTRAINT "agent_executions_workflow_execution_id_workflow_executions_id_fk" FOREIGN KEY ("workflow_execution_id") REFERENCES "public"."workflow_executions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agent_executions" ADD CONSTRAINT "agent_executions_agent_template_id_agent_templates_id_fk" FOREIGN KEY ("agent_template_id") REFERENCES "public"."agent_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agent_templates" ADD CONSTRAINT "agent_templates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_executions" ADD CONSTRAINT "workflow_executions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_executions" ADD CONSTRAINT "workflow_executions_triggered_by_users_id_fk" FOREIGN KEY ("triggered_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "agent_executions_workflow_execution_idx" ON "agent_executions" USING btree ("workflow_execution_id");--> statement-breakpoint
CREATE INDEX "agent_executions_node_idx" ON "agent_executions" USING btree ("node_id");--> statement-breakpoint
CREATE INDEX "agent_executions_status_idx" ON "agent_executions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "agent_executions_started_at_idx" ON "agent_executions" USING btree ("started_at");--> statement-breakpoint
CREATE INDEX "agent_executions_agent_template_idx" ON "agent_executions" USING btree ("agent_template_id");--> statement-breakpoint
CREATE INDEX "agent_templates_node_type_idx" ON "agent_templates" USING btree ("node_type");--> statement-breakpoint
CREATE INDEX "agent_templates_status_idx" ON "agent_templates" USING btree ("status");--> statement-breakpoint
CREATE INDEX "agent_templates_created_by_idx" ON "agent_templates" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "api_keys_provider_idx" ON "api_keys" USING btree ("provider");--> statement-breakpoint
CREATE INDEX "api_keys_org_idx" ON "api_keys" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "api_keys_is_active_idx" ON "api_keys" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "system_health_metric_idx" ON "system_health" USING btree ("metric");--> statement-breakpoint
CREATE INDEX "system_health_timestamp_idx" ON "system_health" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "workflow_executions_workflow_idx" ON "workflow_executions" USING btree ("workflow_id");--> statement-breakpoint
CREATE INDEX "workflow_executions_org_idx" ON "workflow_executions" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "workflow_executions_status_idx" ON "workflow_executions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "workflow_executions_started_at_idx" ON "workflow_executions" USING btree ("started_at");--> statement-breakpoint
CREATE INDEX "workflow_executions_triggered_by_idx" ON "workflow_executions" USING btree ("triggered_by");