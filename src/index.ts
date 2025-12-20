import type { Express } from "express";
import express from "express";

import serverConfig from "./config/serverConfig.js";
import sampleQueueProducer from "./producer/sampleQueueProducer.js";
import apiRouter from "./router/index.js";
import SampleWorker from "./workers/sampleWorker.js";

const app: Express = express();

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  const a = 10;
  console.log(a);

  console.log(`server is running  or well  on ${serverConfig.PORT}`);

  SampleWorker("SampleQueue");

  sampleQueueProducer('SampleJob', {
    name : "Aashish",
    company : "Google",
    position : "SDE-2 L60",
    location : "Remote || Noida || Banglore"
    
  });
});
