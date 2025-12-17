import type { Request, Response } from "express";

export const pingCheck = (req :Request, res : Response)=>
{
    console.log(req.url);
    return res.json(({
        message : "Ping check is OK "
    }));
    
};