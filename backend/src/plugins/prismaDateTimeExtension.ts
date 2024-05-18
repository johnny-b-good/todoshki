import { Prisma, PrismaClient } from "@prisma/client";

export const dateTimeExtension = Prisma.defineExtension({
  name: "DateTimeExtension",

  result: {
    board: {
      createdAt: {
        needs: { createdAt: true },
        compute(board) {
          return board.createdAt.toISOString();
        },
      },
      updatedAt: {
        needs: { updatedAt: true },
        compute(board) {
          return board.updatedAt.toISOString();
        },
      },
    },
    section: {
      createdAt: {
        needs: { createdAt: true },
        compute(section) {
          return section.createdAt.toISOString();
        },
      },
      updatedAt: {
        needs: { updatedAt: true },
        compute(section) {
          return section.updatedAt.toISOString();
        },
      },
    },
    task: {
      createdAt: {
        needs: { createdAt: true },
        compute(task) {
          return task.createdAt.toISOString();
        },
      },
      updatedAt: {
        needs: { updatedAt: true },
        compute(task) {
          return task.updatedAt.toISOString();
        },
      },
    },
  },
});

export const extendPrismaClientWithDateTimeExtension = (client: PrismaClient) =>
  client.$extends(dateTimeExtension);

export type PrismaClientWithDateTimeExtension = ReturnType<
  typeof extendPrismaClientWithDateTimeExtension
>;
