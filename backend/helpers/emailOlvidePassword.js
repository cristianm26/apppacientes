import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;
    // Enviar al correo
    const info = await transport.sendMail({
        from: 'Adminsitrador de Veterinaria',
        to: email,
        subject: 'Reestablecer contraseña',
        text: `Reestablecer contraseña`,
        html: `<h1>Hola ${nombre}, haz solicitado reestablecer tu contraseña:</h1>
        
        <a href="http://localhost:3000/olvide-password/${token}"> Reestablecer Password</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        
        `
    });
}

export default emailOlvidePassword;