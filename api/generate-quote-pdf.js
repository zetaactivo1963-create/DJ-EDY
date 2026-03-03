// api/generate-quote-pdf.js
// Vercel Serverless Function para generar PDF con Puppeteer

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let browser = null;

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

    // Launch browser
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Parse services for table
    const serviciosArray = servicios.split('\n').filter(s => s.trim());
    const tableRows = serviciosArray.map(servicio => {
      const line = servicio.replace(/^[•\-]\s*/, '').trim();
      
      if (line.includes(':')) {
        const [name, details] = line.split(':').map(s => s.trim());
        
        // Check if it's a price line
        if (details.startsWith('$')) {
          const priceMatch = details.match(/\$[\d,]+/);
          const price = priceMatch ? priceMatch[0] : '';
          const description = details.replace(price, '').trim();
          
          return `
            <tr>
              <td class="service-name">${name}</td>
              <td class="service-price">${price}</td>
            </tr>
            ${description ? `<tr><td colspan="2" class="service-desc">${description}</td></tr>` : ''}
          `;
        } else {
          // Category header
          return `<tr><td colspan="2" class="category-header">${name}</td></tr>`;
        }
      } else {
        // Simple line
        return `<tr><td colspan="2" class="service-item">${line}</td></tr>`;
      }
    }).join('');

    const today = new Date().toLocaleDateString('es-PR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // HTML template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page {
            size: letter;
            margin: 0;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            color: #333;
            line-height: 1.6;
          }
          
          .page {
            width: 8.5in;
            min-height: 11in;
            padding: 0.5in 0.6in;
            background: white;
          }
          
          .header {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            padding: 30px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          
          .logo {
            max-width: 280px;
            height: auto;
            margin: 0 auto;
            display: block;
          }
          
          .title-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 3px solid #000;
          }
          
          .title {
            font-size: 32px;
            font-weight: bold;
            color: #000;
            letter-spacing: 1px;
          }
          
          .date {
            font-size: 12px;
            color: #666;
            text-align: right;
          }
          
          .client-info {
            background: #f8f9fa;
            border-left: 4px solid #000;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 4px;
          }
          
          .client-info h3 {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          
          .info-item {
            font-size: 11px;
          }
          
          .info-label {
            color: #666;
            font-weight: 500;
            display: inline-block;
            min-width: 70px;
          }
          
          .info-value {
            color: #000;
            font-weight: 600;
          }
          
          .services-section {
            margin-bottom: 30px;
          }
          
          .services-header {
            background: #2c2c2c;
            color: white;
            padding: 12px 15px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 4px 4px 0 0;
          }
          
          .services-table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          
          .services-table tr:nth-child(even) {
            background: #fafafa;
          }
          
          .services-table td {
            padding: 12px 15px;
            font-size: 11px;
            border-bottom: 1px solid #e0e0e0;
          }
          
          .category-header {
            background: #f0f0f0 !important;
            font-weight: bold;
            font-size: 12px !important;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .service-name {
            color: #333;
            font-weight: 500;
          }
          
          .service-price {
            text-align: right;
            font-weight: bold;
            color: #000;
            font-size: 12px;
            white-space: nowrap;
          }
          
          .service-desc {
            color: #666;
            font-size: 10px;
            padding-top: 4px !important;
            padding-bottom: 8px !important;
            font-style: italic;
          }
          
          .service-item {
            color: #555;
            font-size: 11px;
          }
          
          .total-section {
            background: linear-gradient(135deg, #000000 0%, #2c2c2c 100%);
            padding: 20px 25px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
          }
          
          .total-label {
            color: white;
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .total-amount {
            color: white;
            font-size: 32px;
            font-weight: bold;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 10px;
          }
          
          .footer-contact {
            margin-bottom: 8px;
            font-weight: 500;
          }
          
          .footer-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
          }
          
          .footer-links a {
            color: #666;
            text-decoration: none;
          }
          
          @media print {
            .page {
              page-break-after: always;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <!-- Header with Logo -->
          <div class="header">
            <img src="https://djedypr.com/4toDisenoLogo.png" alt="DJ EDY" class="logo" />
          </div>
          
          <!-- Title Section -->
          <div class="title-section">
            <div class="title">COTIZACIÓN</div>
            <div class="date">
              <div style="font-weight: 600; font-size: 14px; color: #000;">Cotización #${Date.now().toString().slice(-6)}</div>
              <div style="margin-top: 4px;">${today}</div>
            </div>
          </div>
          
          <!-- Client Info -->
          <div class="client-info">
            <h3>Información del Cliente</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Cliente:</span>
                <span class="info-value">${nombre}</span>
              </div>
              <div class="info-item">
                <span class="info-label">WhatsApp:</span>
                <span class="info-value">${whatsapp}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${email}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Fecha:</span>
                <span class="info-value">${fecha}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Personas:</span>
                <span class="info-value">${personas}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Lugar:</span>
                <span class="info-value">${lugar}</span>
              </div>
            </div>
          </div>
          
          <!-- Services -->
          <div class="services-section">
            <div class="services-header">Servicios Solicitados</div>
            <table class="services-table">
              ${tableRows}
            </table>
          </div>
          
          <!-- Total -->
          <div class="total-section">
            <div class="total-label">Total Estimado</div>
            <div class="total-amount">${total}</div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-contact">DJ EDY - Servicios Profesionales de DJ y Entretenimiento</div>
            <div class="footer-links">
              <span>📱 787-356-8786</span>
              <span>✉️ djedypr@gmail.com</span>
              <span>🌐 www.djedypr.com</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'letter',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    });

    await browser.close();

    // Send email with PDF using Resend
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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #000;">Nueva Cotización Generada</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Cliente:</strong> ${nombre}</p>
              <p><strong>WhatsApp:</strong> ${whatsapp}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Fecha evento:</strong> ${fecha}</p>
              <p><strong>Total:</strong> ${total}</p>
            </div>
            <p>El PDF de cotización está adjunto. Descárgalo y envíalo al cliente por WhatsApp:</p>
            <a href="https://wa.me/1${whatsapp}" 
               style="display: inline-block; background: #25D366; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">
              📱 Abrir WhatsApp
            </a>
          </div>
        `,
        attachments: [
          {
            filename: `Cotizacion-DJEdy-${nombre.replace(/\s+/g, '-')}.pdf`,
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
    
    if (browser) {
      await browser.close();
    }
    
    return res.status(500).json({ 
      error: 'Error generando PDF',
      details: error.message 
    });
  }
}
