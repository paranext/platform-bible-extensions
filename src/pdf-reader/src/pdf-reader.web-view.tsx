import { useState } from 'react';
import { Button } from 'platform-bible-react';
// import '@pdfslick/react/dist/pdf_viewer.css?inline';
// import PDFViewerComponent from './pdf-viewer.component';

declare global {
  interface Window {
    showOpenFilePicker: (options?: unknown) => Promise<FileSystemFileHandle[]>;
  }
}

globalThis.webViewComponent = function PDFReaderWebView() {
  const [filePath, setFilePath] = useState<string>();

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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error picking file:', error);
    }
  };

  return (
    <div className="pdf-reader-web-view">
      <Button onClick={openFilePicker}>Open File</Button>
      {/* {filePath && <PDFViewerComponent pdfFilePath={filePath} />} */}
      <p>{filePath}</p>
    </div>
  );
};
