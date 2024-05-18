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
  BoardFull,
  BoardFullSchema,
} from "@todoshki/schemas";

/**
 * Роуты для досок
 */
export const boardsApiPlugin = fastifyPlugin((fastify, opts, done) => {
  // Получить список досок
  fastify.get<{ Reply: ListOfBoards }>(
    "/api/boards",
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

      return {
        items: boards,
        count: boardsCount,
      };
    },
  );

  // Получить одну доску по ID
  fastify.get<{ Reply: Board; Params: ParamsWithId }>(
    "/api/boards/:id",
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

      return board;
    },
  );

  // Получить одну доску полностью по ID
  fastify.get<{ Reply: BoardFull; Params: ParamsWithId }>(
    "/api/boards/:id/full",
    {
      schema: {
        response: {
          200: BoardFullSchema,
        },
        params: ParamsWithIdSchema,
      },
    },
    async (request) => {
      const { id } = request.params;

      const board = await fastify.prisma.board.findFirstOrThrow({
        where: { id },
        include: {
          sections: {
            include: {
              tasks: true,
            },
          },
        },
      });

      return board;
    },
  );

  // Создать доску
  fastify.post<{ Reply: Board; Body: BoardToCreate }>(
    "/api/boards",
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

      return board;
    },
  );

  // Создать доску вместе с секциями по умолчанию
  fastify.post<{ Reply: Board; Body: BoardToCreate }>(
    "/api/boards/createWithDefaultSections",
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
        data: {
          ...boardData,
          sections: {
            create: [
              { name: "To do", role: "todo", order: 1 },
              { name: "In progress", role: "in_progress", order: 2 },
              { name: "Done", role: "done", order: 3 },
              { name: "Rejected", role: "rejected", order: 4 },
            ],
          },
        },
      });

      return board;
    },
  );

  // Обновить доску
  fastify.patch<{ Reply: Board; Body: BoardToUpdate; Params: ParamsWithId }>(
    "/api/boards/:id",
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
        where: { id },
        data: boardData,
      });

      return board;
    },
  );

  // Удалить одну доску по ID
  fastify.delete<{ Reply: StringResponse; Params: ParamsWithId }>(
    "/api/boards/:id",
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
