import { getTranslation } from "@turbostarter/i18n/server";
import { Button } from "@turbostarter/ui-web/button";
import {
  TrendingUp,
  Users,
  Mail,
  Clock,
  Play,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "VEAGA Dashboard",
  description: "AI-powered donor engagement platform",
});

export default async function DashboardPage() {
  const { t } = await getTranslation({ ns: "marketing" });

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Welcome to VEAGA
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            AI-powered donor engagement platform for nonprofits
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/flows" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Flow
          </Link>
        </Button>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">Active Flows</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">Messages Sent</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-muted-foreground">Success Rate</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-muted-foreground">Pending Approvals</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/activity">View All</Link>
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  icon: <Play className="h-4 w-4 text-blue-600" />,
                  title: "Monthly Upgrade flow started",
                  subtitle: "156 donors targeted",
                  time: "2 hours ago",
                },
                {
                  icon: <CheckCircle className="h-4 w-4 text-green-600" />,
                  title: "Matching gift message approved",
                  subtitle: "Jennifer Rodriguez - Microsoft match",
                  time: "4 hours ago",
                },
                {
                  icon: <AlertCircle className="h-4 w-4 text-orange-600" />,
                  title: "New approval needed",
                  subtitle: "Lapsed donor reactivation for Michael Chen",
                  time: "6 hours ago",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/dashboard/flows">
                  <span>Manage Donor Flows</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/dashboard/approvals">
                  <span>Review Pending Approvals (3)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/dashboard/knowledge">
                  <span>Upload Knowledge Base</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/dashboard/settings">
                  <span>Configure Integrations</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Performance */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Flow Performance</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                name: "Monthly Upgrade Campaign",
                status: "Active",
                runs: 156,
                success: "78%",
                lastRun: "2 hours ago",
              },
              {
                name: "Matching Gift Follow-up",
                status: "Active",
                runs: 42,
                success: "92%",
                lastRun: "1 day ago",
              },
              {
                name: "Lapsed Donor Reactivation",
                status: "Paused",
                runs: 23,
                success: "65%",
                lastRun: "3 days ago",
              },
            ].map((flow, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex flex-col">
                  <h3 className="font-medium">{flow.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {flow.runs} runs • {flow.success} success rate • Last run {flow.lastRun}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  flow.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {flow.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
