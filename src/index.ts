import bodyParser from "body-parser";
import type { Express } from "express";
import express from "express";

import bullBoardAdapter from "./config/bullBoardConfig.js";
import serverConfig from "./config/serverConfig.js";
// import runJava from "./containers/runJavaDocker.js";
// import runPython from "./containers/runPythonDocker.js";
// import sampleQueueProducer from "./producer/sampleQueueProducer.js";
import apiRouter from "./router/index.js";
import SampleWorker from "./workers/sampleWorker.js";
import runCpp from "./containers/runCpp.js";
const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);
app.use("/ui", bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  const a = 10;
  console.log(a);

  console.log(`server is running  or well  on ${serverConfig.PORT}`);
  console.log(
    `bull board dashboard running on server : http://localhost:${serverConfig.PORT}/ui`
  );

  SampleWorker("SampleQueue");

  // sampleQueueProducer('SampleJob', {
  //   name : "Aaditya",
  //   company : "Microsoft",
  //   position : "SDE-2 L60",
  //   location : "Remote"

  // },2);
  // sampleQueueProducer('SampleJob', {
  //   name : "Aashish",
  //   company : "Google",
  //   position : "SDE-2 L60",
  //   location : "Remote || Noida || Banglore"

  // },1);

  // const code = `prit("hello Bhai")`;
  //   const code = `x = input()
  // print("value of x is ", x)`;

  //   const code = `
  // import java.util.*;

  // public class Main {
  //   public static void main(String[] args) {
  //     Scanner scn = new Scanner(System.in);
  //     int input = scn.nextInt();

  //     System.out.println("input value given by user is " + input);

  //     for (int i = 0; i < input; i++) {
  //       System.out.println(i);
  //     }
  //   }
  // }

  // `;

  const code = `
#include <iostream>
using namespace std;

int main()
{
int x ;
cin>>x;
cout<<"value of x is "<<x<<endl;
for(int i=0 ; i<x ;i++)
{
  cout<<i<< " ";
}
}
`;

  const inputCase = `100`;

  // runPython(code , "100");
  // runJava(code, inputCase);
  runCpp(code, inputCase);
});
