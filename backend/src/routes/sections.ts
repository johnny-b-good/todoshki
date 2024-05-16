// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";
import {
  Section,
  SectionSchema,
  ListOfSections,
  ListOfSectionsSchema,
  SectionToCreate,
  SectionToCreateSchema,
  SectionToUpdate,
  SectionToUpdateSchema,
  ParamsWithId,
  ParamsWithIdSchema,
  StringResponse,
  StringResponseSchema,
} from "@todoshki/schemas";

/**
 * Роуты для разделов
 */
export const sectionsApiPlugin = fastifyPlugin((fastify, opts, done) => {
  // Получить список разделов
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

  // Получить одну раздел по ID
  fastify.get<{ Reply: Section; Params: ParamsWithId }>(
    "/api/sections/:id",
    {
      schema: {
        response: {
          200: SectionSchema,
        },
        params: ParamsWithIdSchema,
      },
    },
    async (request) => {
      const { id } = request.params;

      const section = await fastify.prisma.section.findFirstOrThrow({
        where: { id },
      });

      const convertedSection = {
        ...section,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
      };

      return convertedSection;
    },
  );

  // Создать раздел
  fastify.post<{ Reply: Section; Body: SectionToCreate }>(
    "/api/sections",
    {
      schema: {
        response: {
          200: SectionSchema,
        },
        body: SectionToCreateSchema,
      },
    },
    async (request) => {
      const sectionData = request.body;

      const section = await fastify.prisma.section.create({
        data: sectionData,
      });

      const convertedSection = {
        ...section,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
      };

      return convertedSection;
    },
  );

  // Обновить раздел
  fastify.patch<{
    Reply: Section;
    Body: SectionToUpdate;
    Params: ParamsWithId;
  }>(
    "/api/sections/:id",
    {
      schema: {
        response: {
          200: SectionSchema,
        },
        body: SectionToUpdateSchema,
      },
    },
    async (request) => {
      const { id } = request.params;
      const sectionData = request.body;

      const section = await fastify.prisma.section.update({
        where: {
          id,
        },
        data: sectionData,
      });

      const convertedSection = {
        ...section,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
      };

      return convertedSection;
    },
  );

  // Удалить одну раздел по ID
  fastify.delete<{ Reply: StringResponse; Params: ParamsWithId }>(
    "/api/sections/:id",
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

      await fastify.prisma.section.delete({
        where: { id },
      });

      return "ok";
    },
  );

  done();
});
