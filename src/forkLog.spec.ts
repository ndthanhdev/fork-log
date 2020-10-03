import { createForkLog, createForkConsole } from "./forkLog";

function createInMemLog() {
  const io: string[] = [];

  function log(...data: any) {
    io.push(data.join(" "));
  }

  log.get = function get() {
    return [...io];
  };

  return log;
}

function crateInMemConsole() {
  const baseLog = createInMemLog();

  return {
    debug: (...data: any[]) => baseLog("debug:" + data[0], data.slice(1)),
    log: (...data: any[]) => baseLog("log:" + data[0], data.slice(1)),
    warn: (...data: any[]) => baseLog("warn:" + data[0], data.slice(1)),
    error: (...data: any[]) => baseLog("error:" + data[0], data.slice(1)),
    get: baseLog.get,
  };
}

describe("log", () => {
  test("fork", () => {
    const baseLog = createInMemLog();

    const logA = createForkLog("A", baseLog);

    logA(1);

    const logAB = logA.fork("B");
    logAB(2);

    const logABC = logAB.fork("C");
    logABC(3);

    const logAD = logA.fork("D");
    logAD(4);

    expect(baseLog.get()).toEqual(["A 1", "A:B 2", "A:B:C 3", "A:D 4"]);
  });

  test("config", () => {
    const baseLog = createInMemLog();

    const logA = createForkLog({
      namespace: "A",
      logger: baseLog,
      separator: "-",
    });

    logA(1);

    const logAB = logA.fork("B");
    logAB(2);

    expect(baseLog.get()).toEqual(["A 1", "A-B 2"]);
  });
});

describe("console", () => {
  test("fork", () => {
    const Con = crateInMemConsole();

    const logA = createForkConsole("A", Con);

    logA.debug(1);

    const logAB = logA.fork("B");
    logAB.log(2);

    const logABC = logAB.fork("C");
    logABC.warn(3);

    const logAD = logA.fork("D");
    logAD.error(4);

    expect(Con.get()).toEqual([
      "debug:A 1",
      "log:A:B 2",
      "warn:A:B:C 3",
      "error:A:D 4",
    ]);
  });

  test("config", () => {
    const Con = crateInMemConsole();

    const logA = createForkConsole({
      namespace: "A",
      logger: Con,
      separator: "-",
    });

    logA.debug(1);

    const logAB = logA.fork("B");
    logAB.log(2);

    expect(Con.get()).toEqual(["debug:A 1", "log:A-B 2"]);
  });
});
