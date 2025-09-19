import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import Observability from '@launchdarkly/observability';
import SessionReplay from '@launchdarkly/session-replay';

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '609ead905193530d7c28647b',
    context: {
      "kind": "user",
      "key": "user-key-123abc",
      "name": "Sandy Smith",
      "email": "sandy@example.com"
    },
    options: {
      // the observability plugins require React Web SDK v3.7+
      plugins: [
        new Observability(),
        new SessionReplay()
      ],
      // other options...
    }
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LDProvider>
      <App />
    </LDProvider>
  </React.StrictMode>,
)})();