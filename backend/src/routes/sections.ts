// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import { ListOfSections, ListOfSectionsSchema } from "@todoshki/schemas";

/**
 * Роуты для разделов
 */
export const sectionsApiPlugin = fastifyPlugin((fastify, opts, done) => {
  fastify.get<{ Reply: ListOfSections }>(
    "/api/sections",
    {
      schema: {
        response: {
          200: ListOfSectionsSchema,
        },
      },
    },
    async () => {
      const sections = await fastify.prisma.section.findMany();

      const sectionsCount = await fastify.prisma.section.count();

      const convertedSections = sections.map((section) => ({
        ...section,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
      }));

      return {
        items: convertedSections,
        count: sectionsCount,
      };
    },
  );

  done();
});
