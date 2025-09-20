import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "VEAGA API test endpoint working",
    data: {
      timestamp: new Date().toISOString(),
      environment: {
        productName: process.env.PRODUCT_NAME,
        databaseUrl: process.env.DATABASE_URL ? "configured" : "missing",
        flowiseUrl: process.env.FLOWISE_INTERNAL_URL,
        espProvider: process.env.ESP_PROVIDER,
        smsProvider: process.env.SMS_PROVIDER,
        crmProvider: process.env.CRM_PROVIDER,
        quietHours: {
          start: process.env.QUIET_HOURS_START,
          end: process.env.QUIET_HOURS_END,
        },
        maxDailySends: process.env.MAX_DAILY_SENDS,
        consentRequired: process.env.CONSENT_REQUIRED,
      }
    }
  });
}