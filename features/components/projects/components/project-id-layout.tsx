"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Navbar } from "./navbar";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

const SIDEBAR_WIDTH = 400;
const DEFAULT_MAIN_SIZE = 1000;

export const ProjectLayout = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: Id<"projects">;
}) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar projectId={projectId} />

      <div className="flex-1 overflow-hidden">
        <Allotment
          className="h-full"
          defaultSizes={[DEFAULT_MAIN_SIZE, SIDEBAR_WIDTH]}
        >
          {/* Main content */}
          <Allotment.Pane>
            <div className="h-full">{children}</div>
          </Allotment.Pane>

          {/* Fixed-width sidebar */}
          <Allotment.Pane minSize={200} maxSize={400} preferredSize={300}>
            <div className="h-full border-l">Conversation sidebar</div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
};
