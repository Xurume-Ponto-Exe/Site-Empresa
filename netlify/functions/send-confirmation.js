import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);


export async function handler(event) {
    
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        
        const { action, details } = JSON.parse(event.body);

        
        await resend.emails.send({
            from: 'Belfort Engenharia <testedenotificações.com>',
            to: ['eziosanches37@gmail.com'], // MUDE PARA O EMAIL QUE RECEBERÁ AS NOTIFICAÇÕES
            subject: `Confirmação de Ação: ${action}`,
            html: `
                <h1>Confirmação de Ação no Sistema</h1>
                <p>Uma nova ação foi realizada com sucesso:</p>
                <p><strong>Ação:</strong> ${action}</p>
                <p><strong>Detalhes:</strong></p>
                <pre style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${details}</pre>
                <p>Data/Hora: ${new Date().toLocaleString('pt-BR')}</p>
            `,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email enviado com sucesso!' }),
        };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: error.toString() };
    }
}