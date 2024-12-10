// WorkerMessage.ts
import { WorkerLabelsEnum } from "../types/workerLabels.enum";

export class WorkerMessage<T = any> {
  label: WorkerLabelsEnum;
  content?: T;

  constructor(label: WorkerLabelsEnum, content?: T) {
    this.label = label;
    this.content = content;
  }
}

export interface WorkerRep<T = any> {
  data: WorkerMessage<T>;
}
