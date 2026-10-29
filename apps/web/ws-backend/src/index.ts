import {WebSocketServer} from 'ws';
import jwt from "jsonwebtoken";
import {JWT_SECRET} from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080});

wss.on('connection', function connection(ws, request){
    const url = request.url;
    if(!url)
    {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1] ?? "");
    const token = queryParams.get('token');
    const decoded = token ? jwt.verify(token,JWT_SECRET) : null;

    
    if(!decoded || typeof decoded !== "object" || !decoded.userId)
    {
        ws.close();
        return;
    }

// the user has been authenticated and allowed
    ws.on('message', function message(data){
        ws.send('pong');
    });
});

                             
