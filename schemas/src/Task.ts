import { Static, Type } from "@sinclair/typebox";
import { ListWithCountSchema } from "./ListWithCount.js";

export const TaskSchema = Type.Object({
  id: Type.Integer(),
  content: Type.String(),
  order: Type.Integer(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  boardId: Type.Integer(),
  sectionId: Type.Integer(),
});

export type Task = Static<typeof TaskSchema>;

export const ListOfTasksSchema = ListWithCountSchema(TaskSchema);

export type ListOfTasks = Static<typeof ListOfTasksSchema>;

export const TaskToCreateSchema = Type.Object({
  content: Type.String(),
  order: Type.Integer(),
  boardId: Type.Integer(),
  sectionId: Type.Integer(),
});

export type TaskToCreate = Static<typeof TaskToCreateSchema>;

export const TaskToUpdateSchema = Type.Partial(
  Type.Object({
    content: Type.String(),
    order: Type.Integer(),
    boardId: Type.Integer(),
    sectionId: Type.Integer(),
  }),
);

export type TaskToUpdate = Static<typeof TaskToUpdateSchema>;

export const TaskMovementSchema = Type.Object({
  sectionId: Type.Integer(),
  ordering: Type.Record(Type.Integer(), Type.Integer()),
});

export type TaskMovement = Static<typeof TaskMovementSchema>;
