import { Static, Type } from "@sinclair/typebox";
import { ListWithCountSchema } from "./ListWithCount.js";

export const SectionSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  role: Type.String(),
  order: Type.Integer(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  boardId: Type.Integer(),
});

export type Section = Static<typeof SectionSchema>;

export const ListOfSectionsSchema = ListWithCountSchema(SectionSchema);

export type ListOfSections = Static<typeof ListOfSectionsSchema>;

export const SectionToCreateSchema = Type.Object({
  name: Type.String(),
  role: Type.String(),
  order: Type.Integer(),
  boardId: Type.Integer(),
});

export type SectionToCreate = Static<typeof SectionToCreateSchema>;

export const SectionToUpdateSchema = Type.Partial(
  Type.Object({
    name: Type.String(),
    role: Type.String(),
    order: Type.Integer(),
    boardId: Type.Integer(),
  }),
);

export type SectionToUpdate = Static<typeof SectionToUpdateSchema>;
