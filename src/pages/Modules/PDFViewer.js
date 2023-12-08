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

  const [initialLoad, setInitialLoad] = useState(false);
  const [maxPagePercentage, setMaxPagePercentage] = useState(0);

  const fetchPdfFile = async (id) => {
    try {
      const response = await fetch(`https://seal-app-by4vt.ondigitalocean.app/api/modules/pdf/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      setFile(URL.createObjectURL(blob));
      sendGetRequest();
    } catch (error) {
      console.error("Could not fetch the PDF: ", error);
    }
  };

  const sendGetRequest = async () => {
    try {
      const jwtToken = localStorage.getItem('accessToken');
      const response = await fetch(`https://seal-app-by4vt.ondigitalocean.app/api/v1/modules/progress/get/0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else {
        const data = await response.json();
        const matchingData = data.find(entry => entry.id === pdfId);
        console.log(response);
        if (matchingData) {
          const completedPercentage = matchingData.completed_percentage;
          const calculatedPageNumber = Math.floor((completedPercentage / 100) * numPages) + 1;
          setPageNumber(calculatedPageNumber);
          
        }
      }
      
    } catch (error) {
      console.error("Error sending post request: ", error);
    }
  };

  const sendPostRequest = async () => {
    try {
      const jwtToken = localStorage.getItem('accessToken');
      const response = await fetch(`https://seal-app-by4vt.ondigitalocean.app/api/v1/modules/progress/create/0/${pdfId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setInitialLoad(true);
    } catch (error) {
      console.error("Error sending post request: ", error);
    }
  };

  const sendPatchRequest = async () => {
    try {
      const jwtToken = localStorage.getItem('accessToken');
      const response = await fetch(`https://seal-app-by4vt.ondigitalocean.app/api/v1/modules/progress/update/0/${pdfId}/${maxPagePercentage}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending patch request: ", error);
    }
  };

  useEffect(() => {
    fetchPdfFile(pdfId);
  }, [pdfId]);

  useEffect(() => {
    if (!initialLoad) {
      sendPostRequest();
    }
  }, [initialLoad]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      const percentage = Math.round((pageNumber / numPages) * 100);
      setMaxPagePercentage(Math.max(maxPagePercentage, percentage));
      console.log(maxPagePercentage)
    }
  };

  const handleLeavePage = () => {
    sendPatchRequest();
  };

  return (
    <>
      <Header role="ADMIN" />
      <div className="pdf-viewer">
        <div className="navigation">
          <button className="back-button" onClick={() => { handleLeavePage(); navigate(-1); }}>
            Back to Modules
          </button>
        </div>
        <div className="frame">
          <div className="document-container">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="document"
            >
              <Page pageNumber={pageNumber} scale={scale} renderAnnotationLayer={false} renderTextLayer={false} />
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
              onClick={handleNextPage}
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
