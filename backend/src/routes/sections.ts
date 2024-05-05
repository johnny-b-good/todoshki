// Lib
// -----------------------------------------------------------------------------
import fastifyPlugin from "fastify-plugin";

/**
 * Роуты для разделов
 */
export const sectionsApiPlugin = fastifyPlugin((fastify, opts, done) => {
  fastify.get("/sections", () => {
    const sections = fastify.prisma.section.findMany();
    return sections;
  });

  done();
});
