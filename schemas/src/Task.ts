import { Static, Type } from "@sinclair/typebox";
import { ListWithCountSchema } from "./ListWithCount.js";

export const TaskSchema = Type.Object({
  id: Type.Integer(),
  content: Type.String(),
  order: Type.Integer(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type Task = Static<typeof TaskSchema>;

export const ListOfTasksSchema = ListWithCountSchema(TaskSchema);

export type ListOfTasks = Static<typeof ListOfTasksSchema>;
