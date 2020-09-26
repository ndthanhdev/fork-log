import * as Types from "./types";
import * as Guards from "./guards";

import { createConsole, createLog } from "./create";

function toFullConfig<T extends Types.Logger>(
  namespaceOrConfig: string | Types.Config<T>,
  logger?: T
): Types.FullConfig<T> {
  if (typeof namespaceOrConfig === "string") {
    return {
      separator: ":",
      logger: logger ?? (console.log as T),
      namespace: namespaceOrConfig,
    };
  } else {
    return {
      separator: ":",
      logger: logger ?? (console.log as T),
      ...namespaceOrConfig,
    };
  }
}

export function createForkConsole(
  namespaceOrConfig: string | Types.Config<Types.ConsoleObj>,
  logger?: Types.ConsoleObj
) {
  const fullConfig: Types.FullConfig<Types.ConsoleObj> = toFullConfig(
    namespaceOrConfig,
    logger
  );

  return createConsole(fullConfig);
}

export function createForkLog(
  namespaceOrConfig: string | Types.Config<Types.LogFn>,
  logger?: Types.LogFn
): Types.ForkLog {
  const fullConfig: Types.FullConfig<Types.LogFn> = toFullConfig(
    namespaceOrConfig,
    logger
  );

  return createLog(
    fullConfig as Types.FullConfig<Types.LogFn>
  ) as Types.ForkLog;
}
