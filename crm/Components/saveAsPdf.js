import React from 'react';
import html2pdf from 'html2pdf.js';

const SaveAsPDFButton = () => {
  const saveAsPDF = () => {
    const element = document.getElementById('pdf-content');
    element.style.overflowX = 'visible';
    const opt = {
      margin: 2,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button className='border bg-blue-500' onClick={saveAsPDF}>Save as PDF</button>
  );
};

export default SaveAsPDFButton;
