// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import type { FastifyPluginAsync } from "fastify";

// Fastify instance extension
// -----------------------------------------------------------------------------
declare module "fastify" {
  interface FastifyInstance {
    config: {
      /** Server host */
      HOST: string;
      /** Server port */
      PORT: number;
    };
  }
}

const loadEnv: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyEnv, {
    dotenv: true,
    data: process.env,
    confKey: "config",
    schema: {
      type: "object",
      required: ["HOST", "PORT"],
      properties: {
        HOST: {
          type: "string",
          default: "0.0.0.0",
        },
        PORT: {
          type: "number",
          default: 8080,
        },
      },
    },
  });
};

export const loadEnvPlugin = fastifyPlugin(loadEnv);
