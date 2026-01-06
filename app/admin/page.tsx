"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AdminHeader,
  OverviewTab,
  UsersTab,
  DecksTab,
} from "@/components/admin";

function Page() {
  const [selectedTab, setSelectedTab] = useState("overview");

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

export default Page;
