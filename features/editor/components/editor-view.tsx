import { Id } from "@/convex/_generated/dataModel";
import { TabNavigation } from "./tab-navigations";
import { useEditor } from "../hooks/use-editor";
import { FileBreadCrumbs } from "./file-breadcrumbs";
import {
  useFile,
  useUpdateFile,
} from "@/features/components/projects/hooks/use-files";
import Image from "next/image";
import CodeEditor from "./code-editor";
import { useRef } from "react";

const DEBOUNCE_MS = 1500;
export const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const { activeTabId } = useEditor(projectId);

  const activeFile = useFile(activeTabId);

  console.log("active file content : ", activeFile?.content);

  const updateFile = useUpdateFile();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActiveFileBinary = activeFile && activeFile.storageId
  const isActiveFileText = activeFile && !activeFile.storageId
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center">
        <TabNavigation projectId={projectId} />
      </div>

      {activeTabId && <FileBreadCrumbs projectId={projectId} />}

      <div className="flex-1 min-h-0 w-full bg-background relative">
        {!activeFile && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="CodeSift"
              width={50}
              height={50}
              className="opacity-50"
            />
          </div>
        )}

        {isActiveFileText && (
          <div className="h-full w-full">
            <CodeEditor
              filename={activeFile.name}
              key={activeFile._id}
              initialValue={activeFile.content}
              onChange={(content: string) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                  updateFile({ id: activeFile._id, content });
                }, DEBOUNCE_MS);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
