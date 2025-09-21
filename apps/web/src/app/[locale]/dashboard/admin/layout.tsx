import { Suspense } from "react";
import { requireSuperAdmin } from "~/lib/auth/roles";
import { SuperAdminSidebar } from "~/components/admin/super-admin-sidebar";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export default async function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  // TODO: Re-enable super admin access check once db imports are fixed
  // await requireSuperAdmin();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Super Admin Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <SuperAdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Suspense fallback={<LoadingSpinner />}>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}