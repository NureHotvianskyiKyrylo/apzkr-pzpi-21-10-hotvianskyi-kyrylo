import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {I18nextProvider} from "react-i18next";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider.tsx";
import i18n from "./i18n.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </AuthProvider>
            </BrowserRouter>
        </I18nextProvider>
    </React.StrictMode>
)
