// Lib
// -----------------------------------------------------------------------------
import { FC, useState } from "react";
import { clsx } from "clsx";
import { SectionFull } from "@todoshki/schemas";
import { PlusIcon } from "@heroicons/react/24/solid";

// App
// -----------------------------------------------------------------------------
import { Task } from "./Task";
import { Button, Input } from "src/components";
import { useCreateTaskMutation } from "src/api";

// Props
// -----------------------------------------------------------------------------
export interface SectionProps {
  boardId: number;
  section: SectionFull;
  hasEditor: boolean;
  attachEditor: () => void;
  detachEditor: () => void;
}

/** Section component */
export const Section: FC<SectionProps> = ({
  boardId,
  section,
  hasEditor,
  attachEditor,
  detachEditor,
}) => {
  const createTaskResult = useCreateTaskMutation();

  const [editorContent, setEditorContent] = useState<string>("");

  return (
    <div className="flex w-80 flex-col gap-4 rounded bg-slate-100 px-4 py-2 shadow">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <div
          className={clsx(
            "h-4 w-2 rounded-sm",
            section.role === "todo" && "bg-slate-500",
            section.role === "in_progress" && "bg-cyan-500",
            section.role === "done" && "bg-green-500",
            section.role === "rejected" && "bg-red-500",
          )}
        ></div>
        {section.name}
      </div>

      {section.tasks.length > 0 && (
        <div className="flex flex-col gap-4">
          {section.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}

      {hasEditor ? (
        <Input
          placeholder="New task"
          value={editorContent}
          onChange={(ev) => {
            setEditorContent(ev.target.value);
          }}
          onBlur={() => {
            if (editorContent) {
              void createTaskResult
                .mutateAsync({
                  content: editorContent,
                  sectionId: section.id,
                  order: 0,
                  boardId,
                })
                .then(() => {
                  setEditorContent("");
                  detachEditor();
                });
            } else {
              detachEditor();
            }
          }}
          autoFocus
        />
      ) : (
        <Button onClick={attachEditor}>
          <PlusIcon className="size-5" /> Create new
        </Button>
      )}
    </div>
  );
};
