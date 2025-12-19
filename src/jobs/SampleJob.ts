import type { Job } from 'bullmq';

import type {IJob} from '../types/bullMq.JobDefinition.ts'; 

export default class SampleJob implements IJob{
    name : string ;
    payload?: Record<string, unknown>;

    constructor(payload : Record<string , unknown>)
    {
        this.payload =payload;
        this.name = this.constructor.name;
    }
    handle= () => {
        console.log("Handler of the job called ");
    };
    failed = (job ?: Job) : void => {
        console.log("job failed ");
        if(job)  
        {
            console.log(job.id);
        }
    };
}