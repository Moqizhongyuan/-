/// <reference lib="webworker" />

import { getCrc, getCrcHex } from "./util/uploadHelper";
import { WorkerMessage } from "./util/workerMessage";
import { WorkerLabelsEnum } from "./types/workerLabels.enum";

addEventListener("message", ({ data }: { data: ArrayBuffer }) => {
  const crc = getCrc(data);
  const hash = getCrcHex(crc);

  postMessage(
    new WorkerMessage(WorkerLabelsEnum.DONE, {
      result: hash,
      chunk: data,
    }),
    [data] // 用于 transfer 的数据, 以避免结构化克隆
  );
});
