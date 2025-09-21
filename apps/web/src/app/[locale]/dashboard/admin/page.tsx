import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@turbostarter/ui-web/card";
import { Badge } from "@turbostarter/ui-web/badge";

export default async function SuperAdminDashboard() {
  // TODO: Add authentication back later
  // await requireSuperAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage VEAGA across all organizations
          </p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          Super Admin
        </Badge>
      </div>

      {/* System Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active VEAGA organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Users online today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Agent templates available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-500">
                Healthy
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across all organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New organization registered</p>
                  <p className="text-xs text-muted-foreground">Habitat for Humanity - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Agent deployment successful</p>
                  <p className="text-xs text-muted-foreground">Donor Stewardship Agent - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">High API usage detected</p>
                  <p className="text-xs text-muted-foreground">United Way - 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium">Manage Agents</p>
                <p className="text-sm text-muted-foreground">View and configure AI agents</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium">Monitor Performance</p>
                <p className="text-sm text-muted-foreground">Check system metrics and health</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium">Review Organizations</p>
                <p className="text-sm text-muted-foreground">Manage organization settings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}