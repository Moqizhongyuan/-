import { WorkerPool } from "./util/workerPool";
import { WorkerWrapper } from "./util/workerWrapper";

export class WorkerPoolForCrc32s extends WorkerPool {
  constructor(maxWorkers = navigator.hardwareConcurrency || 4) {
    super(maxWorkers);
    this.pool = Array.from({ length: this.maxWorkerCount }).map(
      () =>
        new WorkerWrapper(
          new Worker(new URL("./crc32.worker", import.meta.url))
        )
    );
  }
}
