import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from '@repo/backend-common/config';
import {CreateUserSchema,CreateRoomSchema,SigninSchema} from "@repo/common/types";
import {middleware} from "./middleware";
 
const app = express();

app.post("/signup", (req,res)=>{
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success)
    {
        return res.json({
            message: "incorrect inputs"
        })
    }
}) 

app.post("/signin", (req,res)=>{
// get user id from the database
 const data = SigninSchema.safeParse(req.body);
    if(!data.success)
    {
        return res.json({
            message: "incorrect inputs"
        })
        
    }
    const userId = 1;
    const token = jwt.sign({
        userId 
    },JWT_SECRET);
    res.json({
        token
    }) 
    
})

app.post("/room",middleware, (req,res)=>{
     const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success)
    {
        return res.json({
            message: "incorrect inputs"
        })
    }
    //db calll if signed in create a new room and return the room id
    res.json({
        roomId:123
    })
})

app.listen(3000);