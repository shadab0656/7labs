import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (serumProteinsTestData) => {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(20);
  doc.text('Serum Proteins (Protein Fraction) Test Report', 10, 10);

  // Add patient details
  doc.setFontSize(12);
  doc.text(`Patient Name: ${serumProteinsTestData.patientName}`, 10, 30);
  doc.text(`Age: ${serumProteinsTestData.age}`, 10, 40);
  doc.text(`Gender: ${serumProteinsTestData.gender}`, 10, 50);

  // Add table
  const tableData = Object.entries(serumProteinsTestData.results).map(([key, value]) => [key, value]);
  const tableHeaders = [['Test', 'Result']];
  const tableBody = [...tableHeaders, ...tableData];

  doc.autoTable({
    head: tableHeaders,
    body: tableBody,
    startY: 60,
    styles: {
      fontSize: 12,
      cellPadding: 2,
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      overflow: 'linebreak',
      halign: 'left',
      valign: 'middle',
      fontStyle: 'normal',
    },
    headStyles: {
      fillColor: [100, 400, 200],
      textColor: [0, 70, 0],
      fontStyle: 'bold',
    },
  });

  // Add footer
  const footerText = 'Generated by Your Clinic Name';
  const footerY = doc.internal.pageSize.height - 20;
  const footerX = doc.internal.pageSize.width / 2;
  doc.setFontSize(10);
  doc.text(footerText, footerX, footerY, { align: 'center' });

  doc.save(`serum-proteins-test-${serumProteinsTestData.patientName}.pdf`);
};

// Example usage
const serumProteinsTestData = {
  patientName: 'Jane Doe',
  age: 60,
  gender: 'Female',
  results: {
    'Total Protein': '7.5 g/dL',
    'Albumin': '4.0 g/dL',
    'Globulin': '3.5 g/dL',
    'Albumin-Globulin Ratio': '1.3',
  },
};

generatePDF(serumProteinsTestData);