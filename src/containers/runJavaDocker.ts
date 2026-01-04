// import Docker from "dockerode";

// import type { TestCases } from "../types/testCases.js";
import { JAVA_IMAGE } from "../utils/constants.js";
import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";

async function runJava(code: string , inputTestCase : string) {
  const rawBuffer :Buffer[] = [];
//   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
//     "python3",
//     "-c",
//     code,
//     "stty -echo",
//   ]);

const runCommand = `
  echo "${code.replace(/"/g, '\\"')}" > Main.java && javac Main.java
  echo "${inputTestCase.replace(/"/g, '\\"')}" | java Main
`;
// const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['echo', code , '> test.py && echo' ,inputTestCase , "|", "python3 test.py"
   
await pullImage(JAVA_IMAGE);

const javaDockerContainer = await createContainer(JAVA_IMAGE, [
  "/bin/sh",
  "-c",
  runCommand
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
  await new Promise((res)=>{
    loggerStream.on("end",()=>{
    console.log(rawBuffer);
    const completeBuffer = Buffer.concat(rawBuffer);

    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream);
    console.log(decodedStream.stdout);
    res(decodeDockerStream);
  });

  });

  await javaDockerContainer.remove();
  // return pythonDockerContainer;  
}

export default runJava;
