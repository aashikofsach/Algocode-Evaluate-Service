import type { Job } from "bullmq";

import runCpp from "../containers/runCpp.js";
import type { IJob } from "../types/bullMq.JobDefinition.ts";
import type { SubmissionPayload } from "../types/submissionPayload.js";

export default class SubmissionJob implements IJob {
  name: string;
  payload?: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }
  handle = async (job?: Job) => {
    console.log("Handler of the job called ");
    console.log(this.payload); //this is 1
    if (!job || !this.payload) return;

    const keys = Object.keys(this.payload);
    if (!keys.length) return;

    const key = keys[0]; // now guaranteed string
    const submission = this.payload[key];
    const codeLanguage = submission.language;

    if (codeLanguage === "CPP") {
      const response = await runCpp(submission.code, submission.inputCase);
      console.log("Evaluated Response is ", response);
    }
  };
  failed = (job?: Job): void => {
    console.log("job failed ");
    if (job) {
      console.log(job.id);
    }
  };
}
