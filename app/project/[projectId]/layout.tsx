import { Id } from '@/convex/_generated/dataModel';
import { ProjectLayout } from '@/features/components/projects/components/project-id-layout';
import React from 'react'

async function Layout({ children,params }: { children: React.ReactNode,params : Promise<{projectId:string}>}) {
    const {projectId} = await params;
    console.log("params in layout:", projectId);
  return (
    <div>
        <ProjectLayout projectId={projectId as  Id<"projects">}>
    
        {children}
        </ProjectLayout>
    </div>
  )
}

export default Layout