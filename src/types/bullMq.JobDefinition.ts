import type {Job} from "bullmq";

// Job is at least type here

export interface IJob{
    name : string,
    payload?: Record<string , unknown>,
    handle : (job?: Job) => void ;
    failed : (job?: Job) => void ;
}
