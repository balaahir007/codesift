"use client"

import { useMutation, useQuery  } from "convex/react";
import {api} from '../convex/_generated/api';
import { Button } from "@/components/ui/button";

export default function X() {
  const projects = useQuery(api.projects.get)
  const createProject = useMutation(api.projects.create)
  return (
    <div className="flex   flex-col gap-3 p-4">
      <Button className="w-fit" onClick={()=>createProject({
        name : 'New Project'
      })}>
        Add New
      </Button>
      {
        projects?.map((project)=>(
          <div key={project._id} className=' border p-4 text-white'>
            <p>{project.name}</p>
            <p>owner id : {project.ownerId}</p>
          </div>
        ))
      }
    </div>
  );
}
