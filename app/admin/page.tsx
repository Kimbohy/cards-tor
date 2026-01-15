"use client";

import { Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AdminHeader,
  OverviewTab,
  UsersTab,
  DecksTab,
} from "@/components/admin";
import { useQueryState } from "nuqs";
import { Skeleton } from "@/components/ui/skeleton";

function AdminContent() {
  const [selectedTab, setSelectedTab] = useQueryState("tab", {
    defaultValue: "overview",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="decks">Decks</TabsTrigger>
          </TabsList>

          <OverviewTab />
          <UsersTab />
          <DecksTab />
        </Tabs>
      </main>
      <footer className="flex items-end justify-start p-3">
        <span className="text-secondary-foreground font-light">
          *because this is a demo and training project, everyone can access the
          admin panel. But you will not be able to make any changes, sorry!
        </span>
      </footer>
    </div>
  );
}

function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Skeleton className="h-16 w-full" />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-96 w-full" />
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminContent />
    </Suspense>
  );
}
