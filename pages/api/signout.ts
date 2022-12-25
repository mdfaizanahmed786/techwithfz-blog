import { NextApiRequest, NextApiResponse } from "next";
import cookie, { serialize } from 'cookie';

export default async function signout(req:NextApiRequest, res:NextApiResponse){
if (req.method !== 'POST') return res.status(405).json({ status: 'fail', message: 'Method not allowed here!' });
const {cookies}=req;
const jwt=cookies.authToken;
if(!jwt){
    return res.status(401).json({
        error: 'Not authorized'
    });
}
if (req.body.key === 'static_key') {
    const serialized=serialize('authToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
    })

    res.setHeader('Set-Cookie', 
    serialized
    );
}
   return res.status(200).json({
       success: 'Successfully logged out'
   });
}

