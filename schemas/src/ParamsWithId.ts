import { Static, Type } from "@sinclair/typebox";

export const ParamsWithIdSchema = Type.Object({
  id: Type.Integer(),
});

export type ParamsWithId = Static<typeof ParamsWithIdSchema>;
