// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";

/**
 * Роуты для досок
 */
export const boardsApiPlugin = fastifyPlugin((fastify, opts, done) => {
  fastify.get("/boards", () => {
    const boards = fastify.prisma.board.findMany();
    return boards;
  });

  done();
});
