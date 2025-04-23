import { createRoot } from 'react-dom/client';

import App from './App';
import './globals.css';
import { worker } from './mocks/browser';

const main = async () => {
  // if (import.meta.env.DEV) {
  //   await worker.start({
  //     onUnhandledRequest: 'bypass',
  //     serviceWorker: {
  //       url: '/mockServiceWorker.js',
  //     },
  //   });
  // }

  // Mocks
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });

  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
};

void main();
