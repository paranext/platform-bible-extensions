import { Button } from 'platform-bible-react';
import { useState } from 'react';
import { Document, Page, Outline } from 'react-pdf';
import { OnItemClickArgs } from 'react-pdf/dist/cjs/shared/types';

type PDFViewerComponentProps = {
  pdfFilePath: File | undefined;
};

export default function PdfReaderWithReact({ pdfFilePath }: PDFViewerComponentProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = (numOfPages: number) => {
    setNumPages(numOfPages);
    //  setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  function onItemClick({ pageNumber: itemPageNumber }: OnItemClickArgs) {
    setPageNumber(itemPageNumber);
  }

  return (
    <div>
      <div>
        <Document file={pdfFilePath} onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf.numPages)}>
          <Outline onItemClick={(itemClicked) => onItemClick(itemClicked)} />
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>
      <div>
        {pdfFilePath && pdfFilePath.name.length > 0 && (
          <>
            <p>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>

            <Button disabled={pageNumber <= 1} onClick={previousPage}>
              Previous
            </Button>
          </>
        )}
        {numPages && (
          <Button disabled={pageNumber >= numPages} onClick={nextPage} dir="rtl">
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
