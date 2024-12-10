import { WorkerWrapper } from "./util/workerWrapper";
import { WorkerPool } from "./util/workerPool";

export class WorkerPoolForMd5s extends WorkerPool {
  constructor(maxWorkers: number) {
    super(maxWorkers);
    this.pool = Array.from({ length: this.maxWorkerCount }).map(
      () =>
        new WorkerWrapper(new Worker(new URL("./md5.worker", import.meta.url)))
    );
  }
}
