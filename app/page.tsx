"use client"

import { useMutation, useQuery  } from "convex/react";
import {api} from '../convex/_generated/api';
import { Button } from "@/components/ui/button";

import ProjectViews from "@/features/components/projects/components/projects-view";

export default function Home() {
  const projects = useQuery(api.projects.get)
  const createProject = useMutation(api.projects.create)
  return (
    <ProjectViews />
  );
}
