import { PrismaClient } from "@prisma/client";
import fastifyPlugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin = fastifyPlugin(async (fastify) => {
  const prismaClient = new PrismaClient();

  await prismaClient.$connect();

  fastify.decorate("prisma", prismaClient);

  fastify.addHook("onClose", async () => {
    await fastify.prisma.$disconnect();
  });
});
