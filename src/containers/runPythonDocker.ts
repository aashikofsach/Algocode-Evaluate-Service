// import Docker from "dockerode";

// import type { TestCases } from "../types/testCases.js";
import type CodeExecutorStrategy from "../types/CodeExecutorStrategy.js";
import type DockerStreamOutput from "../types/dockerStreamOutput.js";
import { PYTHON_IMAGE } from "../utils/constants.js";
import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";

class PythonExecutor implements CodeExecutorStrategy {
  async execute(code: string, inputTestCase: string): string {
    const rawBuffer: Buffer[] = [];
    //   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    //     "python3",
    //     "-c",
    //     code,
    //     "stty -echo",
    //   ]);

    const runCommand = `
  echo "${code.replace(/"/g, '\\"')}" > test.py &&
  echo "${inputTestCase.replace(/"/g, '\\"')}" | python3 test.py
`;
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['echo', code , '> test.py && echo' ,inputTestCase , "|", "python3 test.py"

    await pullImage(PYTHON_IMAGE);
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);
    await pythonDockerContainer.start();

    const loggerStream = await pythonDockerContainer.logs({
      stderr: true,
      stdout: true,
      follow: true,
      timestamps: false,
    });

    loggerStream.on("data", (chunk) => {
      rawBuffer.push(chunk);
    });

    // why we use await here , have to see it
    const codeResponse = await this.fetchDecodedStream(loggerStream,rawBuffer)
    
    
    await pythonDockerContainer.remove();
    // return pythonDockerContainer;

    return codeResponse;
  }

  fetchDecodedStream(loggerStream : NodeJS.ReadableStream, rawBuffer : Buffer[]) {
    return new Promise((res, rej) => {
      loggerStream.on("end", () => {
        console.log(rawBuffer);
        const completeBuffer = Buffer.concat(rawBuffer);

        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
        res(decodedStream);
        if (decodedStream.stderr) rej(decodedStream.stderr);
        else res(decodedStream.stdout);
      });
    });
  }
}

async function runPython(code: string, inputTestCase: string) {
  //   const rawBuffer :Buffer[] = [];
  // //   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
  // //     "python3",
  // //     "-c",
  // //     code,
  // //     "stty -echo",
  // //   ]);
  // const runCommand = `
  //   echo "${code.replace(/"/g, '\\"')}" > test.py &&
  //   echo "${inputTestCase.replace(/"/g, '\\"')}" | python3 test.py
  // `;
  // // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['echo', code , '> test.py && echo' ,inputTestCase , "|", "python3 test.py"
  // await pullImage(PYTHON_IMAGE);
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
  //   "/bin/sh",
  //   "-c",
  //   runCommand
  // ]);
  //   await pythonDockerContainer.start();
  //   const loggerStream = await pythonDockerContainer.logs({
  //     stderr: true,
  //     stdout: true,
  //     follow: true,
  //     timestamps: false,
  //   });
  //   loggerStream.on("data", (chunk) => {
  //     rawBuffer.push(chunk);
  //   });
  //   // why we use await here , have to see it
  //   await new Promise((res)=>{
  //     loggerStream.on("end",()=>{
  //     console.log(rawBuffer);
  //     const completeBuffer = Buffer.concat(rawBuffer);
  //     const decodedStream = decodeDockerStream(completeBuffer);
  //     console.log(decodedStream);
  //     res(decodeDockerStream);
  //   });
  //   });
  //   await pythonDockerContainer.remove();
  //   // return pythonDockerContainer;
}

export default PythonExecutor;
