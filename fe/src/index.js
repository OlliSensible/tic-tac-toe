import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import store from "../src/features/store";
import { Provider } from 'react-redux';

import App from "./App";
import Registration from "./components/registration";
import NotFound from "./components/not-found";
import Participants from "./components/participants";
import EditPage from "./components/edit";
import Header from "./components/header";

import Login from "./components/login";
import ProtectedRoute from "./components/context/protected-route";
import { AuthProvider } from "./components/context/auth-context";
import Profile from "./components/profile";

const root = createRoot(document.getElementById('root'));

const MainRouter = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
            <Route path="/registration" element={<ProtectedRoute><Registration /></ProtectedRoute>} />
            <Route path="/participants" element={<ProtectedRoute><Participants /></ProtectedRoute>} />
            <Route path="/participant/*" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
            <Route path="/profile/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/login/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};

root.render(<React.StrictMode> <MainRouter /> </React.StrictMode>);