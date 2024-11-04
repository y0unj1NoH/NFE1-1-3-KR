import { createRoot } from 'react-dom/client';

import App from './App';
import { worker } from './mocks/browser';
import './globals.css';

// Mocks

const main = async () => {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }

  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
};

await main();
