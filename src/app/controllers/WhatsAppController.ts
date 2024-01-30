import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import twilio from 'twilio';

require('dotenv').config();

// Notificação whatsapp Twilio

const accountSid = "AC213011da1c2440c182679eace906b979";
const authToken = "34717d5cd629022e6816fab63272039c";
const client = require('twilio')(accountSid, authToken);

const sendWhatsAppMessage = async(body: string) => {
    try {

        const message = await client.messages
        .create({
            body: 'Olá, você recebeu uma encomenda no seu Endereço Fiscal na Softex (PE).',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+558195377769'
        })
        console.log(`WhatsApp mensagem enviada, código SID: ${message.sid}`);
    } catch (error: any) {
        console.error('Erro ao enviar mensagem no WhatsApp.', error.message);
        throw error;
    }
}

export { sendWhatsAppMessage };