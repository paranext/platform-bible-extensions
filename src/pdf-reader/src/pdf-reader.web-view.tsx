import { useState } from 'react';
import { Button } from 'platform-bible-react';
import pdfjs from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PDFViewer from './pdf-viewer.component';

// if (typeof Promise.withResolvers === 'undefined') {
//   if (window)
//     // @ts-expect-error This does not exist outside of polyfill which this is doing
//     window.Promise.withResolvers = function () {
//       let resolve;
//       let reject;
//       const promise = new Promise((res, rej) => {
//         resolve = res;
//         reject = rej;
//       });
//       return { promise, resolve, reject };
//     };
// }

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

declare global {
  interface Window {
    showOpenFilePicker: (options?: unknown) => Promise<FileSystemFileHandle[]>;
  }
}

globalThis.webViewComponent = function PDFReaderWebView() {
  const [fileURL, setFileURL] = useState<string>();

  const openFilePicker = async () => {
    try {
      // Check if the browser supports the File System Access API
      if (!window.showOpenFilePicker) {
        // eslint-disable-next-line no-alert
        alert('Your browser does not support the File System Access API');
        return;
      }

      // Show the file picker
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'PDF Files',
            accept: { 'application/pdf': ['.pdf'] },
          },
        ],
        multiple: false,
      });

      // Get the file from the file handle
      const newFile = await fileHandle.getFile();

      // Get URL for file
      const fileUrl = URL.createObjectURL(newFile);
      setFileURL(fileUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error selecting file:', error);
    }
  };

  return (
    <div className="pdf-reader-web-view pdfslick">
      <Button onClick={openFilePicker}>Choose PDF...</Button>
      <div className="pdf-viewer">
        {fileURL && <PDFViewer pdfFilePath={fileURL} />}
        {/* <PDFNavigation {...{ usePDFSlickStore }} /> */}
      </div>
    </div>
  );
};
