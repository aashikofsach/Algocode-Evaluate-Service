import type DockerStreamOutput from "../types/dockerStreamOutput.js";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants.js";

export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0; // this variable keep tracking of the buffer while parsing

  // this output will store the accumulated stdout and stderr output as string
  const output: DockerStreamOutput = { stdout: "", stderr: "" };

  while (offset < buffer.length) {
    // channel is read from buffer and has value of type of stream
    const typeOfStream = buffer[offset];


    // this length varible holds the length of the value, we will read this varible on the offset of 4 bytes from the start of the chunk
    const length = buffer.readUint32BE(offset + 4);


    // as we read the header, we can move to value of chunk
    offset += DOCKER_STREAM_HEADER_SIZE;

    if (typeOfStream === 1) {
      //stdout stream
      output.stdout += buffer.toString('utf-8', offset , offset + length);
    } else if (typeOfStream === 2) {
      //stderr stream
            output.stderr += buffer.toString('utf-8', offset , offset + length);

    }

    offset +=length; // here we move offset to next chunk
  }

  return output;
}
