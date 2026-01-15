import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const OWNER_EMAIL =
  import.meta.env.VITE_OWNER_EMAIL || "brunorafaelhn@gmail.com";

interface EmailParams extends Record<string, unknown> {
  to_email: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (templateId: string, params: EmailParams) => {
  if (
    !SERVICE_ID ||
    !PUBLIC_KEY ||
    !templateId ||
    templateId === "your_template_id"
  ) {
    console.warn("EmailJS não configurado corretamente. Simulando envio...");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { status: 200, text: "Simulação de sucesso" };
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      {
        ...params,
        to_email: OWNER_EMAIL,
      },
      PUBLIC_KEY
    );
    return response;
  } catch (error: any) {
    console.error("Erro ao enviar e-mail via EmailJS:", error?.text || error);
    throw error;
  }
};

export const EMAIL_TEMPLATES = {
  RESERVA: import.meta.env.VITE_EMAILJS_TEMPLATE_RESERVA_ID || "",
  CONTATO: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTATO_ID || "",
};
