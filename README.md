# fork-log

![Push CI](https://github.com/ndthanhdev/fork-log/workflows/Push%20CI/badge.svg)

## Usage

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
