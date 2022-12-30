import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

export default function sendGmail(req: NextApiRequest, res: NextApiResponse) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.GMAILUSER,
            pass: process.env.GMAILPASSWORD,
        },
    });

    //管理人處理接受的Email
    const toHostMailData = {
        from: req.body.email,
        to: "JamesYan265@gmail.com",
        subject: `[主題] 從${req.body.name}`,
        text:  `${req.body.message} Send from ${req.body.email}`,
        html: `
            <p>[姓名]</p>
            <p>${req.body.name}</p>
            <p>[訊息內容]</p>
            <p>${req.body.message}</p>
            <p>[電郵地址]</p>
            <p>${req.body.email}</p>
        `,
    };

    transporter.sendMail(toHostMailData, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
    });

    return res.send('傳送成功');
}