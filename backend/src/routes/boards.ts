// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import {
  Board,
  BoardSchema,
  ListOfBoards,
  ListOfBoardsSchema,
  BoardToCreate,
  BoardToCreateSchema,
  BoardToUpdate,
  BoardToUpdateSchema,
  ParamsWithId,
  ParamsWithIdSchema,
  StringResponse,
  StringResponseSchema,
} from "@todoshki/schemas";

/**
 * Роуты для досок
 */
export const boardsApiPlugin = fastifyPlugin((fastify, opts, done) => {
  // Получить список досок
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

  // Получить одну доску по ID
  fastify.get<{ Reply: Board; Params: ParamsWithId }>(
    "/boards/:id",
    {
      schema: {
        response: {
          200: BoardSchema,
        },
        params: ParamsWithIdSchema,
      },
    },
    async (request) => {
      const { id } = request.params;

      const board = await fastify.prisma.board.findFirstOrThrow({
        where: { id },
      });

      const convertedBoard = {
        ...board,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      };

      return convertedBoard;
    },
  );

  // Создать доску
  fastify.post<{ Reply: Board; Body: BoardToCreate }>(
    "/boards",
    {
      schema: {
        response: {
          200: BoardSchema,
        },
        body: BoardToCreateSchema,
      },
    },
    async (request) => {
      const boardData = request.body;

      const board = await fastify.prisma.board.create({
        data: boardData,
      });

      const convertedBoard = {
        ...board,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      };

      return convertedBoard;
    },
  );

  // Обновить доску
  fastify.patch<{ Reply: Board; Body: BoardToUpdate; Params: ParamsWithId }>(
    "/boards/:id",
    {
      schema: {
        response: {
          200: BoardSchema,
        },
        body: BoardToUpdateSchema,
      },
    },
    async (request) => {
      const { id } = request.params;
      const boardData = request.body;

      const board = await fastify.prisma.board.update({
        where: {
          id
        },
        data: boardData,
      });

      const convertedBoard = {
        ...board,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      };

      return convertedBoard;
    },
  );

  // Удалить одну доску по ID
  fastify.delete<{ Reply: StringResponse; Params: ParamsWithId }>(
    "/boards/:id",
    {
      schema: {
        response: {
          200: StringResponseSchema,
        },
        params: ParamsWithIdSchema,
      },
    },
    async (request) => {
      const { id } = request.params;

      await fastify.prisma.board.delete({
        where: { id },
      });

      return "ok";
    },
  );

  done();
});
