// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import { ListOfTasks, ListOfTasksSchema } from "@todoshki/schemas";

/**
 * Роуты для задач
 */
export const tasksApiPlugin = fastifyPlugin((fastify, opts, done) => {
  fastify.get<{ Reply: ListOfTasks }>(
    "/tasks",
    {
      schema: {
        response: {
          200: ListOfTasksSchema,
        },
      },
    },
    async () => {
      const tasks = await fastify.prisma.task.findMany();

      const tasksCount = await fastify.prisma.task.count();

      const convertedTasks = tasks.map((task) => ({
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      }));

      return {
        items: convertedTasks,
        count: tasksCount,
      };
    },
  );

  done();
});
