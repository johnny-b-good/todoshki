// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { clsx } from "clsx";
import { SectionFull } from "@todoshki/schemas";

// App
// -----------------------------------------------------------------------------
import { Task } from "./Task";
import { TaskCreatingEditor } from "./TaskCreatingEditor";

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
  return (
    <div
      className={clsx(
        "grid",
        section.tasks.length > 0
          ? "grid-rows-[min-content_1fr_min-content]"
          : "grid-rows-[min-content_min-content]",
        "max-h-full min-h-0 w-64 gap-1 overflow-y-hidden rounded bg-slate-200 p-1 shadow",
      )}
    >
      <div className="flex items-center gap-2 p-1 text-lg  font-semibold">
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
        <div className="grid min-h-0 grid-flow-row gap-2 overflow-y-auto px-1">
          {section.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}

      <TaskCreatingEditor
        boardId={boardId}
        sectionId={section.id}
        hasEditor={hasEditor}
        attachEditor={attachEditor}
        detachEditor={detachEditor}
      />
    </div>
  );
};
