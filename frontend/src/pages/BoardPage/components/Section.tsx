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
    <div className="flex w-64 flex-none flex-col gap-2 rounded bg-slate-200 p-2 shadow">
      <div className="flex items-center gap-2 text-lg font-semibold">
        {section.name}
        <div
          className={clsx(
            "h-2 w-2 rounded-full",
            section.role === "todo" && "bg-slate-500",
            section.role === "in_progress" && "bg-cyan-500",
            section.role === "done" && "bg-green-500",
            section.role === "rejected" && "bg-red-500",
          )}
        ></div>
      </div>

      {section.tasks.length > 0 && (
        <div className="flex flex-col gap-2">
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
        <Button onClick={attachEditor} variant="text">
          <PlusIcon className="size-4" /> Create task
        </Button>
      )}
    </div>
  );
};
