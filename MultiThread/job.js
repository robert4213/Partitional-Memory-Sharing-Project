const { workerData, parentPort, threadId } = require('worker_threads');

const limit = workerData;
const step = limit / 10;

for (let i = 1; i <= limit; i++) {
    if (i % step === 0) {
        parentPort.postMessage(`Thread ${threadId} at ${i / limit * 100}%`)
    }
}