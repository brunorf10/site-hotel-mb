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
import { TermsOfUse } from "./pages/TermsOfUse";
import { Accessibility } from "./pages/Accessibility";

export type BookingType = "quarto" | "evento";

interface BookingState {
  isOpen: boolean;
  type: BookingType;
  preSelected: string;
}

const App: React.FC = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    isOpen: false,
    type: "quarto",
    preSelected: "",
  });

  const openBooking = (type: BookingType = "quarto", preSelected = "") =>
    setBookingState({ isOpen: true, type, preSelected });

  const closeBooking = () =>
    setBookingState((prev) => ({ ...prev, isOpen: false }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header onOpenBooking={() => openBooking("quarto")} />

      <Routes>
        <Route
          path="/"
          element={<Home onOpenBooking={openBooking} />}
        />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos-de-uso" element={<TermsOfUse />} />
        <Route path="/acessibilidade" element={<Accessibility />} />
      </Routes>

      <Footer onOpenBooking={() => openBooking("quarto")} />

      <BookingModal
        isOpen={bookingState.isOpen}
        onClose={closeBooking}
        bookingType={bookingState.type}
        preSelected={bookingState.preSelected}
      />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default App;
