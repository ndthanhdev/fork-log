import * as Types from "./types";

function createNameLog(logger: Types.LogFn, namespace: string): Types.LogFn {
  return function createNameLog(...data: any[]) {
    return logger.call(undefined, namespace, ...data);
  };
}

export function createLog(
  config: Types.FullConfig<Types.LogFn>
): Types.ForkLog {
  const { namespace, logger, separator } = config;

  const log: any = createNameLog(logger, namespace);

  log.fork = function fork(forkNamespace: string) {
    const forkConfig: Types.FullConfig<Types.LogFn> = {
      logger,
      separator,
      namespace: [namespace, forkNamespace].join(separator),
    };

    return createLog(forkConfig);
  };

  return log;
}

export function createConsole(
  config: Types.FullConfig<Types.ConsoleObj>
): Types.ForkConsole {
  const { namespace, logger, separator } = config;

  function fork(forkNamespace: string) {
    return createConsole({
      logger,
      separator,
      namespace: [namespace, forkNamespace].join(separator),
    });
  }

  const debug = createNameLog(logger.debug, namespace);
  const log = createNameLog(logger.log, namespace);
  const warn = createNameLog(logger.warn, namespace);
  const error = createNameLog(logger.error, namespace);

  return {
    debug,
    log,
    warn,
    error,
    fork,
  };
}
