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

    // Crear PDF con paginación automática
    const doc = new jsPDF();
    const pageHeight = 297; // A4 height in mm
    const margin = 20;
    const maxY = pageHeight - 40; // Leave space for footer
    
    // Helper function to add new page
    const addNewPage = () => {
      doc.addPage();
      return 30; // Reset Y position for new page
    };
    
    // Helper function to add footer on each page
    const addFooter = (pageNum) => {
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text('DJ EDY | 787-356-8786 | djedypr@gmail.com | www.djedypr.com', 105, pageHeight - 15, { align: 'center' });
      doc.setFontSize(8);
      doc.text(`Página ${pageNum}`, 105, pageHeight - 10, { align: 'center' });
    };
    
    let currentPage = 1;
    
    // Header - Black bar
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text('DJ EDY', 105, 22, { align: 'center' });
    
    // Reset color
    doc.setTextColor(0, 0, 0);
    
    // Title and Number
    let y = 48;
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('COTIZACIÓN', margin, y);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const today = new Date().toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(today, 210 - margin, y, { align: 'right' });
    
    // Client info box
    y += 15;
    doc.setFillColor(250, 250, 250);
    doc.rect(margin, y - 5, 170, 42, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(margin, y - 5, 170, 42);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('INFORMACIÓN DEL CLIENTE', margin + 5, y + 2);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    y += 10;
    doc.text(`Nombre:`, margin + 5, y);
    doc.setFont(undefined, 'bold');
    doc.text(nombre, margin + 25, y);
    
    doc.setFont(undefined, 'normal');
    y += 7;
    doc.text(`WhatsApp:`, margin + 5, y);
    doc.setFont(undefined, 'bold');
    doc.text(whatsapp, margin + 25, y);
    
    doc.setFont(undefined, 'normal');
    doc.text(`Email:`, margin + 90, y);
    doc.setFont(undefined, 'bold');
    doc.text(email, margin + 105, y);
    
    doc.setFont(undefined, 'normal');
    y += 7;
    doc.text(`Fecha:`, margin + 5, y);
    doc.setFont(undefined, 'bold');
    doc.text(fecha, margin + 25, y);
    
    doc.setFont(undefined, 'normal');
    doc.text(`Personas:`, margin + 90, y);
    doc.setFont(undefined, 'bold');
    doc.text(personas, margin + 110, y);
    
    doc.setFont(undefined, 'normal');
    y += 7;
    doc.text(`Lugar:`, margin + 5, y);
    doc.setFont(undefined, 'bold');
    doc.text(lugar, margin + 25, y);
    
    // Services table header
    y += 20;
    doc.setFillColor(50, 50, 50);
    doc.rect(margin, y - 5, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('SERVICIOS SOLICITADOS', margin + 5, y + 1);
    
    // Parse services
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    const serviciosArray = servicios.split('\n');
    let rowBg = true;
    
    for (let i = 0; i < serviciosArray.length; i++) {
      const servicio = serviciosArray[i].trim();
      if (!servicio) continue;
      
      // Check if we need a new page
      if (y > maxY) {
        addFooter(currentPage);
        y = addNewPage();
        currentPage++;
      }
      
      // Alternate row background
      if (rowBg) {
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, y - 4, 170, 8, 'F');
      }
      rowBg = !rowBg;
      
      // Parse service line (handles both "• Service: $price" and category headers)
      const line = servicio.replace(/^[•\-]\s*/, ''); // Remove bullet
      
      if (line.includes(':')) {
        const parts = line.split(':');
        const serviceName = parts[0].trim();
        const serviceDetails = parts[1].trim();
        
        doc.setFont(undefined, 'normal');
        doc.text(serviceName, margin + 3, y);
        
        // Check if it's a price (starts with $)
        if (serviceDetails.startsWith('$')) {
          doc.setFont(undefined, 'bold');
          doc.text(serviceDetails.split('(')[0].trim(), 210 - margin - 3, y, { align: 'right' });
          
          // Add description in parentheses if exists
          if (serviceDetails.includes('(')) {
            const desc = serviceDetails.substring(serviceDetails.indexOf('('));
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text(desc, 210 - margin - 3, y + 3, { align: 'right' });
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
          }
        } else {
          doc.setFont(undefined, 'italic');
          doc.setFontSize(9);
          doc.text(serviceDetails, 210 - margin - 3, y, { align: 'right' });
          doc.setFontSize(10);
        }
      } else {
        // Category header or description line
        doc.setFont(undefined, 'bold');
        doc.text(line, margin + 3, y);
      }
      
      y += 8;
    }
    
    // Total box
    y += 10;
    if (y > maxY - 30) {
      addFooter(currentPage);
      y = addNewPage();
      currentPage++;
    }
    
    doc.setFillColor(0, 0, 0);
    doc.rect(margin, y - 5, 170, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('TOTAL ESTIMADO:', margin + 5, y + 5);
    doc.setFontSize(18);
    doc.text(total, 210 - margin - 5, y + 5, { align: 'right' });
    
    // Add footer to last page
    addFooter(currentPage);
    
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
