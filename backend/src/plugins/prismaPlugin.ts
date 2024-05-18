import { PrismaClient } from "@prisma/client";
import fastifyPlugin from "fastify-plugin";

import {
  PrismaClientWithDateTimeExtension,
  extendPrismaClientWithDateTimeExtension,
} from "./prismaDateTimeExtension.js";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClientWithDateTimeExtension;
  }
}

export const prismaPlugin = fastifyPlugin(async (fastify) => {
  const prismaClient = new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "warn" },
      { emit: "event", level: "info" },
      { emit: "event", level: "error" },
    ],
  });

  prismaClient.$on("error", (ev) => {
    fastify.log.error(ev, ev.message);
  });

  prismaClient.$on("info", (ev) => {
    fastify.log.info(ev, ev.message);
  });

  prismaClient.$on("query", (ev) => {
    fastify.log.info(ev, "database query");
  });

  prismaClient.$on("warn", (ev) => {
    fastify.log.warn(ev, ev.message);
  });

  fastify.addHook("onClose", async () => {
    await prismaClient.$disconnect();
  });

  await prismaClient.$connect();

  const extendedPrismaClient =
    extendPrismaClientWithDateTimeExtension(prismaClient);

  fastify.decorate("prisma", extendedPrismaClient);
});
