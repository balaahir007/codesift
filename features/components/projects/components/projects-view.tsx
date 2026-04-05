"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";

import { FaGithub } from "react-icons/fa";
import ProjectsList from "./projects-list";
import { useCreateProject } from "../hooks/use-projects";
import { ProjectsCommandDialog } from "./projects-command-dialog";
import NewProjectCreate from "./new-project-create";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
function ProjectsView() {
  const createProject = useCreateProject();
  const [commandDialogOpen, setCommandDialogOpen] = React.useState(false);
  const [newProjectOpen, setNewProjectOpen] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");
  useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      if ( e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandDialogOpen(true);
      }
    }
  }
  document.addEventListener("keydown", handleKeyDown);
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  }
  },[]);

 
  return (
    <>
      {
        <ProjectsCommandDialog
          open={commandDialogOpen}
          onOpenChange={setCommandDialogOpen}
        />
      }
    <NewProjectCreate newProjectOpen={newProjectOpen} setNewProjectOpen={setNewProjectOpen} projectName={projectName} setProjectName={setProjectName} createProject={createProject}/>
      <div className="min-h-screen bg-sidebar  flex flex-col justify-center p-6 md:p-16">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center">
          <div className="flex justify-between gap-4 w-full items-center">
            <div className="flex items-center gap-2 w-full group/logo ">
              <img
                src={"/logo.png"}
                alt="Codesift"
                className="size-[32px] md:size-[46px] "
              />
              <h1
                className={cn(
                  "text-4xl md:text-5xl font-semibold",
                  font.className,
                )}
              >
                CodeSift
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={"outline"}
                className="h-full items-center justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
                onClick={() => setNewProjectOpen(true)}
              >
                <div className="flex items-center justify-between w-full">
                  <SparkleIcon className="size-4" />
                  <Kbd className="bg-accent border">Ctrl+J</Kbd>
                </div>
                <div>
                  <span>New</span>
                </div>
              </Button>
              <Button
                variant={"outline"}
                className="h-full items-center justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <FaGithub className="size-4" />
                  <Kbd className="bg-accent border">Ctrl+I</Kbd>
                </div>
                <div>
                  <span>Import</span>
                </div>
              </Button>
            </div>
            <ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsView;
