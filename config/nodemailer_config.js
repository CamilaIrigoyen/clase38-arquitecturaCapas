import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {logger} from "../config/winston_config.js"
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD                                 
    },
    tls: {
        rejectUnauthorized: false
    }
});

export async function Email_NewUser(user) {
    
    try {
        
        let html = `
            <div>
                <h2><strong>Nuevo usuario</strong></h2>
                <p style="text-decoration: underline;">Nuevo usuario registrado en E-commerce - Backend - coderhouse</p>
                <ul>
                    <li>Email del usuario: <strong>${user.email}</strong></li>
                    <li>Nombre del usuario: <strong>${user.username}</strong></li>
                    <li>Edad del usuario: <strong>${user.age}</strong></li>
                    <li>Dirección del usuario: <strong>${user.address}</strong></li>
                </ul>
            </div>
        `;
        
        const mailOptions = {
            from: `Sistema de registro - E-commerce <${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "Aviso de nuevo usuario registrado",
            html: html,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        logger.error(
        `Error al enviar notificación (EMAIL) de nuevo registro: ${error}`
        );
    }
};

export async function Email_NewOrder(user, cart) {

    try {
        
        let html = `
            <div>
                <h2><strong>Nueva orden de compra</strong></h2>
                <p style="text-decoration: underline;">Nueva orden de compra en E-commerce - Backend - coderhouse</p>
                <p>Usuario: ${user.username} <${user.email}></p>
                <p>Cantidad de productos: ${cart.products.length}</p>
                <ul>

                    ${cart.products.forEach( prod => {
                        `<li>${prod.brand} ${prod.title} | ${prod.price} </li>`
                    })}

                </ul>

            </div>
        `;
        
        const mailOptions = {
            from: `Sistema de ordenes - E-commerce <${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `Nueva orden de compra de usuario: ${user.username} <${user.email}>`,
            html: html,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        logger.error(
        `Error al enviar notificación (EMAIL) de nueva orden: ${error}`
        );
    }
}