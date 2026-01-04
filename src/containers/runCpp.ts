// import Docker from "dockerode";

// import type { TestCases } from "../types/testCases.js";
import { CPP_IMAGE } from "../utils/constants.js";
import createContainer from "./containerFactory.js";
import decodeDockerStream from "./dockerHelper.js";
import pullImage from "./pullImage.js";

async function runCpp(code: string , inputTestCase : string) {
  const rawBuffer :Buffer[] = [];
//   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
//     "python3",
//     "-c",
//     code,
//     "stty -echo",
//   ]);

const runCommand = `
  echo "${code.replace(/"/g, '\\"')}" > main.cpp && g++ main.cpp -o main
  echo "${inputTestCase.replace(/"/g, '\\"')}" | ./main
`;
// const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['echo', code , '> test.py && echo' ,inputTestCase , "|", "python3 test.py"
   
await pullImage(CPP_IMAGE);
const cppDockerContainer = await createContainer(CPP_IMAGE, [
  "/bin/sh",
  "-c",
  runCommand
]);
  await cppDockerContainer.start();

  const loggerStream = await cppDockerContainer.logs({
    stderr: true,
    stdout: true,
    follow: true,
    timestamps: false,
  });

  loggerStream.on("data", (chunk) => {
    rawBuffer.push(chunk);
  });

  // why we use await here , have to see it 
  const response = await new Promise((res)=>{
    loggerStream.on("end",()=>{
    console.log(rawBuffer);
    const completeBuffer = Buffer.concat(rawBuffer);

    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream);
    console.log(decodedStream.stdout);
    res(decodedStream);
  });

  });

  await cppDockerContainer.remove();
  // return pythonDockerContainer;  

  return response;
}

export default runCpp;
