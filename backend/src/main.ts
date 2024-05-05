// Node
// -----------------------------------------------------------------------------
import process from "node:process";

// Lib
// -----------------------------------------------------------------------------
import Fastify from "fastify";
import fastifyHelmet from "@fastify/helmet";
import fastifySensible from "@fastify/sensible";

// App
// -----------------------------------------------------------------------------
import { loadEnvPlugin, prismaPlugin } from "./plugins/index.js";
import {
  boardsApiPlugin,
  sectionsApiPlugin,
  tasksApiPlugin,
} from "./routes/index.js";

const start = async () => {
  /** App object */
  const fastify = Fastify({
    logger: true,
  });

  // Plugins
  await fastify.register(loadEnvPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(fastifyHelmet);
  await fastify.register(fastifySensible);

  // Routes
  await fastify.register(boardsApiPlugin);
  await fastify.register(sectionsApiPlugin);
  await fastify.register(tasksApiPlugin);

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

await start();
