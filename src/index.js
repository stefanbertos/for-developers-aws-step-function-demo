import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@aws-amplify/ui-react";
import {Amplify, AuthModeStrategyType} from 'aws-amplify';

import awsconfig from './aws-exports';

import "@aws-amplify/ui-react/styles.css";
import { studioTheme } from "./ui-components";

Amplify.configure({
    ...awsconfig,
    DataStore: {
        // The default configuration for observeQuery has a default syncPageSize of 1,000 and a default maxRecordsToSync of 10,000. These values can be customized by configuring their values manually in DataStore.configure.
        maxRecordsToSync: 100000,
        syncPageSize: 10000,
        fullSyncInterval: 24*60, //24 hodin
        authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
        errorHandler: (error) => {
            console.log("DataStore unrecoverable error", JSON.stringify(error));
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={studioTheme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
