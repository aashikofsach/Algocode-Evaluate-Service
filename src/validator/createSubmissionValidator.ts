import type { NextFunction , Request , Response} from "express";
import { ZodSchema } from "zod/v3";

import type { createSubmissionDto } from "../dtos/createSubmissionDto.js";

export const validateCreateSubmissionDto = (schema : ZodSchema<createSubmissionDto>)=> (req : Request , res : Response , next : NextFunction) =>{

    try {
        schema.parse({...req.body});

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : "Bad Request"
        });
        
    }
};
