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
    <div className="w-72 rounded bg-white px-4 py-2 shadow">{task.content}</div>
  );
};
