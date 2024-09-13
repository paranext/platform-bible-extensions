import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  // GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import pdfReaderReact from './pdf-reader.web-view?inline';
import pdfReaderReactStyles from './pdf-reader.web-view.scss?inline';

const PDF_VIEWER_WEB_VIEW_TYPE = 'pdfReader.react';

const pdfViewerWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    // options: GetWebViewOptions
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== PDF_VIEWER_WEB_VIEW_TYPE)
      throw new Error(
        `${PDF_VIEWER_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      title: 'PDF Reader',
      ...savedWebView,
      content: pdfReaderReact,
      styles: pdfReaderReactStyles,
      state: { ...savedWebView.state },
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.info('PDF Reader is activating!');

  const pdfReaderWebViewProviderPromise = papi.webViewProviders.register(
    PDF_VIEWER_WEB_VIEW_TYPE,
    pdfViewerWebViewProvider,
  );

  context.registrations.add(await pdfReaderWebViewProviderPromise);
}

export async function deactivate() {
  logger.info('PDF Reader is deactivating!');
  return true;
}
