import express from 'express';

import { pingCheck } from '../../controller/pingController.js';

const v1Router = express.Router();

v1Router.get("/", pingCheck);

export default v1Router;