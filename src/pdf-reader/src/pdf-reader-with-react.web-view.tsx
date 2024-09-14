import { logger } from '@papi/frontend';
import { Button } from 'platform-bible-react';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

type PDFViewerComponentProps = {
  pdfFilePath: File | undefined;
};

export default function PdfReaderWithReact({ pdfFilePath }: PDFViewerComponentProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    logger.debug(`Entered here in the onload ${numPages} ${pageNumber}`);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div>
      <div>
        <Document file={pdfFilePath} onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf)}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            // customTextRenderer={false}
          />
        </Document>
        {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}
      </div>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        {numPages && (
          <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
