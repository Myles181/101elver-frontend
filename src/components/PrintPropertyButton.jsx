import React from "react";
import { FiPrinter } from "react-icons/fi";

const PrintPropertyButton = ({ property }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${property.title} - 101Elver</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .price {
            font-size: 36px;
            color: #2563eb;
            font-weight: bold;
            margin: 20px 0;
          }
          .section {
            margin: 30px 0;
          }
          .section-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #1f2937;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .feature-item {
            padding: 10px;
            background: #f3f4f6;
            border-radius: 8px;
          }
          .feature-label {
            font-size: 12px;
            color: #6b7280;
          }
          .feature-value {
            font-weight: bold;
            color: #1f2937;
          }
          .description {
            line-height: 1.6;
            color: #4b5563;
          }
          .image-container {
            margin: 20px 0;
          }
          .image-container img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">101Elver</div>
          <div class="title">${property.title}</div>
          <div style="color: #6b7280;">${property.location}</div>
        </div>

        <div class="price">${property.price}</div>

        <div class="section">
          <div class="section-title">Key Features</div>
          <div class="features">
            <div class="feature-item">
              <div class="feature-label">Bedrooms</div>
              <div class="feature-value">${property.beds}</div>
            </div>
            <div class="feature-item">
              <div class="feature-label">Bathrooms</div>
              <div class="feature-value">${property.baths || 'N/A'}</div>
            </div>
            <div class="feature-item">
              <div class="feature-label">Area</div>
              <div class="feature-value">${property.area} m²</div>
            </div>
            <div class="feature-item">
              <div class="feature-label">Property Type</div>
              <div class="feature-value">${property.type}</div>
            </div>
          </div>
        </div>

        ${property.description ? `
        <div class="section">
          <div class="section-title">Description</div>
          <div class="description">${property.description}</div>
        </div>
        ` : ''}

        ${property.images && property.images.length > 0 ? `
        <div class="section">
          <div class="section-title">Property Images</div>
          <div class="image-container">
            <img src="${property.images[0]}" alt="${property.title}" />
          </div>
        </div>
        ` : ''}

        <div class="footer">
          <p><strong>101Elver</strong> - Your trusted property partner in North Cyprus</p>
          <p>Tel: +90 533 123 4567 | Email: info@101elver.com</p>
          <p>Property ID: ${property.id} | Printed on ${new Date().toLocaleDateString()}</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 100);
          }
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      title="Print property details"
    >
      <FiPrinter size={20} className="text-gray-600" />
      <span className="text-gray-700 font-medium">Print</span>
    </button>
  );
};

export default PrintPropertyButton;
