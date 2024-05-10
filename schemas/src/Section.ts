import { Static, Type } from "@sinclair/typebox";
import { ListWithCountSchema } from "./ListWithCount.js";

export const SectionSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  role: Type.String(),
  order: Type.Integer(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type Section = Static<typeof SectionSchema>;

export const ListOfSectionsSchema = ListWithCountSchema(SectionSchema);

export type ListOfSections = Static<typeof ListOfSectionsSchema>;
