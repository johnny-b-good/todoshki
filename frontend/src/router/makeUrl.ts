// App
// -----------------------------------------------------------------------------
import { paths } from "./paths";
import { RouteName } from "./RouteName";

function makeUrl(routeName: "root"): string;

function makeUrl(routeName: "boardList"): string;

function makeUrl(
  routeName: RouteName,
  params?: Record<string, string | number>,
): string {
  let path = paths[routeName];

  if (!path) {
    throw new Error(`Unknown route name "${routeName}"`);
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value?.toString());
    }
  }

  return path;
}

export { makeUrl };
