import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PDF from "./assets/1._100_ways_to_motivate_yourself.pdf";
import PDF2 from "./assets/document.pdf";
import GERALT from "./assets/lei-min-20200316103316.jpg";
import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const App = () => {
  const [myPDF, setMyPDF] = useState(PDF)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageScale, setPageScale] = useState(2);

  const [show, setShow] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const showPDF = () => {
    setShow(true);
  };

  const anotherPDF = () => {
    setMyPDF(myPDF === PDF ? PDF2 : PDF)
  }

  const closePDF = () => {
    setShow(false);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };
  const goToNextPage = () => {
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  };

  const reducePageScale = () => {
    setPageScale(pageScale - 1 <= 1 ? 1 : pageScale - 1);
  };

  const increasePageScale = () => {
    setPageScale(pageScale + 1 > 3 ? 3 : pageScale + 1);
  };

  return (
    <>
      <div className="container">
        <nav className="nav">
          {!show && <button onClick={showPDF}> Show </button>}
          {!show && <button onClick={anotherPDF}>Another PDF</button>}
        </nav>
        <div className="geralt">
          <img src={GERALT} alt="" />
        </div>

        {show && (
          <div className="showPDF">
            <h1>Here is a PDF!</h1>
            <div className="buttonsPDF">
              <button onClick={goToPrevPage}>Prev</button>
              <button onClick={goToNextPage}>Next</button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <button>
                <a download="" href={PDF}>
                  Download
                </a>
              </button>
              <button className="closeButton" onClick={closePDF}>
                X
              </button>
            </div>
            <div>
              <h2>Scale</h2>
              <button onClick={reducePageScale}> - </button>
              <button onClick={increasePageScale}> + </button>
            </div>
            <Document file={myPDF} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className="documentPDF"
                scale={pageScale}
                pageNumber={pageNumber}
              />
            </Document>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
