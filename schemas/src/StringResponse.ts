import { Static, Type } from "@sinclair/typebox";

export const StringResponseSchema = Type.String();

export type StringResponse = Static<typeof StringResponseSchema>;
