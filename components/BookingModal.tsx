import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail, EMAIL_TEMPLATES } from "../services/email-service";
import { useFormMask } from "../hooks/useFormMask";
import { validateField } from "../services/form-validation";
import { toast } from "sonner";
import { BookingType } from "../App";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingType: BookingType;
  preSelected?: string;
}

// Formulário de quarto
interface RoomFormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  accommodation: string;
  adults: string;
  children: string;
  notes: string;
  acceptedPrivacy: boolean;
}

// Formulário de evento
interface EventFormData {
  name: string;
  email: string;
  phone: string;
  eventSpace: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  attendees: string;
  eventType: string;
  notes: string;
  acceptedPrivacy: boolean;
}

// ─── Valores iniciais ─────────────────────────────────────────────────────────

const initialRoomData = (preSelected?: string): RoomFormData => ({
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  accommodation: preSelected || "Apt. Simples",
  adults: "1",
  children: "0",
  notes: "",
  acceptedPrivacy: false,
});

const initialEventData = (preSelected?: string): EventFormData => ({
  name: "",
  email: "",
  phone: "",
  eventSpace: preSelected || "",
  eventDate: "",
  startTime: "",
  endTime: "",
  attendees: "",
  eventType: "",
  notes: "",
  acceptedPrivacy: false,
});

// ─── Utilitário de campo de formulário ───────────────────────────────────────

const inputClass = (hasError: boolean) =>
  `w-full bg-gray-50 border-2 rounded-xl px-4 py-2 text-sm outline-none transition-all ${
    hasError
      ? "border-red-100 focus:border-red-300"
      : "border-transparent focus:ring-2 focus:ring-primary/20"
  }`;

const labelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400";
const errorClass = "text-[10px] text-red-500 font-bold uppercase tracking-wider";

const calcDuration = (start: string, end: string): string | null => {
  if (!start || !end) return null;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const totalMins = eh * 60 + em - (sh * 60 + sm);
  if (totalMins <= 0) return null;
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
};

