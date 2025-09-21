import { requireSuperAdmin } from "~/lib/auth/roles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@turbostarter/ui-web/card";
import { Button } from "@turbostarter/ui-web/button";
import { Badge } from "@turbostarter/ui-web/badge";
import { Icons } from "@turbostarter/ui-web/icons";
import Link from "next/link";

export default async function AgentsPage() {
  // TODO: Re-enable super admin access check once db imports are fixed
  // await requireSuperAdmin();

  // Mock data for now - will be replaced with actual database queries
  const agents = [
    {
      id: "1",
      name: "Donor Stewardship Agent",
      description: "Automated thank you messages and stewardship outreach",
      status: "active",
      version: "1.2.0",
      lastUpdated: "2024-01-15",
      executions: 156,
      organizations: 8
    },
    {
      id: "2",
      name: "Lapsed Donor Re-engagement",
      description: "Personalized outreach to lapsed donors based on giving history",
      status: "draft",
      version: "0.9.0",
      lastUpdated: "2024-01-12",
      executions: 23,
      organizations: 3
    },
    {
      id: "3",
      name: "Major Gift Prospect Research",
      description: "AI-powered prospect research and cultivation recommendations",
      status: "active",
      version: "2.1.0",
      lastUpdated: "2024-01-10",
      executions: 89,
      organizations: 12
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Management</h1>
          <p className="text-muted-foreground">
            Manage AI agents across all organizations
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/agents/new">
            <Icons.Plus className="w-4 h-4 mr-2" />
            Create Agent
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">75% deployment rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>
            Manage AI agents and their deployment across organizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icons.Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                        {agent.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">v{agent.version}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="font-medium">{agent.executions}</div>
                    <div className="text-xs">Executions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{agent.organizations}</div>
                    <div className="text-xs">Organizations</div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/admin/agents/${agent.id}`}>
                        <Icons.Settings className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/admin/agents/${agent.id}/edit`}>
                        <Icons.Workflow className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}