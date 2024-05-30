import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default async function createPDF() {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Embed the Times Roman font
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Add a blank page to the document
  const page = pdfDoc.addPage();

  // Get the width and height of the page
  const { width, height } = page.getSize();

  // Draw a string of text toward the top of the page
  const fontSize = 30;
  page.drawText("Creating PDFs in JavaScript is awesome!", {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Create a Blob from the PDF bytes
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = "pdf-lib_creation_example.pdf";

  // Append the anchor element to the body
  document.body.appendChild(a);

  // Click the anchor to trigger download
  a.click();

  // Clean up by revoking the URL
  URL.revokeObjectURL(url);
}
