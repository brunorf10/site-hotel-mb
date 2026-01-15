import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { RoomsSection } from "./components/RoomsSection";
import { EventsSection } from "./components/EventsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";

import { Toaster } from "sonner";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={<Home onOpenBooking={() => setIsBookingOpen(true)} />}
        />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
      </Routes>

      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default App;
