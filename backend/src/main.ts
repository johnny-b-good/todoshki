// Node
// -----------------------------------------------------------------------------
import process from "node:process";

// Lib
// -----------------------------------------------------------------------------
import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { fastifyHelmet } from "@fastify/helmet";
import { fastifySensible } from "@fastify/sensible";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

// App
// -----------------------------------------------------------------------------
import { loadEnvPlugin, prismaPlugin } from "./plugins/index.js";
import {
  boardsApiPlugin,
  sectionsApiPlugin,
  tasksApiPlugin,
  healthApiPlugin,
} from "./routes/index.js";

const start = async () => {
  /** App object */
  const fastify = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Plugins
  await fastify.register(loadEnvPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(fastifySwagger);
  await fastify.register(fastifySwaggerUi, {
    staticCSP: true,
  });
  await fastify.register(fastifyHelmet, (fastify) => {
    return {
      contentSecurityPolicy: {
        directives: {
          ...fastifyHelmet.contentSecurityPolicy.getDefaultDirectives(),
          "form-action": ["'self'"],
          "img-src": ["'self'", "data:", "validator.swagger.io"],
          "script-src": ["'self'"].concat(fastify.swaggerCSP.script),
          "style-src": ["'self'", "https:"].concat(fastify.swaggerCSP.style),
        },
      },
    };
  });
  await fastify.register(fastifySensible);

  // Routes
  await fastify.register(boardsApiPlugin);
  await fastify.register(sectionsApiPlugin);
  await fastify.register(tasksApiPlugin);
  await fastify.register(healthApiPlugin);

  // Wait for plugins
  await fastify.ready();

  // Start app
  try {
    await fastify.listen({
      host: fastify.config.HOST,
      port: fastify.config.PORT,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
