import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    document.title = "Admin — EVCharge Myanmar";
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading…
      </main>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-2xl px-6 pt-32 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold">Access denied</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your account ({user.email}) is not on the admin allowlist. Ask a project owner to add your
          email to the <code className="rounded bg-secondary px-1.5 py-0.5">admin_emails</code> table.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate("/", { replace: true }); }}>
            Sign out
          </Button>
          <Button asChild><Link to="/">Go home</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-12 items-center gap-2 border-b border-border bg-background/90 px-4 backdrop-blur">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground">Admin dashboard</span>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function AdminIndexRedirect() {
  return <Navigate to="/admin/articles" replace />;
}
