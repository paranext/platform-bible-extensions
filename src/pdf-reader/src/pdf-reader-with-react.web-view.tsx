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
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={pdfFilePath} onLoadSuccess={() => onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
