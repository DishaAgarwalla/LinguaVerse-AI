import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Translate from "../pages/dashboard/Translate";
import History from "../pages/dashboard/History";
import OCR from "../pages/dashboard/OCR";
import Documents from "../pages/dashboard/Documents";
import Explain from "../pages/dashboard/Explain";

import Speech from "../pages/speech/Speech";
import Chat from "../pages/chat/Chat";

const AppRouter = () => {
  return (
    <Routes>

      {/* ================= Public Routes ================= */}

      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

      </Route>

      {/* ================= Protected Routes ================= */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/translate"
          element={<Translate />}
        />

        <Route
          path="/ocr"
          element={<OCR />}
        />

        <Route
          path="/speech"
          element={<Speech />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/explain"
          element={<Explain />}
        />

      </Route>

    </Routes>
  );
};

export default AppRouter;