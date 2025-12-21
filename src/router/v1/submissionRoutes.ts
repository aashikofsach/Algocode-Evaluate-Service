import express from 'express';

import { addSubmission } from '../../controller/submissionController.js';
import { createSubmissionZodSchema } from '../../dtos/createSubmissionDto.js';
import { validateCreateSubmissionDto } from '../../validator/createSubmissionValidator.js';


const submissionRouter = express.Router();

submissionRouter.post("/", validateCreateSubmissionDto(createSubmissionZodSchema) ,addSubmission);

export default submissionRouter;