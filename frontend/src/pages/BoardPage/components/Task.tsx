// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { Task as TTask } from "@todoshki/schemas";
// import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface TaskProps {
  task: TTask;
}

/** Task component */
export const Task: FC<TaskProps> = ({ task }) => {
  return (
    <div className="max-w-60 rounded bg-white px-2 py-1 text-sm shadow">
      {task.content}
    </div>
  );
};
