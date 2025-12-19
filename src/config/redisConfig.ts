import {Redis} from "ioredis"; 

import serverConfig from "./serverConfig.js";

const redisConfig ={
    port : serverConfig.REDIS_PORT,
    host : serverConfig.REDIS_HOST

};

const redis = new Redis(redisConfig);

export default redis ;

