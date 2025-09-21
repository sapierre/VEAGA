"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-web/button";
import { Badge } from "@turbostarter/ui-web/badge";
import {
  LayoutDashboard,
  Bot,
  Activity,
  Building2,
  Settings,
  Database,
  Key,
  FileText,
  Users,
  BarChart3,
  AlertTriangle,
  TestTube,
  Workflow
} from "lucide-react";

const navigationItems = [
  {
    title: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Agent Management",
    items: [
      {
        title: "All Agents",
        href: "/dashboard/admin/agents",
        icon: Bot,
      },
      {
        title: "Templates",
        href: "/dashboard/admin/agents/templates",
        icon: Workflow,
      },
      {
        title: "Testing",
        href: "/dashboard/admin/agents/testing",
        icon: TestTube,
      },
    ],
  },
  {
    title: "Monitoring",
    items: [
      {
        title: "Executions",
        href: "/dashboard/admin/monitoring/executions",
        icon: Activity,
      },
      {
        title: "Performance",
        href: "/dashboard/admin/monitoring/performance",
        icon: BarChart3,
      },
      {
        title: "Errors",
        href: "/dashboard/admin/monitoring/errors",
        icon: AlertTriangle,
      },
    ],
  },
  {
    title: "Organizations",
    items: [
      {
        title: "All Organizations",
        href: "/dashboard/admin/organizations",
        icon: Building2,
      },
      {
        title: "Users",
        href: "/dashboard/admin/organizations/users",
        icon: Users,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Database",
        href: "/dashboard/admin/system/database",
        icon: Database,
      },
      {
        title: "API Keys",
        href: "/dashboard/admin/system/api-keys",
        icon: Key,
      },
      {
        title: "Logs",
        href: "/dashboard/admin/system/logs",
        icon: FileText,
      },
      {
        title: "Settings",
        href: "/dashboard/admin/system/settings",
        icon: Settings,
      },
    ],
  },
];

export function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">VEAGA Admin</h2>
          <Badge variant="outline" className="text-xs">
            Super Admin
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navigationItems.map((section) => (
          <div key={section.title} className="space-y-2">
            {section.href ? (
              // Single item
              <Link href={section.href}>
                <Button
                  variant={pathname === section.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    pathname === section.href && "bg-secondary"
                  )}
                >
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </Button>
              </Link>
            ) : (
              // Section with items
              <div>
                <h3 className="px-2 text-sm font-medium text-muted-foreground mb-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items?.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-2 pl-6",
                          pathname === item.href && "bg-secondary"
                        )}
                        size="sm"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Link href="/dashboard">
          <Button variant="outline" className="w-full">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}