// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";

/**
 * Роуты для задач
 */
export const tasksApiPlugin = fastifyPlugin((fastify, opts, done) => {
  fastify.get("/tasks", () => {
    const tasks = fastify.prisma.task.findMany();
    return tasks;
  });

  done();
});
