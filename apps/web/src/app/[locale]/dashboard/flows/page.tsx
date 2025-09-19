import { getTranslation } from "@turbostarter/i18n/server";
import { Button } from "@turbostarter/ui-web/button";
import { Plus, Play, Pause, Settings } from "lucide-react";

import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "Donor Flows",
  description: "Manage your donor engagement flows and campaigns",
});

// Mock data for development
const mockFlows = [
  {
    id: "1",
    name: "Monthly Upgrade Campaign",
    template: "MONTHLY_UPGRADE",
    status: "ACTIVE",
    lastRun: "2 hours ago",
    runCount: 156,
    successRate: "78%",
  },
  {
    id: "2",
    name: "Lapsed Donor Reactivation",
    template: "LAPSED_REACTIVATION",
    status: "DRAFT",
    lastRun: "Never",
    runCount: 0,
    successRate: "N/A",
  },
  {
    id: "3",
    name: "Matching Gift Follow-up",
    template: "MATCHING_GIFT",
    status: "PAUSED",
    lastRun: "1 day ago",
    runCount: 42,
    successRate: "92%",
  },
];

const statusColors = {
  ACTIVE: "bg-green-100 text-green-800",
  DRAFT: "bg-gray-100 text-gray-800",
  PAUSED: "bg-yellow-100 text-yellow-800",
  ARCHIVED: "bg-red-100 text-red-800",
};

export default async function FlowsPage() {
  const { t } = await getTranslation({ ns: "marketing" });

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Donor Flows
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            Create and manage AI-powered donor engagement campaigns
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Flow
        </Button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">3</div>
          <p className="text-sm text-muted-foreground">Active Flows</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">198</div>
          <p className="text-sm text-muted-foreground">Total Runs</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">12</div>
          <p className="text-sm text-muted-foreground">Pending Approvals</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">83%</div>
          <p className="text-sm text-muted-foreground">Avg Success Rate</p>
        </div>
      </div>

      {/* Flows Table */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Your Flows</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockFlows.map((flow) => (
              <div
                key={flow.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <h3 className="font-medium">{flow.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Template: {flow.template.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">{flow.runCount}</div>
                    <div className="text-xs text-muted-foreground">Runs</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium">{flow.successRate}</div>
                    <div className="text-xs text-muted-foreground">Success</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium">{flow.lastRun}</div>
                    <div className="text-xs text-muted-foreground">Last Run</div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[flow.status as keyof typeof statusColors]
                  }`}>
                    {flow.status}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {flow.status === 'ACTIVE' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}