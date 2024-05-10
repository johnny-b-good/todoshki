// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import { ListOfBoards, ListOfBoardsSchema } from "@todoshki/schemas";

/**
 * Роуты для досок
 */
export const boardsApiPlugin = fastifyPlugin((fastify, opts, done) => {
  fastify.get<{ Reply: ListOfBoards }>(
    "/boards",
    {
      schema: {
        response: {
          200: ListOfBoardsSchema,
        },
      },
    },
    async () => {
      const boards = await fastify.prisma.board.findMany();
      const boardsCount = await fastify.prisma.board.count();

      const convertedBoards = boards.map((board) => ({
        ...board,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      }));

      return {
        items: convertedBoards,
        count: boardsCount,
      };
    },
  );

  done();
});
