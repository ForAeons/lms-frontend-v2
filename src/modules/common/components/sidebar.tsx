import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NavContent } from ".";

export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <ScrollArea className="h-[100dvh]">
      <NavContent />
      <ScrollBar />
    </ScrollArea>
  );
};

export default Sidebar;
