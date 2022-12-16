import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default async function signout(req:NextApiRequest, res:NextApiResponse){

    res.setHeader('Set-Cookie', 
        cookie.serialize(
            'auth', '', {
                expires: new Date(0),
                path: '/'
            }
        ),
      
    );

   return res.status(200).json({
       success: 'Successfully logged out'
   });

}