import { NextApiRequest, NextApiResponse } from "next";
import cookie, { serialize } from 'cookie';

export default async function signout(req:NextApiRequest, res:NextApiResponse){
const {cookies}=req;
const jwt=cookies.authToken;
if(!jwt){
    return res.status(401).json({
        error: 'Not authorized'
    });
}
else{
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

   return res.status(200).json({
       success: 'Successfully logged out'
   });
}

}