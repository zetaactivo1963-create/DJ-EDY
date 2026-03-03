// api/generate-quote-pdf.js
// Vercel Serverless Function para generar PDF

import { jsPDF } from 'jspdf';

export default async function handler(req, res) {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      nombre,
      whatsapp,
      email,
      fecha,
      personas,
      lugar,
      servicios,
      total
    } = req.body;

    // Crear PDF
    const doc = new jsPDF();
    
    // Header - Logo/Título
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont(undefined, 'bold');
    doc.text('DJ EDY', 105, 25, { align: 'center' });
    
    // Reset color
    doc.setTextColor(0, 0, 0);
    
    // Título
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('COTIZACIÓN', 105, 55, { align: 'center' });
    
    // Info del cliente
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    let y = 75;
    const lineHeight = 7;
    
    // Box gris para info cliente
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y - 5, 170, 50, 'F');
    
    doc.setFont(undefined, 'bold');
    doc.text('DATOS DEL CLIENTE', 25, y);
    doc.setFont(undefined, 'normal');
    
    y += lineHeight + 2;
    doc.text(`Nombre: ${nombre}`, 25, y);
    y += lineHeight;
    doc.text(`WhatsApp: ${whatsapp}`, 25, y);
    y += lineHeight;
    doc.text(`Email: ${email}`, 25, y);
    y += lineHeight;
    doc.text(`Fecha evento: ${fecha}`, 25, y);
    y += lineHeight;
    doc.text(`Personas: ${personas}`, 25, y);
    doc.text(`Lugar: ${lugar}`, 110, y);
    
    // Servicios
    y += 20;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('SERVICIOS SOLICITADOS', 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    // Box para servicios
    const serviciosArray = servicios.split('\n');
    const boxHeight = serviciosArray.length * lineHeight + 10;
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, y - 5, 170, boxHeight);
    
    serviciosArray.forEach(servicio => {
      if (servicio.trim()) {
        doc.text(servicio.trim(), 25, y);
        y += lineHeight;
      }
    });
    
    // Total
    y += 15;
    doc.setFillColor(0, 0, 0);
    doc.rect(20, y - 5, 170, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('TOTAL:', 25, y + 5);
    doc.text(total, 185, y + 5, { align: 'right' });
    
    // Footer
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    const footerY = 270;
    doc.text('DJ EDY | 787-356-8786 | djedypr@gmail.com | www.djedypr.com', 105, footerY, { align: 'center' });
    
    // Generar PDF como buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    
    // Enviar email con PDF adjunto usando Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DJ EDY <quotes@djedypr.com>',
        to: ['djedypr@gmail.com'],
        subject: `Nueva Cotización - ${nombre}`,
        html: `
          <h2>Nueva Cotización Generada</h2>
          <p><strong>Cliente:</strong> ${nombre}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Total:</strong> ${total}</p>
          <hr>
          <p>El PDF está adjunto. Descárgalo y envíalo al cliente por WhatsApp:</p>
          <a href="https://wa.me/1${whatsapp}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Abrir WhatsApp
          </a>
        `,
        attachments: [
          {
            filename: `Cotizacion-${nombre.replace(/\s+/g, '-')}.pdf`,
            content: pdfBuffer.toString('base64')
          }
        ]
      })
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Error sending email: ${JSON.stringify(errorData)}`);
    }

    return res.status(200).json({ 
      success: true,
      message: 'PDF generado y enviado por email'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Error generando PDF',
      details: error.message 
    });
  }
}