// ─── Componente ───────────────────────────────────────────────────────────────

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingType,
  preSelected = "",
}) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { maskPhone } = useFormMask();

  // Estados dos formulários
  const [roomData, setRoomData] = useState<RoomFormData>(initialRoomData(preSelected));
  const [eventData, setEventData] = useState<EventFormData>(initialEventData(preSelected));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Reinicia o formulário correto ao abrir o modal (ou trocar preSelected)
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setErrors({});
      setTouched({});
      if (bookingType === "quarto") {
        setRoomData(initialRoomData(preSelected));
      } else {
        setEventData(initialEventData(preSelected));
      }
    }
  }, [isOpen, bookingType, preSelected]);

  // ─── Validação ─────────────────────────────────────────────────────────────

  const validateRoomField = (name: string, value: string, data: RoomFormData) =>
    validateField(name, value, data.checkIn);

  const validateEventField = (name: string, value: string, startTime?: string): string => {
    if (["name", "email", "phone"].includes(name)) {
      return validateField(name, value);
    }
    switch (name) {
      case "eventSpace":
        return value ? "" : "Selecione o espaço desejado.";
      case "eventDate":
        return value ? "" : "Informe a data do evento.";
      case "attendees":
        return value ? "" : "Informe o número aproximado de participantes.";
      case "eventType":
        return value ? "" : "Selecione o tipo de evento.";
      case "endTime":
        if (!value || !startTime) return "";
        return value > startTime ? "" : "O término deve ser posterior ao início.";
      case "acceptedPrivacy":
        return value === "true" ? "" : "Você precisa aceitar a Política de Privacidade.";
      default:
        return "";
    }
  };

  // ─── Handlers compartilhados ───────────────────────────────────────────────

  const handleRoomChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "phone") finalValue = maskPhone(value);

    if (e.target.type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      const updated = { ...roomData, [name]: checked };
      setRoomData(updated);
      const err = validateRoomField(name, checked.toString(), updated);
      setErrors((p) => ({ ...p, [name]: err }));
      return;
    }

    const updated = { ...roomData, [name]: finalValue };
    setRoomData(updated);
    if (touched[name]) {
      const err = validateRoomField(name, finalValue, updated);
      setErrors((p) => ({ ...p, [name]: err }));
      if (name === "checkIn" && touched.checkOut) {
        const checkOutErr = validateRoomField("checkOut", updated.checkOut, updated);
        setErrors((p) => ({ ...p, checkOut: checkOutErr }));
      }
    }
  };

  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "phone") finalValue = maskPhone(value);

    if (e.target.type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEventData((p) => ({ ...p, [name]: checked }));
      const err = validateEventField(name, checked.toString());
      setErrors((p) => ({ ...p, [name]: err }));
      return;
    }

    const updated = { ...eventData, [name]: finalValue };
    setEventData(updated);

    // Validação imediata para campos de horário (cross-field)
    if (name === "endTime" || name === "startTime") {
      const endErr = validateEventField("endTime", updated.endTime, updated.startTime);
      setErrors((p) => ({ ...p, endTime: endErr }));
      return;
    }

    if (touched[name]) {
      const err = validateEventField(name, finalValue);
      setErrors((p) => ({ ...p, [name]: err }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const err =
      bookingType === "quarto"
        ? validateRoomField(name, value, roomData)
        : validateEventField(name, value);
    setErrors((p) => ({ ...p, [name]: err }));
  };

  // ─── Submissão ─────────────────────────────────────────────────────────────

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    Object.keys(roomData).forEach((key) => {
      const val = (roomData as any)[key];
      const err = validateRoomField(key, val.toString(), roomData);
      if (err) { newErrors[key] = err; hasErrors = true; }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setTouched(Object.keys(roomData).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
      toast.error("Por favor, corrija os erros no formulário antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendEmail(EMAIL_TEMPLATES.RESERVA, {
        to_email: "",
        from_name: roomData.name,
        from_email: roomData.email,
        subject: `Nova Solicitação de Reserva — ${roomData.accommodation}`,
        message: `
Nova solicitação de reserva recebida pelo site.

Dados do Cliente:
Nome: ${roomData.name}
E-mail: ${roomData.email}
Telefone: ${roomData.phone}

Dados da Reserva:
Acomodação: ${roomData.accommodation}
Check-in: ${roomData.checkIn}
Check-out: ${roomData.checkOut}
Adultos: ${roomData.adults}
Crianças: ${roomData.children}

Observações: ${roomData.notes || "Nenhuma."}
        `.trim(),
        phone: roomData.phone,
        check_in: roomData.checkIn,
        check_out: roomData.checkOut,
        accommodation: roomData.accommodation,
        adults: roomData.adults,
        children: roomData.children,
        notes: roomData.notes || "Nenhuma observação informada.",
      });
      setStep("success");
    } catch {
      toast.error("Erro ao enviar solicitação. Tente novamente ou entre em contato por telefone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    const fieldsToValidate = [
      "name", "email", "phone", "eventSpace",
      "eventDate", "attendees", "eventType", "acceptedPrivacy",
    ];
    fieldsToValidate.forEach((key) => {
      const val = (eventData as any)[key];
      const err = validateEventField(key, val.toString());
      if (err) { newErrors[key] = err; hasErrors = true; }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setTouched(fieldsToValidate.reduce((acc, k) => ({ ...acc, [k]: true }), {}));
      toast.error("Por favor, corrija os erros no formulário antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendEmail(EMAIL_TEMPLATES.CONTATO, {
        to_email: "",
        from_name: eventData.name,
        from_email: eventData.email,
        subject: `Nova Solicitação de Evento — ${eventData.eventSpace}`,
        contact_subject: `Solicitação de Evento — ${eventData.eventSpace}`,
        phone: eventData.phone,
        message: `Espaço: ${eventData.eventSpace}
Tipo de Evento: ${eventData.eventType}
Data: ${eventData.eventDate}
Horário: ${eventData.startTime || "—"} às ${eventData.endTime || "—"}
Participantes: ${eventData.attendees}

Observações: ${eventData.notes || "Nenhuma."}`,
      });
      setStep("success");
    } catch {
      toast.error("Erro ao enviar solicitação. Tente novamente ou entre em contato por telefone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Validez do formulário ─────────────────────────────────────────────────

  const isRoomFormValid =
    !Object.keys(roomData).some((key) => {
      const val = (roomData as any)[key];
      return !!validateRoomField(key, val.toString(), roomData);
    }) && roomData.acceptedPrivacy;

  const isEventFormValid = (() => {
    const requiredFields = [
      "name", "email", "phone", "eventSpace",
      "eventDate", "attendees", "eventType",
    ];
    const hasError = requiredFields.some((k) =>
      !!validateEventField(k, (eventData as any)[k]?.toString() ?? ""),
    );
    return !hasError && eventData.acceptedPrivacy;
  })();

  const isFormValid = bookingType === "quarto" ? isRoomFormValid : isEventFormValid;

  // ─── Reset no fechamento ───────────────────────────────────────────────────

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setErrors({});
      setTouched({});
    }, 300);
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  const privacyCheckbox = (formName: string, checked: boolean) => (
    <div className="flex items-start gap-3 py-2 cursor-pointer group">
      <div className="relative flex items-center mt-1">
        <input
          id={`privacy-${formName}`}
          name="acceptedPrivacy"
          type="checkbox"
          checked={checked}
          onChange={bookingType === "quarto" ? handleRoomChange : handleEventChange}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 transition-all checked:border-primary checked:bg-primary"
        />
        <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          check
        </span>
      </div>
      <label
        htmlFor={`privacy-${formName}`}
        className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none"
      >
        Li e concordo com a{" "}
        <a
          href="/politica-de-privacidade"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Política de Privacidade
        </a>{" "}
        do Hotel Maria Bastos.
      </label>
    </div>
  );

  const submitButton = (
    <motion.button
      whileHover={isFormValid ? { scale: 1.02 } : {}}
      whileTap={isFormValid ? { scale: 0.98 } : {}}
      disabled={isSubmitting || !isFormValid}
      type="submit"
      className={`w-full py-3.5 rounded-2xl font-bold text-lg shadow-xl mt-2 flex items-center justify-center gap-2 transition-all ${
        isFormValid
          ? "bg-primary text-white shadow-primary/20 hover:bg-opacity-90"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
      }`}
    >
      {isSubmitting ? (
        <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        "Enviar Solicitação"
      )}
    </motion.button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-xl rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto relative max-h-[90vh] overflow-y-auto no-scrollbar">
              <button
                onClick={handleClose}
                aria-label="Fechar modal"
                className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors z-10"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              <div className="p-5 sm:p-7 md:p-10">
                {step === "form" ? (
                  bookingType === "quarto" ? (
                    /* ── FORMULÁRIO DE QUARTO ─────────────────────────────── */
                    <>
                      <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
                          Verificar Disponibilidade
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Preencha seus dados e entraremos em contato para confirmar sua reserva.
                        </p>
                      </div>

                      <form onSubmit={handleRoomSubmit} className="space-y-4" noValidate>
                        {/* Nome */}
                        <div className="space-y-2">
                          <label className={labelClass}>Nome Completo</label>
                          <input
                            name="name"
                            value={roomData.name}
                            onChange={handleRoomChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Ex: Maria Bastos"
                            className={inputClass(!!(touched.name && errors.name))}
                          />
                          {touched.name && errors.name && (
                            <p className={errorClass}>{errors.name}</p>
                          )}
                        </div>

                        {/* Email + Telefone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelClass}>E-mail</label>
                            <input
                              name="email"
                              value={roomData.email}
                              onChange={handleRoomChange}
                              onBlur={handleBlur}
                              type="email"
                              placeholder="exemplo@email.com"
                              className={inputClass(!!(touched.email && errors.email))}
                            />
                            {touched.email && errors.email && (
                              <p className={errorClass}>{errors.email}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Telefone / WhatsApp</label>
                            <input
                              name="phone"
                              value={roomData.phone}
                              onChange={handleRoomChange}
                              onBlur={handleBlur}
                              type="tel"
                              placeholder="(00) 00000-0000"
                              className={inputClass(!!(touched.phone && errors.phone))}
                            />
                            {touched.phone && errors.phone && (
                              <p className={errorClass}>{errors.phone}</p>
                            )}
                          </div>
                        </div>

                        {/* Check-in / Check-out */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelClass}>Check-in</label>
                            <input
                              name="checkIn"
                              value={roomData.checkIn}
                              onChange={handleRoomChange}
                              onBlur={handleBlur}
                              type="date"
                              className={inputClass(!!(touched.checkIn && errors.checkIn))}
                            />
                            {touched.checkIn && errors.checkIn && (
                              <p className={errorClass}>{errors.checkIn}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Check-out</label>
                            <input
                              name="checkOut"
                              value={roomData.checkOut}
                              onChange={handleRoomChange}
                              onBlur={handleBlur}
                              type="date"
                              min={roomData.checkIn || undefined}
                              className={inputClass(!!(touched.checkOut && errors.checkOut))}
                            />
                            {touched.checkOut && errors.checkOut && (
                              <p className={errorClass}>{errors.checkOut}</p>
                            )}
                          </div>
                        </div>

                        {/* Tipo de apartamento */}
                        <div className="space-y-2">
                          <label className={labelClass}>Tipo de Apartamento</label>
                          <select
                            name="accommodation"
                            value={roomData.accommodation}
                            onChange={handleRoomChange}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                          >
                            <option>Apt. Simples</option>
                            <option>Apt. Duplo</option>
                            <option>Apt. Casal</option>
                            <option>Apt. Triplo</option>
                            <option>Apt. Master</option>
                            <option>Apt. Master Luxo</option>
                            <option>Apt. Acessibilidade</option>
                          </select>
                        </div>

                        {/* Adultos / Crianças */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelClass}>Adultos</label>
                            <select
                              name="adults"
                              value={roomData.adults}
                              onChange={handleRoomChange}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                            >
                              <option value="1">1 Adulto</option>
                              <option value="2">2 Adultos</option>
                              <option value="3">3 Adultos</option>
                              <option value="4">4 Adultos</option>
                              <option value="5+">5+ Adultos</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Crianças</label>
                            <select
                              name="children"
                              value={roomData.children}
                              onChange={handleRoomChange}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                            >
                              <option value="0">Nenhuma</option>
                              <option value="1">1 Criança</option>
                              <option value="2">2 Crianças</option>
                              <option value="3">3 Crianças</option>
                              <option value="4+">4+ Crianças</option>
                            </select>
                          </div>
                        </div>

                        {/* Observações */}
                        <div className="space-y-2">
                          <label className={labelClass}>Pedidos Especiais</label>
                          <textarea
                            name="notes"
                            value={roomData.notes}
                            onChange={handleRoomChange}
                            rows={2}
                            placeholder="Ex: berço no quarto, restrições alimentares..."
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          />
                        </div>

                        {privacyCheckbox("quarto", roomData.acceptedPrivacy)}
                        {submitButton}
                      </form>
                    </>
                  ) : (
                    /* ── FORMULÁRIO DE EVENTO ─────────────────────────────── */
                    <>
                      <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
                          Solicitar Proposta de Evento
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Preencha os detalhes do seu evento e nossa equipe preparará uma proposta personalizada.
                        </p>
                      </div>

                      <form onSubmit={handleEventSubmit} className="space-y-4" noValidate>
                        {/* Nome */}
                        <div className="space-y-2">
                          <label className={labelClass}>Nome Completo / Empresa</label>
                          <input
                            name="name"
                            value={eventData.name}
                            onChange={handleEventChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Ex: João Silva ou Empresa XYZ"
                            className={inputClass(!!(touched.name && errors.name))}
                          />
                          {touched.name && errors.name && (
                            <p className={errorClass}>{errors.name}</p>
                          )}
                        </div>

                        {/* Email + Telefone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelClass}>E-mail</label>
                            <input
                              name="email"
                              value={eventData.email}
                              onChange={handleEventChange}
                              onBlur={handleBlur}
                              type="email"
                              placeholder="exemplo@email.com"
                              className={inputClass(!!(touched.email && errors.email))}
                            />
                            {touched.email && errors.email && (
                              <p className={errorClass}>{errors.email}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Telefone / WhatsApp</label>
                            <input
                              name="phone"
                              value={eventData.phone}
                              onChange={handleEventChange}
                              onBlur={handleBlur}
                              type="tel"
                              placeholder="(00) 00000-0000"
                              className={inputClass(!!(touched.phone && errors.phone))}
                            />
                            {touched.phone && errors.phone && (
                              <p className={errorClass}>{errors.phone}</p>
                            )}
                          </div>
                        </div>

                        {/* Espaço + Tipo de evento */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelClass}>Espaço Desejado</label>
                            <select
                              name="eventSpace"
                              value={eventData.eventSpace}
                              onChange={handleEventChange}
                              onBlur={handleBlur}
                              className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2 text-sm outline-none transition-all appearance-none cursor-pointer ${
                                touched.eventSpace && errors.eventSpace
                                  ? "border-red-100"
                                  : "border-transparent focus:ring-2 focus:ring-primary/20"
                              }`}
                            >
                              <option value="">Selecione...</option>
                              <option>Auditório (170 pessoas)</option>
                              <option>Sala de Reuniões (20 pessoas)</option>
                              <option>Salão de Eventos (Restaurante)</option>
                            </select>
                            {touched.eventSpace && errors.eventSpace && (
                              <p className={errorClass}>{errors.eventSpace}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Tipo de Evento</label>
                            <select
                              name="eventType"
                              value={eventData.eventType}
                              onChange={handleEventChange}
                              onBlur={handleBlur}
                              className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2 text-sm outline-none transition-all appearance-none cursor-pointer ${
                                touched.eventType && errors.eventType
                                  ? "border-red-100"
                                  : "border-transparent focus:ring-2 focus:ring-primary/20"
                              }`}
                            >
                              <option value="">Selecione...</option>
                              <option>Corporativo / Reunião</option>
                              <option>Conferência / Palestra</option>
                              <option>Casamento / Festa</option>
                              <option>Formatura</option>
                              <option>Aniversário</option>
                              <option>Religioso</option>
                              <option>Outro</option>
                            </select>
                            {touched.eventType && errors.eventType && (
                              <p className={errorClass}>{errors.eventType}</p>
                            )}
                          </div>
                        </div>

                        {/* Data + Participantes */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelClass}>Data do Evento</label>
                            <input
                              name="eventDate"
                              value={eventData.eventDate}
                              onChange={handleEventChange}
                              onBlur={handleBlur}
                              type="date"
                              className={inputClass(!!(touched.eventDate && errors.eventDate))}
                            />
                            {touched.eventDate && errors.eventDate && (
                              <p className={errorClass}>{errors.eventDate}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Nº de Participantes</label>
                            <input
                              name="attendees"
                              value={eventData.attendees}
                              onChange={handleEventChange}
                              onBlur={handleBlur}
                              type="number"
                              min="1"
                              placeholder="Ex: 80"
                              className={inputClass(!!(touched.attendees && errors.attendees))}
                            />
                            {touched.attendees && errors.attendees && (
                              <p className={errorClass}>{errors.attendees}</p>
                            )}
                          </div>
                        </div>

                        {/* Horário início / fim */}
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className={labelClass}>Horário de Início</label>
                              <input
                                name="startTime"
                                value={eventData.startTime}
                                onChange={handleEventChange}
                                type="time"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className={labelClass}>Horário de Término</label>
                              <input
                                name="endTime"
                                value={eventData.endTime}
                                onChange={handleEventChange}
                                type="time"
                                min={eventData.startTime || undefined}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                              />
                            </div>
                          </div>
                          {errors.endTime ? (
                            <p className={errorClass}>{errors.endTime}</p>
                          ) : (() => {
                            const duration = calcDuration(eventData.startTime, eventData.endTime);
                            return duration ? (
                              <div className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/5 rounded-lg px-3 py-1.5 w-fit">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                Duração: {duration}
                              </div>
                            ) : null;
                          })()}
                        </div>

                        {/* Observações */}
                        <div className="space-y-2">
                          <label className={labelClass}>Observações / Necessidades Especiais</label>
                          <textarea
                            name="notes"
                            value={eventData.notes}
                            onChange={handleEventChange}
                            rows={2}
                            placeholder="Ex: equipamentos AV, buffet personalizado, decoração..."
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          />
                        </div>

                        {privacyCheckbox("evento", eventData.acceptedPrivacy)}
                        {submitButton}
                      </form>
                    </>
                  )
                ) : (
                  /* ── TELA DE SUCESSO ──────────────────────────────────────── */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="size-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <span className="material-symbols-outlined text-5xl">check_circle</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                      Solicitação Recebida!
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-8">
                      {bookingType === "quarto"
                        ? "Obrigado pelo seu interesse. Nossa equipe analisará seu pedido e entrará em contato via E-mail ou WhatsApp em breve para confirmar sua reserva."
                        : "Obrigado! Nossa equipe de eventos analisará os detalhes e enviará uma proposta personalizada via E-mail ou WhatsApp em breve."}
                    </p>
                    <button
                      onClick={handleClose}
                      className="bg-primary text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-opacity-90 transition-all"
                    >
                      Voltar ao Site
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
