/// <reference lib="webworker" />

import { WorkerMessage } from "./util/workerMessage";
import { WorkerLabelsEnum } from "./types/workerLabels.enum";
import SparkMD5 from "spark-md5";

addEventListener("message", ({ data }: { data: ArrayBuffer }) => {
  const hash = SparkMD5.ArrayBuffer.hash(data);

  postMessage(
    new WorkerMessage(WorkerLabelsEnum.DONE, {
      result: hash,
      chunk: data,
    }),
    [data] // 用于 transfer 的数据, 以避免结构化克隆
  );
});
