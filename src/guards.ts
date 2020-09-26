import * as Types from "./types";

export function isLog(a: any): a is Types.Config<Types.LogFn> {
  return true;
}

export function isConsole(a: any): a is Types.Config<Types.ConsoleObj> {
  return true;
}
