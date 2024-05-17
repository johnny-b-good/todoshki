// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import {
  Task,
  TaskSchema,
  ListOfTasks,
  ListOfTasksSchema,
  TaskToCreate,
  TaskToCreateSchema,
  TaskToUpdate,
  TaskToUpdateSchema,
  ParamsWithId,
  ParamsWithIdSchema,
  StringResponse,
  StringResponseSchema,
  TaskMovementSchema,
  TaskMovement,
} from "@todoshki/schemas";

/**
 * Роуты для задач
 */
export const tasksApiPlugin = fastifyPlugin((fastify, opts, done) => {
  // Получить список задач
  fastify.get<{ Reply: ListOfTasks }>(
    "/api/tasks",
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

  // Получить одну задачу по ID
  fastify.get<{ Reply: Task; Params: ParamsWithId }>(
    "/api/tasks/:id",
    {
      schema: {
        response: {
          200: TaskSchema,
        },
        params: ParamsWithIdSchema,
      },
    },
    async (request) => {
      const { id } = request.params;

      const task = await fastify.prisma.task.findFirstOrThrow({
        where: { id },
      });

      const convertedTask = {
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      };

      return convertedTask;
    },
  );

  // Создать задачу
  fastify.post<{ Reply: Task; Body: TaskToCreate }>(
    "/api/tasks",
    {
      schema: {
        response: {
          200: TaskSchema,
        },
        body: TaskToCreateSchema,
      },
    },
    async (request) => {
      const taskData = request.body;

      const task = await fastify.prisma.task.create({
        data: taskData,
      });

      const convertedTask = {
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      };

      return convertedTask;
    },
  );

  // Обновить задачу
  fastify.patch<{ Reply: Task; Body: TaskToUpdate; Params: ParamsWithId }>(
    "/api/tasks/:id",
    {
      schema: {
        response: {
          200: TaskSchema,
        },
        body: TaskToUpdateSchema,
      },
    },
    async (request) => {
      const { id } = request.params;
      const taskData = request.body;

      const task = await fastify.prisma.task.update({
        where: {
          id,
        },
        data: taskData,
      });

      const convertedTask = {
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      };

      return convertedTask;
    },
  );

  // Удалить одну задачу по ID
  fastify.delete<{ Reply: StringResponse; Params: ParamsWithId }>(
    "/api/tasks/:id",
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

      await fastify.prisma.task.delete({
        where: { id },
      });

      return "ok";
    },
  );

  // Отсортировать задачи
  fastify.post<{
    Reply: StringResponse;
    Body: TaskMovement;
    Params: ParamsWithId;
  }>(
    "/api/tasks/:id/move",
    {
      schema: {
        response: {
          200: StringResponseSchema,
        },
        body: TaskMovementSchema,
      },
    },
    async (request) => {
      const { id } = request.params;
      const { sectionId, ordering } = request.body;

      await fastify.prisma.$transaction([
        fastify.prisma.task.update({
          where: { id },
          data: {
            sectionId,
          },
        }),
        ...Object.entries(ordering).map(([taskId, order]) =>
          fastify.prisma.task.update({
            where: { id: parseInt(taskId) },
            data: {
              order,
            },
          }),
        ),
      ]);

      return "ok";
    },
  );

  done();
});
