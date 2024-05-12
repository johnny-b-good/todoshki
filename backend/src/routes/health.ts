// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import { StringResponse, StringResponseSchema } from "@todoshki/schemas";

/**
 * Роут для проверки запуска приложения
 */
export const healthApiPlugin = fastifyPlugin((fastify, opts, done) => {
  fastify.get<{ Reply: StringResponse }>(
    "/health",
    {
      schema: {
        response: {
          200: StringResponseSchema,
        },
      },
    },
    () => "ok",
  );

  done();
});
