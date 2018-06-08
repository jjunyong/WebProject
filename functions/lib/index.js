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
//매치 성사시 신청한 사람에게 이메일
// export const matchComplteEmail =
//     functions.firestore.document(`matches/{MatchId}/isMatched`)
//         .onUpdate((snap, context) => {
//             const match = snap.after.data();
//             const user = admin.firestore().collection('users').doc(match.away_id).
//             const mailOptions = {
//                 from: `${APP_NAME} <hdaution@gmail.com>`,
//                 to: user.email,
//                 subject: `New challenge to your team!`,
//                 text: ` ${user.displayName}! 당신의 팀에 새로운 도전자가 등장하였습니다.
//                 접속하여 수락 또는 거부하여주세요.
//                         -from ${APP_NAME}.`
//             };
//             return mailTransport.sendMail(mailOptions).then(() => {
//                 console.log(`matchRequestEmail sent to ${user.email}`);
//             });
//         });
//매치 신청시 호스트에게 이메일
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