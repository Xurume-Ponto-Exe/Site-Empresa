import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = 'Belfort Gerenciador <testedenotificações.com>'; // Email padrão do Resend
const toEmail = 'eziosanches37@gmail.com'; // **TROQUE PELO SEU EMAIL**

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { action, details } = JSON.parse(event.body);

        await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            subject: `Confirmação de Ação: ${action}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h1 style="color: #0056b3;">Confirmação de Ação no Sistema</h1>
                    <p>Uma nova ação foi realizada com sucesso:</p>
                    <p><strong>Ação:</strong> ${action}</p>
                    <p><strong>Detalhes:</strong></p>
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