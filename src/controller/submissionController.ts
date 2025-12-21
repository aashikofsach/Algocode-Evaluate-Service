import type { Request , Response } from "express";

import type { createSubmissionDto } from "../dtos/createSubmissionDto.js";

export function addSubmission(req : Request , res : Response)
{
    const submissionDto = req.body as createSubmissionDto;


    return res.status(201).json({
        success : true ,
        error : {} ,
        message : `Successfully collected the submission`,
        data : submissionDto
    });
}