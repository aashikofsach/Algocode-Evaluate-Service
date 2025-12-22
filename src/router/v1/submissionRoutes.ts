import express from 'express';

import { addSubmission } from '../../controller/submissionController.js';
import { createSubmissionZodSchema } from '../../dtos/zodValidator.js';
import { validator } from '../../validator/createSubmissionValidator.js';


const submissionRouter = express.Router();

submissionRouter.post("/", validator(createSubmissionZodSchema) ,addSubmission);

export default submissionRouter;