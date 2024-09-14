declare module 'pdf-reader' {}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'pdfReader.openPDFReader': () => Promise<string | undefined>;
  }
}
