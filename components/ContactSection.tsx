import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail, EMAIL_TEMPLATES } from "../services/email-service";
import { useFormMask } from "../hooks/useFormMask";
import { validateField } from "../services/form-validation";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  acceptedPrivacy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    acceptedPrivacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { maskPhone } = useFormMask();

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.444738595564!2d-40.30388832500742!3d-5.890694394092929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a2967664c399b5%3A0x6b8c9d96c9c9c9c9!2sR.%20Solon%20Medeiros%2C%20365%20-%20Alto%20Brilhante%2C%20Tau%C3%A1%20-%20CE%2C%2063660-000!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr`;

  const validate = (name: string, value: string) => {
    return validateField(name, value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "phone") {
      finalValue = maskPhone(value);
    }

    if (e.target.type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));

      const error = validateField(name, checked.toString());
      setErrors((prev) => ({ ...prev, [name]: error }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (touched[name]) {
      const error = validate(name, finalValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );

    if (hasErrors) {
      toast.error(
        "Por favor, preencha todos os campos obrigatórios corretamente.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail(EMAIL_TEMPLATES.CONTATO, {
        to_email: "", // Configurado no serviço parabrunorafaelhn@gmail.com
        from_name: formData.name,
        from_email: formData.email,
        subject: `Mensagem de Contato - ${formData.subject}`,
        message: formData.message,
        // Campos individuais para customização no EmailJS
        phone: formData.phone,
        contact_subject: formData.subject,
      });
      toast.success(
        "Mensagem enviada com sucesso! Em breve entraremos em contato.",
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        acceptedPrivacy: false,
      });
      setTouched({});
    } catch (error: any) {
      console.error("Erro ao enviar contato:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    Object.keys(formData).every((key) => {
      const value = (formData as any)[key];
      return !validateField(key, value.toString());
    }) && formData.acceptedPrivacy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">
          Localização & Contato
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sua experiência premium no sertão cearense começa aqui. Estamos
          localizados no coração de Tauá, prontos para recebê-lo com
          exclusividade e requinte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-stretch">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden h-[450px] shadow-2xl border border-gray-100 relative group"
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Hotel Maria Bastos"
              className="w-full h-full grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
            ></iframe>

            <div className="absolute top-4 right-4 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                <span className="size-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Nossa Localização
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: "location_on",
                title: "Endereço",
                text: "Rua Solon Medeiros, 365, Alto Brilhante, Tauá - CE",
              },
              { icon: "call", title: "Telefone", text: "+55 (88) 3437-1234" },
              {
                icon: "mail",
                title: "Email",
                text: "contato@mariabastos.com.br",
              },
            ].map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className="material-symbols-outlined text-primary text-3xl flex-shrink-0">
                  {info.icon}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-primary uppercase tracking-wider">
                    {info.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {info.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100 lg:h-full flex flex-col"
        >
          <h3 className="text-2xl font-bold text-primary mb-8">
            Envie-nos uma Mensagem
          </h3>
          <form
            className="space-y-6 flex-grow flex flex-col"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Seu nome completo"
                  className={`w-full bg-gray-50 border-2 rounded-xl px-5 py-4 outline-none transition-all ${
                    touched.name && errors.name
                      ? "border-red-200 focus:border-red-400"
                      : "border-transparent focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                <AnimatePresence>
                  {touched.name && errors.name && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[10px] text-red-500 font-bold uppercase tracking-wider"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="seu@email.com"
                  className={`w-full bg-gray-50 border-2 rounded-xl px-5 py-4 outline-none transition-all ${
                    touched.email && errors.email
                      ? "border-red-200 focus:border-red-400"
                      : "border-transparent focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                <AnimatePresence>
                  {touched.email && errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[10px] text-red-500 font-bold uppercase tracking-wider"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Telefone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="(00) 00000-0000"
                  className={`w-full bg-gray-50 border-2 rounded-xl px-5 py-4 outline-none transition-all ${
                    touched.phone && errors.phone
                      ? "border-red-200 focus:border-red-400"
                      : "border-transparent focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                <AnimatePresence>
                  {touched.phone && errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[10px] text-red-500 font-bold uppercase tracking-wider"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Assunto
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Assunto do contato"
                  className={`w-full bg-gray-50 border-2 rounded-xl px-5 py-4 outline-none transition-all ${
                    touched.subject && errors.subject
                      ? "border-red-200 focus:border-red-400"
                      : "border-transparent focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                <AnimatePresence>
                  {touched.subject && errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[10px] text-red-500 font-bold uppercase tracking-wider"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Mensagem
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Como podemos ajudar?"
                className={`w-full bg-gray-50 border-2 rounded-xl px-5 py-4 outline-none transition-all resize-none ${
                  touched.message && errors.message
                    ? "border-red-200 focus:border-red-400"
                    : "border-transparent focus:ring-2 focus:ring-primary/20"
                }`}
              ></textarea>
              <AnimatePresence>
                {touched.message && errors.message && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] text-red-500 font-bold uppercase tracking-wider"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-start gap-3 py-2 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input
                  id="privacy-contact"
                  name="acceptedPrivacy"
                  type="checkbox"
                  checked={formData.acceptedPrivacy}
                  onChange={handleChange as any}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 transition-all checked:border-primary checked:bg-primary"
                />
                <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  check
                </span>
              </div>
              <label
                htmlFor="privacy-contact"
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
              className={`w-full py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 mt-auto ${
                isFormValid
                  ? "bg-primary text-white shadow-primary/20 hover:bg-opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? (
                <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  Enviar Mensagem
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};
