import { usePDFSlick } from '@pdfslick/react';

type PDFViewerComponentProps = {
  pdfFilePath: string;
};

export default function PDFViewerComponent({ pdfFilePath }: PDFViewerComponentProps) {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(pdfFilePath, {
    scaleValue: 'page-fit',
  });

  /*
   Access the store with `usePDFSlickStore()` hook — you can pass is
   as a prop to other components (like with `<PDFNavigation />` below)
   Toolbars, Sidebars, components which render thumbnails etc.
   and use it as here to get and react on
   PDF document's and viewer's properties and changes
   */
  const scale = usePDFSlickStore((s) => s.scale);
  const numPages = usePDFSlickStore((s) => s.numPages);
  const pageNumber = usePDFSlickStore((s) => s.pageNumber);

  return (
    <div className="absolute inset-0 pdfSlick">
      <div className="relative h-full">
        <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />

        {/*
          Pass PDFSlick's store to your custom components
        */}
        {/* <PDFNavigation {...{ usePDFSlickStore }} /> */}

        {/*
          PDFSlick's store values automatically update
        */}
        <div className="absolute w-full top-0 left-0">
          <p>Current scale: {scale}</p>
          <p>Current page number: {pageNumber}</p>
          <p>Total number of pages: {numPages}</p>
        </div>
      </div>
    </div>
  );
}
