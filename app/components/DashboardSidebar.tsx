"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Users,
  Building2,
} from "lucide-react"

type MenuItem = {
  id: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  name: string
}

const menuItemsByRole: Record<string, MenuItem[]> = {
  seeker: [
    {
      id: "dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
      name: "Dashboard",
    },
    {
      id: "jobs",
      url: "/jobs/seeker",
      icon: Briefcase,
      name: "Jobs",
    },
    {
      id: "saved-jobs",
      url: "/saved-jobs",
      icon: Bookmark,
      name: "Saved Jobs",
    },
    {
      id: "applications",
      url: "/applications",
      icon: FileText,
      name: "Applications",
    },
    {
      id: "billing",
      url: "/billing",
      icon: CreditCard,
      name: "Billing",
    },
    {
      id: "settings",
      url: "/settings",
      icon: Settings,
      name: "Settings",
    },
    {
      id: "logout",
      url: "/logout",
      icon: LogOut,
      name: "Logout",
    },
  ],
  recruiter: [
    {
      id: "dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
      name: "Dashboard",
    },
    {
      id: "manage-jobs",
      url: "/manage-jobs",
      icon: Briefcase,
      name: "Manage Jobs",
    },
    {
      id: "applications",
      url: "/applications",
      icon: FileText,
      name: "Applications",
    },
    {
      id: "settings",
      url: "/settings",
      icon: Settings,
      name: "Settings",
    },
  ],
  admin: [
    {
      id: "dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      name: "Dashboard",
    },
    {
      id: "users",
      url: "/users",
      icon: Users,
      name: "Users",
    },
    {
      id: "companies",
      url: "/companies",
      icon: Building2,
      name: "Companies",
    },
    {
      id: "jobs",
      url: "/jobs",
      icon: Briefcase,
      name: "Jobs",
    },
    {
      id: "payments",
      url: "/payments",
      icon: CreditCard,
      name: "Payments",
    },
    {
      id: "settings",
      url: "/settings",
      icon: Settings,
      name: "Settings",
    },
  ],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role = session?.user?.role || "seeker"

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((items) => (
              <SidebarMenuItem key={items.id}>
                <SidebarMenuButton render={<a href={items.url} />}>
                  <items.icon />
                  <span>{items.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
