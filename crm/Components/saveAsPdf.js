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
    <button onClick={saveAsPDF} className="transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
  Save As Pdf
</button>

  );
};

export default SaveAsPDFButton;
