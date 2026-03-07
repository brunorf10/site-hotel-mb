import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail, EMAIL_TEMPLATES } from "../services/email-service";
import { useFormMask } from "../hooks/useFormMask";
import { validateField } from "../services/form-validation";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  accommodation: string;
  notes: string;
  adults: string;
  children: string;
  acceptedPrivacy: boolean;
}

interface BookingErrors {
  name?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { maskPhone } = useFormMask();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    accommodation: "Apt. Simples",
    notes: "",
    adults: "1",
    children: "0",
    acceptedPrivacy: false,
  });

  const [errors, setErrors] = useState<BookingErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (
    name: string,
    value: string,
    currentData: BookingFormData,
  ) => {
    return validateField(name, value, currentData.checkIn);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "phone") {
      finalValue = maskPhone(value);
    }

    if (e.target.type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      const updatedData = { ...formData, [name]: checked };
      setFormData(updatedData);

      if (touched[name] || true) {
        // Checkboxes são simples, validamos na hora
        const error = validate(name, checked.toString(), updatedData);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
      return;
    }

    const updatedData = { ...formData, [name]: finalValue };
    setFormData(updatedData);

    if (touched[name]) {
      const error = validate(name, finalValue, updatedData);
      setErrors((prev) => ({ ...prev, [name]: error }));

      if (name === "checkIn" && touched.checkOut) {
        const checkOutError = validate(
          "checkOut",
          updatedData.checkOut,
          updatedData,
        );
        setErrors((prev) => ({ ...prev, checkOut: checkOutError }));
      }
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validate(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: BookingErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const error = validate(key, (formData as any)[key], formData);
      if (error) {
        (newErrors as any)[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setTouched(
        Object.keys(formData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {},
        ),
      );
      toast.error("Por favor, corrija os erros no formulário antes de enviar.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail(EMAIL_TEMPLATES.RESERVA, {
        to_email: "", // Configurado no serviço parabrunorafaelhn@gmail.com
        from_name: formData.name,
        from_email: formData.email,
        subject: `Nova Solicitação de Reserva - ${formData.accommodation}`,
        message: `
          Nova solicitação de reserva recebida através do site:

          Dados do Cliente:
          ----------------
          Nome: ${formData.name}
          E-mail: ${formData.email}
          Telefone: ${formData.phone}

          Dados da Reserva:
          -----------------
          Acomodação: ${formData.accommodation}
          Check-in: ${formData.checkIn}
          Check-out: ${formData.checkOut}
          Adultos: ${formData.adults}
          Crianças: ${formData.children}
          
          Observações/Pedidos:
          --------------------
          ${formData.notes || "Nenhuma observação informada."}
        `,
        // Campos individuais para customização no EmailJS
        phone: formData.phone,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        accommodation: formData.accommodation,
        adults: formData.adults,
        children: formData.children,
        notes: formData.notes,
      });
      setStep("success");
    } catch (error: any) {
      console.error("Erro ao enviar reserva:", error);
      toast.error(
        "Erro ao enviar solicitação. Tente novamente ou entre em contato por telefone.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    !Object.keys(formData).some((key) => {
      const value = (formData as any)[key];
      const error = validate(key, value.toString(), formData);
      return !!error;
    }) && formData.acceptedPrivacy;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        accommodation: "Apt. Simples",
        notes: "",
        adults: "1",
        children: "0",
        acceptedPrivacy: false,
      });
      setErrors({});
      setTouched({});
    }, 300);
  };

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
                aria-label="Fechar modal de reserva"
                className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors z-10"
              >
                <span className="material-symbols-outlined text-3xl">
                  close
                </span>
              </button>

              <div className="p-5 sm:p-7 md:p-10">
                {step === "form" ? (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
                        Interesse em Reserva
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Preencha seus dados para que possamos entrar em contato
                        e confirmar sua estadia ou evento.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      noValidate
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          Nome Completo
                        </label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          aria-label="Seu nome completo"
                          placeholder="Ex: Maria Bastos"
                          className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2.5 outline-none transition-all ${
                            touched.name && errors.name
                              ? "border-red-100 focus:border-red-300"
                              : "border-transparent focus:ring-2 focus:ring-primary/20"
                          }`}
                        />
                        {touched.name && errors.name && (
                          <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            E-mail
                          </label>
                          <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="email"
                            aria-label="Seu endereço de e-mail"
                            placeholder="exemplo@email.com"
                            className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2.5 outline-none transition-all ${
                              touched.email && errors.email
                                ? "border-red-100 focus:border-red-300"
                                : "border-transparent focus:ring-2 focus:ring-primary/20"
                            }`}
                          />
                          {touched.email && errors.email && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            Telefone / WhatsApp
                          </label>
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="tel"
                            aria-label="Seu número de telefone ou WhatsApp"
                            placeholder="(00) 00000-0000"
                            className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2.5 outline-none transition-all ${
                              touched.phone && errors.phone
                                ? "border-red-100 focus:border-red-300"
                                : "border-transparent focus:ring-2 focus:ring-primary/20"
                            }`}
                          />
                          {touched.phone && errors.phone && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            Check-in / Início
                          </label>
                          <input
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="date"
                            className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2.5 outline-none transition-all ${
                              touched.checkIn && errors.checkIn
                                ? "border-red-100 focus:border-red-300"
                                : "border-transparent focus:ring-2 focus:ring-primary/20"
                            }`}
                          />
                          {touched.checkIn && errors.checkIn && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                              {errors.checkIn}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            Check-out / Fim
                          </label>
                          <input
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="date"
                            min={formData.checkIn || undefined}
                            className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2.5 outline-none transition-all ${
                              touched.checkOut && errors.checkOut
                                ? "border-red-100 focus:border-red-300"
                                : "border-transparent focus:ring-2 focus:ring-primary/20"
                            }`}
                          />
                          {touched.checkOut && errors.checkOut && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                              {errors.checkOut}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          Interesse Principal
                        </label>
                        <select
                          name="accommodation"
                          value={formData.accommodation}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                        >
                          <optgroup label="Apartamentos">
                            <option>Apt. Simples</option>
                            <option>Apt. Duplo</option>
                            <option>Apt. Casal</option>
                            <option>Apt. Triplo</option>
                            <option>Apt. Master</option>
                            <option>Apt. Master Luxo</option>
                            <option>Apt. Acessibilidade</option>
                          </optgroup>
                          <optgroup label="Espaços para Eventos">
                            <option>Auditório (170 pessoas)</option>
                            <option>Sala de Reuniões (20 pessoas)</option>
                            <option>Salão de Eventos (Restaurante)</option>
                          </optgroup>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            Adultos
                          </label>
                          <select
                            name="adults"
                            value={formData.adults}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                          >
                            <option value="1">1 Adulto</option>
                            <option value="2">2 Adultos</option>
                            <option value="3">3 Adultos</option>
                            <option value="4">4 Adultos</option>
                            <option value="5+">5+ Adultos</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            Crianças
                          </label>
                          <select
                            name="children"
                            value={formData.children}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                          >
                            <option value="0">Nenhuma</option>
                            <option value="1">1 Criança</option>
                            <option value="2">2 Crianças</option>
                            <option value="3">3 Crianças</option>
                            <option value="4+">4+ Crianças</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          Dúvidas ou Pedidos Especiais
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Ex: Berço no quarto, restrições alimentares ou detalhes do evento..."
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        ></textarea>
                      </div>

                      <div className="flex items-start gap-3 py-2 cursor-pointer group">
                        <div className="relative flex items-center mt-1">
                          <input
                            id="privacy-booking"
                            name="acceptedPrivacy"
                            type="checkbox"
                            checked={formData.acceptedPrivacy}
                            onChange={handleChange}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 transition-all checked:border-primary checked:bg-primary"
                          />
                          <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            check
                          </span>
                        </div>
                        <label
                          htmlFor="privacy-booking"
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
                          <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                          "Enviar Solicitação"
                        )}
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="size-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <span className="material-symbols-outlined text-5xl">
                        check_circle
                      </span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                      Solicitação Recebida!
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-8">
                      Obrigado pelo seu interesse. Nossa equipe de atendimento
                      analisará seu pedido e entrará em contato via{" "}
                      <strong>E-mail ou WhatsApp</strong> em breve para sanar
                      todas as suas dúvidas e finalizar sua reserva.
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
