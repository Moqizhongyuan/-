import { WorkerPoolForCrc32s } from "./workerPoolForCrc32s";
import { WorkerPoolForMd5s } from "./WorkerPoolForMd5s";

export class WorkerService {
  readonly MAX_WORKERS = 8;
  md5SingleWorkerPool: WorkerPoolForMd5s | undefined;
  crc32SingleWorkerPool: WorkerPoolForCrc32s | undefined;

  // 计算所有分片的 MD5
  getMD5ForFiles(chunks: ArrayBuffer[]): Promise<string[]> {
    if (this.md5SingleWorkerPool === undefined) {
      this.md5SingleWorkerPool = new WorkerPoolForMd5s(this.MAX_WORKERS);
    }
    return this.md5SingleWorkerPool.exec<string>(chunks);
  }

  // 计算所有分片的 CRC32
  getCRC32ForFiles(chunks: ArrayBuffer[]): Promise<string[]> {
    if (this.crc32SingleWorkerPool === undefined) {
      this.crc32SingleWorkerPool = new WorkerPoolForCrc32s(this.MAX_WORKERS);
    }
    return this.crc32SingleWorkerPool.exec<string>(chunks);
  }
}
