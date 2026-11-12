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
  PlusCircle,
} from "lucide-react"
import Link from "next/link";

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
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
      name: "Jobs",
    },
    {
      id: "saved-jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
      name: "Saved Jobs",
    },
    {
      id: "applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
      name: "Applications",
    },
    {
      id: "billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
      name: "Billing",
    },
    {
      id: "settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
      name: "Settings",
    },
    {
      id: "logout",
      url: "/dashboard/seeker/logout",
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
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
      name: "Manage Jobs",
    },
    {
      id: "add-job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
      name: "Add Job",
    },
    {
      id: "applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
      name: "Applications",
    },
    {
      id: "settings",
      url: "/dashboard/recruiter/settings",
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
      url: "/dashboard/admin/users",
      icon: Users,
      name: "Users",
    },
    {
      id: "companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
      name: "Companies",
    },
    {
      id: "jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
      name: "Jobs",
    },
    {
      id: "payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
      name: "Payments",
    },
    {
      id: "settings",
      url: "/dashboard/admin/settings",
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
                <SidebarMenuButton render={<Link href={items.url} />}>
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
