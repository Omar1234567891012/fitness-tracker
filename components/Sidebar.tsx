"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Scale,
  Apple,
  BookOpen,
  Dumbbell,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

const links = [
  {
    href: "/",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/weight",
    label: "Gewicht",
    icon: Scale,
  },
  {
    href: "/nutrition",
    label: "Ernährung",
    icon: Apple,
  },
  {
    href: "/nutrition/diary",
    label: "Ernährungstagebuch",
    icon: BookOpen,
  },
  {
    href: "/workouts",
    label: "Training",
    icon: Dumbbell,
  },
  {
    href: "/progress",
    label: "Fortschritt",
    icon: BarChart3,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: User,
  },
  {
    href: "/settings",
    label: "Einstellungen",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          Fitness Tracker
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Dein persönlicher Coach
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4 text-center text-xs text-slate-500">
        Version 1.0
      </div>
    </aside>
  );
}