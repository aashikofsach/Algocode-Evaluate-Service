//we are writing below strtegy code, to improve the code implementation in runPythonDocker.ts

export default interface CodeExecutorStrategy {
  execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string,
  ): Promise<ExecutionResponse>;
}

export type ExecutionResponse = { output: string; status: string };
