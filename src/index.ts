import type { Express } from 'express';
import express from 'express' ;

import serverConfig from './config/serverConfig.js';
import apiRouter from './router/index.js';


const app : Express= express() ;

app.use("/api", apiRouter);

app.listen(serverConfig.PORT , () => {

    const a = 10 ;
    console.log(a);

    
    console.log(`server is running  or well  on ${serverConfig.PORT}`);});

