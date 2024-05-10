import { Type, type TSchema } from "@sinclair/typebox";

export const ListWithCountSchema = <T extends TSchema>(T: T) =>
  Type.Object({
    items: Type.Array(T),
    count: Type.Integer(),
  });
