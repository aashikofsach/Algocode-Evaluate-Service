import type { Job } from "bullmq";

// import runCpp from "../containers/runCpp.js";
import type { IJob } from "../types/bullMq.JobDefinition.ts";
import type { SubmissionPayload } from "../types/submissionPayload.js";
import createExecutor from "../utils/ExecutorFactory.js";

export default class SubmissionJob implements IJob {
  name: string;
  payload?: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) 
  {
    this.payload = payload;
    this.name = this.constructor.name;
  }
  handle = async (job?: Job) => {
    console.log("Handler of the job called ");
    console.log(this.payload); //this is 1
    if (!job || !this.payload) return;

    // const keys = Object.keys(this.payload);
    // if (!keys.length) return;

    // const key = keys[0]; // now guaranteed string
    // const submission = this.payload[key];
    // const codeLanguage = submission.language;

    // if (codeLanguage === "CPP") {
    //   const response = await runCpp(submission.code, submission.inputCase);
    //   console.log("Evaluated Response is ", response);
    // }
    console.log("yaha par 33")
    if (job) {
      const key = Object.keys(this.payload)[0];
      if (!key) return;

      const submission = this.payload[key];
      console.log(submission, "line is 39")
      if (!submission) return;

          console.log("yaha par 42")

      const {
        language: codeLanguage,
        code: code,
        inputCase: inputTestCase,
        outputCase: outputTestCase,
      } = submission;
      console.log(codeLanguage,code,inputTestCase,outputTestCase) // they are coming undefined here 
      if (!codeLanguage || !code || !inputTestCase || !outputTestCase) return;

      console.log(codeLanguage, "yaha hai codelanguage")

      const strategy = createExecutor(codeLanguage);
      if (strategy !== null) {
        const response = await strategy.execute(code, inputTestCase , outputTestCase);
        if (response.status === "COMPLETED") {
          console.log("Code Executed Successfully");
          console.log(response);
        } else {
          console.log("something went wrong with code execution");
          console.log(response);
        }
      }
    }
  };
  failed = (job?: Job): void => {
    console.log("job failed ");
    if (job) {
      console.log(job.id);
    }
  };
}
