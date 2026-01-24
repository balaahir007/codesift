import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "../hooks/use-projects";
import { Kbd } from "@/components/ui/kbd";
import { Doc } from "../../../../convex/_generated/dataModel";
import {formatDistanceToNow} from 'date-fns'
import { AlertCircle, AlertCircleIcon, ArrowRightIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
interface ProjectsListProps {
  onViewAll: () => void;
}

const formatTimestamp = (timestamp : number)=>{
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

const getProjectIcon = (project : Doc<"projects">)=>{
    if(project.importStatus === "importing"){
      return (
        <Loader2Icon className="size-3.5 text-muted-foreground  animate-spin" />
      )
    }
    if(project.importStatus === 'failed'){
      return (
        <AlertCircleIcon className="size-3.5 text-muted-foreground" />
      )
    }
    if(project.importStatus == 'completed'){
      return (
        <FaGithub className="size-3.5 text-muted-foreground" />

      )
    }

    return (
      <GlobeIcon className="size-3.5 text-muted-foreground" />
    )
}

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <div className="relative group">
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-border to-accent opacity-30 blur group-hover:opacity-60 transition duration-500" />
      
      <div className="relative bg-background border border-border/50 rounded-2xl overflow-hidden">
        {/* Header with status */}
        <div className="px-5 py-3 border-b border-border/30 bg-accent/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground tracking-wide">
              IN_PROGRESS
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">
            {formatTimestamp(data.updatedAt)}
          </span>
        </div>
        
        {/* Main content */}
        <Link href={`/project/${data._id}`} className="block p-6 hover:bg-accent/5 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Large icon */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent/80 to-accent/40 group-hover:scale-105 transition-transform">
                <div className="scale-125">
                  {getProjectIcon(data)}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate group-hover:text-foreground/80 transition-colors">
                  {data.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 rounded-full bg-accent overflow-hidden">
                    <div className="h-full w-8/12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    80% COMPLETE
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action button */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
              <span className="text-xs font-medium whitespace-nowrap">Continue</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
return (
  <Link
    href={`/project/${data._id}`}
    className="relative flex items-center gap-4 group pl-2"
  >
    {/* Timeline dot */}
    <div className="relative z-10 flex items-center justify-center">
      <div className="h-3 w-3 rounded-full border-2 border-background bg-border group-hover:bg-foreground group-hover:scale-125 transition-all duration-300" />
    </div>
    
    {/* Card */}
    <div className="flex-1 flex items-center justify-between gap-4 p-4 rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm group-hover:border-border group-hover:bg-accent/20 group-hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2 rounded-lg bg-accent/40 group-hover:bg-accent/60 transition-colors">
          {getProjectIcon(data)}
        </div>
        
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span className="truncate text-white font-medium text-sm">
            {data.name}
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">
            {formatTimestamp(data.updatedAt)}
          </span>
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-accent to-foreground/20" />
        <ArrowRightIcon className="size-4 text-muted-foreground" />
      </div>
    </div>
  </Link>
)
};
const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
  const projects = useProjectsPartial(5);


  console.log("Projects", projects);
  if (projects === undefined) {
    return <Spinner className="size-4 text-ring" />;
  }
  const [mostRecentProject,...rest] = projects;

  return (
   <div className="flex flex-col gap-8">
  {mostRecentProject ? <ContinueCard data={mostRecentProject}/> : <></>}
  {rest.length > 0 && (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-[11px] text-muted-foreground font-mono">
          RECENT ACTIVITY
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent" />
        
        <ul className="flex flex-col gap-3" style={{listStyle :  'none'}} >
          {rest.map((project, index) => (
            <ProjectItem 
              data={project} 
              key={project._id.toString()} 
            />
          ))}
        </ul>
      </div>
      
      <button 
        onClick={onViewAll} 
        className="mx-auto mt-2 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
      >
        <span className="font-mono">VIEW_ALL_PROJECTS</span>
        <Kbd className="bg-accent border text-[10px] group-hover:bg-accent/80 transition-colors">
          ⌘K
        </Kbd>
      </button>
    </div>
  )}
</div>
  );
};

export default ProjectsList;
