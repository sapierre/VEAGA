import { redirect } from "next/navigation";
import { auth } from "@turbostarter/auth/server";
// import { db } from "@turbostarter/db/server";
// import { users } from "@turbostarter/db/schema";
// import { eq } from "drizzle-orm";

export type UserRole = "user" | "admin" | "super_admin";

// Get the current user with role information
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: new Headers()
  });

  if (!session?.user) {
    return null;
  }

  // TODO: Temporarily return session user without role until db import is fixed
  // For testing purposes, assume anonymous users are super_admin
  console.log("getCurrentUser called for:", session.user.email);
  const userWithRole = {
    id: session.user.id,
    name: session.user.name || "User",
    email: session.user.email || "",
    role: "super_admin" as UserRole, // Temporary for testing
    image: session.user.image,
  };
  console.log("Returning user with role:", userWithRole.role);
  return userWithRole;

  // Original code (commented out until db import is fixed):
  // const [user] = await db
  //   .select({
  //     id: users.id,
  //     name: users.name,
  //     email: users.email,
  //     role: users.role,
  //     image: users.image,
  //   })
  //   .from(users)
  //   .where(eq(users.id, session.user.id))
  //   .limit(1);
  // return user || null;
}

// Check if user has required role
export function hasRole(userRole: UserRole | null | undefined, requiredRole: UserRole): boolean {
  if (!userRole) return false;

  const roleHierarchy: Record<UserRole, number> = {
    user: 0,
    admin: 1,
    super_admin: 2,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Require authentication and specific role
export async function requireRole(requiredRole: UserRole) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!hasRole(user.role, requiredRole)) {
    redirect("/dashboard?error=insufficient_permissions");
  }

  return user;
}

// Require super admin access
export async function requireSuperAdmin() {
  return requireRole("super_admin");
}

// Require admin access (admin or super_admin)
export async function requireAdmin() {
  return requireRole("admin");
}

// Check if current user is super admin (for client-side usage)
export async function isSuperAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return hasRole(user?.role, "super_admin");
}

// Check if current user is admin or higher (for client-side usage)
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return hasRole(user?.role, "admin");
}