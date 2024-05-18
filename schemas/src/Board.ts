import { Static, Type } from "@sinclair/typebox";
import { ListWithCountSchema } from "./ListWithCount.js";
import { SectionFullSchema } from "./Section.js";

export const BoardSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type Board = Static<typeof BoardSchema>;

export const ListOfBoardsSchema = ListWithCountSchema(BoardSchema);

export type ListOfBoards = Static<typeof ListOfBoardsSchema>;

export const BoardToCreateSchema = Type.Object({
  name: Type.String(),
});

export type BoardToCreate = Static<typeof BoardToCreateSchema>;

export const BoardToUpdateSchema = Type.Partial(
  Type.Object({
    name: Type.String(),
  }),
);

export type BoardToUpdate = Static<typeof BoardToUpdateSchema>;

export const BoardFullSchema = Type.Composite([
  BoardSchema,
  Type.Object({
    sections: Type.Array(SectionFullSchema),
  }),
]);

export type BoardFull = Static<typeof BoardFullSchema>;
