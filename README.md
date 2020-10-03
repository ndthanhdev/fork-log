# fork-log

![build](https://github.com/ndthanhdev/fork-log/workflows/build/badge.svg)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A tiny utility to structure log.

# Examples

**Log**

```javascript
import { createForkLog } from "fork-log";

const workerLog = createForkLog("worker");
const workerALog = workerLog.fork("A");

const workerBLog = workerLog.fork("B");
const addFunLog = workerBLog.fork("addFun");

workerALog("doing some work");
// worker:A doing some work
workerBLog("doing lots of uninteresting work");
// worker:B doing lots of uninteresting work
addFunLog("learn a joke");
// worker:B:addFun learn a joke
```

**Console**

```javascript
import { createForkConsole } from "fork-log";

const AppLog = createForkConsole("app", console);
const HttpLog = AppLog.fork("http");
const HttpsLog = AppLog.fork("https");

AppLog.log("booting");
// ℹ app booting
AppLog.warn("http is not secure");
// ⚠ app http is not secure
HttpLog.error("you was hacked");
// ❗ app:http you was hacked
HttpsLog.log("poor http guy");
// ℹ app:https poor http guy
```
