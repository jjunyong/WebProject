"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
admin.initializeApp(functions.config().firebase);
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const APP_NAME = '한동 매칭';
//입찰한 물건에 새로운 입찰자
exports.matchRequestEmail = functions.firestore.document(`users/{UserId}`)
    .onUpdate((snap, context) => {
    const user = snap.after.data();
    const mailOptions = {
        from: `${APP_NAME} <hdaution@gmail.com>`,
        to: user.email,
        subject: `New challenge to your team!`,
        text: ` ${user.displayName}! 당신의 팀에 새로운 도전자가 등장하였습니다.
                접속하여 수락 또는 거부하여주세요.
                        -from ${APP_NAME}.`
    };
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log(`matchRequestEmail sent to ${user.email}`);
    });
});
//# sourceMappingURL=index.js.map