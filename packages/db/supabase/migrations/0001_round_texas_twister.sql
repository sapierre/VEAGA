DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'CANCELED', 'INCOMPLETE', 'INCOMPLETE_EXPIRED', 'PAST_DUE', 'PAUSED', 'TRIALING', 'UNPAID');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."plan" AS ENUM('FREE', 'PREMIUM', 'ENTERPRISE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "customers_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "customerId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "status" "status";--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "plan" "plan";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "id";