import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  newProjectOpen: boolean;
  setNewProjectOpen: (open: boolean) => void;
  projectName: string;
  setProjectName: (name: string) => void;
  createProject: ({ name }: { name: string }) => Promise<Id<"projects">>;
};

function NewProjectCreate({
  newProjectOpen,
  setNewProjectOpen,
  projectName,
  setProjectName,
  createProject,
}: Props) {
  const router = useRouter();

  const handleCreate = async () => {
    if (!projectName.trim()) return;
    const projectId = await createProject({ name: projectName });
    setProjectName("");
    setNewProjectOpen(false);
    router.push(`/project/${projectId}`);
  };
  return (
    <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Input
              placeholder="Enter project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              autoFocus
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNewProjectOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewProjectCreate;
