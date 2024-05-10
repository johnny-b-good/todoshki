import { Static, Type } from "@sinclair/typebox";
import { ListWithCountSchema } from "./ListWithCount.js";

export const BoardSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type Board = Static<typeof BoardSchema>;

export const ListOfBoardsSchema = ListWithCountSchema(BoardSchema);

export type ListOfBoards = Static<typeof ListOfBoardsSchema>;
