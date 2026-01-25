import { Id } from '@/convex/_generated/dataModel';
import { ProjectLayout } from '@/features/components/projects/components/project-id-layout';
import React from 'react'

async function Layout({ children,params }: { children: React.ReactNode,params : Promise<{projectId: Id<"projects">}>}) {
    const {projectId} = await params;
    console.log("params in layout:", projectId);
  return (
    <div>
        <ProjectLayout projectId={projectId}>
    
        {children}
        </ProjectLayout>
    </div>
  )
}

export default Layout