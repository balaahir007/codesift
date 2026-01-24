'use client';

import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandDialog,
  CommandInput,
} from "@/components/ui/command";

import { useProjects } from "../hooks/use-projects";
import { Doc } from "@/convex/_generated/dataModel";
import { useEffect } from "react";

interface ProjectsCommandDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "importing") {
    return (
      <Loader2Icon className="size-4 text-muted-foreground  animate-spin" />
    );
  }
  if (project.importStatus === "failed") {
    return <AlertCircleIcon className="size-4 text-muted-foreground" />;
  }
  if (project.importStatus == "completed") {
    return <FaGithub className="size-4 text-muted-foreground" />;
  }

  return <GlobeIcon className="size-4 text-muted-foreground" />;
};

export const ProjectsCommandDialog = ({
  open,
  onOpenChange,
}: ProjectsCommandDialog) => {
  const router = useRouter();
  const projects = useProjects();

  const handleProjectSelect = (projectId: string) => {
    router.push(`/project/${projectId}`);
    onOpenChange(false);
  };


  
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Projects"
      description="Search and navigate to your projects "
    >
      <CommandInput placeholder="Search projects..." />
      <CommandList>
        <CommandEmpty>No projects found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects?.map((project) => {
            return (
              <CommandItem
                key={project._id}
                value={`${project.name}-${project._id}`}
                onSelect={() => handleProjectSelect(project._id)}
              >
                {getProjectIcon(project)}
                <span>{project.name}</span>
              </CommandItem>
            );
          })} 
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
