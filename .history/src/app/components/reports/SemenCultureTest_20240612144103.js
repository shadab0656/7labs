import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (semenCultureTestData) => {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(20);
  doc.text('Semen Culture Test Report', 10, 10);

  // Add patient details
  doc.setFontSize(12);
  doc.text(`Patient Name: ${semenCultureTestData.patientName}`, 10, 30);
  doc.text(`Age: ${semenCultureTestData.age}`, 10, 40);
  doc.text(`Gender: ${semenCultureTestData.gender}`, 10, 50);

  // Add table
  const tableData = Object.entries(semenCultureTestData.results).map(([key, value]) => [key, value]);
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

  doc.save(`semen-culture-test-${semenCultureTestData.patientName}.pdf`);
};

// Example usage
const semenCultureTestData = {
  patientName: 'John Smith',
  age: 35,
  gender: 'Male',
  results: {
    'Semen Volume': '2.5 mL',
    'Sperm Concentration': '150 million/mL',
    'Total Sperm Count': '375 million',
    'Motile Sperm Count': '225 million',
    'Motility': '60%',
    'Normal Morphology': '4%',
    'Abnormal Morphology': '2%',
  },
};

generatePDF(semenCultureTestData);
