import bodyParser from "body-parser";
import type { Express } from "express";
import express from "express";

import bullBoardAdapter from "./config/bullBoardConfig.js";
import serverConfig from "./config/serverConfig.js";
import sampleQueueProducer from "./producer/sampleQueueProducer.js";
import apiRouter from "./router/index.js";
import SampleWorker from "./workers/sampleWorker.js";
const app: Express = express();


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);
app.use('/ui',bullBoardAdapter.getRouter());


app.listen(serverConfig.PORT, () => {
  const a = 10;
  console.log(a);

  console.log(`server is running  or well  on ${serverConfig.PORT}`);
  console.log(`bull board dashboard running on server : http://localhost:${serverConfig.PORT}/ui`);

  SampleWorker("SampleQueue");

  sampleQueueProducer('SampleJob', {
    name : "Aaditya",
    company : "Microsoft",
    position : "SDE-2 L60",
    location : "Remote"
    
  },2);
  sampleQueueProducer('SampleJob', {
    name : "Aashish",
    company : "Google",
    position : "SDE-2 L60",
    location : "Remote || Noida || Banglore"
    
  },1);
});
