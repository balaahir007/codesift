import { Id } from '@/convex/_generated/dataModel';
import { ProjectIdView } from '@/features/components/projects/components/project-id-view';
import React from 'react'

async function ProjectIdPage({params} : {params : Promise<{projectId: Id<"projects">}>}) {
    const {projectId} = await params;
  return (
    <ProjectIdView projectId={projectId}/>
  )
}

export default ProjectIdPage