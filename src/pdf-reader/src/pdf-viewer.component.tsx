import { usePDFSlick } from '@pdfslick/react';
import '@pdfslick/react/dist/pdf_viewer.css';

type PDFViewerProps = {
  pdfFilePath: string;
};

export default function PDFViewer({ pdfFilePath }: PDFViewerProps) {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(pdfFilePath, {
    singlePageViewer: true,
    scaleValue: 'page-fit',
  });

  return <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />;
}
