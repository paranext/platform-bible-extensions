import { useState } from 'react';
import { Button } from 'platform-bible-react';
import { pdfjs } from 'react-pdf';
import PdfReaderWithReact from './pdf-reader-with-react.web-view';

if (typeof Promise.withResolvers === 'undefined') {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

declare global {
  interface Window {
    showOpenFilePicker: (options?: unknown) => Promise<FileSystemFileHandle[]>;
  }
}

globalThis.webViewComponent = function PDFReaderWebView() {
  const [filePath, setFilePath] = useState<string>();

  const [tempFile, setTempFile] = useState<File>();

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
        multiple: false,
      });

      const newFile = await fileHandle.getFile();
      const fileURL = URL.createObjectURL(newFile);
      setFilePath(fileURL);
      setTempFile(newFile);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error picking file:', error);
    }
  };

  return (
    <div className="pdf-reader-web-view">
      <Button onClick={openFilePicker}>Open File</Button>
      <PdfReaderWithReact pdfFilePath={tempFile} />
      {/* {filePath && <PDFViewerComponent pdfFilePath={filePath} />} */}
      <p>{filePath}</p>
    </div>
  );
};
