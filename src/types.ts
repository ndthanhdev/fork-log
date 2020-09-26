export type LogFn = (...data: any[]) => void;

export type ConsoleObj = {
  debug: LogFn;
  log: LogFn;
  warn: LogFn;
  error: LogFn;
};

export type Logger = LogFn | ConsoleObj;

export type Config<T extends Logger> = {
  namespace: string;
  logger?: T;
  separator?: string;
};

export type FullConfig<T extends Logger> = {
  namespace: string;
  logger: T;
  separator: string;
};

export type ForkLog = {
  (...data: any[]): void;
  fork: (namespace: string) => ForkLog;
};

export type ForkConsole = {
  debug: LogFn;
  log: LogFn;
  warn: LogFn;
  error: LogFn;
  fork: (namespace: string) => ForkConsole;
};
