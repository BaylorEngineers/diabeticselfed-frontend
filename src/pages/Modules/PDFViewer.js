import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams, useNavigate } from 'react-router-dom';
import './PDFViewer.css';
import Header from '../../components/Header/Header';
import "react-pdf/dist/esm/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0); // Start with a default scale
  const [file, setFile] = useState(null);
  const { pdfId } = useParams();
  const navigate = useNavigate();

  const fetchPdfFile = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/modules/pdf/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      setFile(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Could not fetch the PDF: ", error);
    }
  };

  useEffect(() => {
    fetchPdfFile(pdfId);
  }, [pdfId]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Header role="ADMIN" />
      <div className="pdf-viewer">
        <div className="navigation">
          <button className="back-button" onClick={() => navigate(-1)}>Back to Modules</button>
        </div>
        <div className="frame">
          <div className="document-container">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="document"
            >
              <Page pageNumber={pageNumber} scale={scale}  renderAnnotationLayer={false} renderTextLayer={false} />
            </Document>
          </div>
          <div className="controls">
            <button
              className="control-button"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
            <span className="page-info">
              Page {pageNumber} of {numPages}
            </span>
            <button
              className="control-button"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
            <button className="control-button" onClick={() => setScale(scale * 1.1)}>Zoom In</button>
            <button className="control-button" onClick={() => setScale(scale / 1.1)}>Zoom Out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
