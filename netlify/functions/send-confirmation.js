import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { action, details } = JSON.parse(event.body);

        await resend.emails.send({
            from: 'Belfort Gerenciador <onboarding@resend.dev>',
            to: ['periniocorte@gmail.com'],
            subject: action,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h1 style="color: #0056b3;">${action}</h1>
                    <pre style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word;">${details}</pre>
                    <p style="font-size: 0.9em; color: #777;">Data/Hora: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
                </div>
            `,
        });

        return { statusCode: 200, body: JSON.stringify({ message: 'Email enviado' }) };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: error.toString() };
    }
}