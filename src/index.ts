import type { Express } from 'express';
import express from 'express' ;

import serverConfig from './config/serverConfig.js';


const app : Express= express() ;

app.listen(serverConfig.PORT , () => {

    
    console.log(`server is running  or well  on ${serverConfig.PORT}`);});

