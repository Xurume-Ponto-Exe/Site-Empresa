import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ message: 'Method Not Allowed' }) 
        };
    }

    try {
        const { action, details } = JSON.parse(event.body);

        if (!action || !details) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Missing action or details in request body' }) 
            };
        }

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

        return { 
            statusCode: 200, 
            body: JSON.stringify({ message: 'Email enviado com sucesso' }) 
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ message: 'Erro ao enviar o email', error: error.message })
        };
    }
}