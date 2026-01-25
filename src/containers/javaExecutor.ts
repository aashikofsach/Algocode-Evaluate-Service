// import Docker from "dockerode";

// import type { TestCases } from "../types/testCases.js";
import type { ExecutionResponse } from "../types/CodeExecutorStrategy.js";
import type CodeExecutorStrategy from "../types/CodeExecutorStrategy.js";
import { JAVA_IMAGE } from "../utils/constants.js";
import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";

class JavaExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string,
  ): Promise<ExecutionResponse> {
    console.log(code, inputTestCase, outputTestCase);
    console.log("java executor called ");
    const rawBuffer: Buffer[] = [];
    //   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    //     "python3",
    //     "-c",
    //     code,
    //     "stty -echo",
    //   ]);

    await pullImage(JAVA_IMAGE);

    const runCommand = `
  echo "${code.replace(/"/g, '\\"')}" > Main.java && javac Main.java
  echo "${inputTestCase.replace(/"/g, '\\"')}" | java Main
`;
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['echo', code , '> test.py && echo' ,inputTestCase , "|", "python3 test.py"

    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);
    await javaDockerContainer.start();

    const loggerStream = await javaDockerContainer.logs({
      stderr: true,
      stdout: true,
      follow: true,
      timestamps: false,
    });

    loggerStream.on("data", (chunk) => {
      rawBuffer.push(chunk);
    });

    // why we use await here , have to see it
    try {
      const codeResponse: string = await this.fetchDecodedStream(
        loggerStream,
        rawBuffer,
      );

      return { output: codeResponse, status: "COMPLETED" };
    } catch (error) {
      return { output: error as string, status: "ERROR" };
    } finally {
      await javaDockerContainer.remove();
    }

    // return pythonDockerContainer;
  }

  fetchDecodedStream(
    loggerStream: NodeJS.ReadableStream,
    rawBuffer: Buffer[],
  ): Promise<string> {
    return new Promise((res, rej) => {
      loggerStream.on("end", () => {
        console.log(rawBuffer);
        const completeBuffer = Buffer.concat(rawBuffer);

        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);

        // res(decodedStream);
        if (decodedStream.stderr) rej(decodedStream.stderr);
        else res(decodedStream.stdout);
      });
    });
  }
}

// async function runJava(code: string, inputTestCase: string) {}

export default JavaExecutor;
