"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus2,
  Newspaper,
  MessageSquare,
  Mail,
  LogOut,
  PhoneCallIcon
} from "lucide-react";
import { assets } from "@/Assets/assets";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Add Blog",
      href: "/admin/addProduct",
      icon: FilePlus2,
    },
    {
      title: "Blog List",
      href: "/admin/bloglist",
      icon: Newspaper,
    },
    {
      title: "Subscriptions",
      href: "/admin/subscription",
      icon: Mail,
    },
    {
      title: "Comments",
      href: "/admin/comments",
      icon: MessageSquare,
    },
    {
      title: "User Contacts",
      href: "/admin/usercontacts",
      icon: PhoneCallIcon,
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user");

    router.replace("/login");
    router.refresh();
  };

  return (
    <aside className="h-screen w-72 bg-[#0F172A] border-r border-slate-800 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <div className="h-20 flex items-center justify-center border-b border-slate-800">
          <Link href='/'>
          <Image
            src={assets.logo}
            alt="Logo"
            width={140}
            className="object-contain"
          />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-5 space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${
                    active
                      ? "bg-cyan-500 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon
                  size={21}
                  className={`${
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-cyan-400"
                  }`}
                />

                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}

        </nav>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 transition-all duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}