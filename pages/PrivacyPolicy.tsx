import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
            Política de Privacidade
          </h1>

          <div className="prose prose-stone lg:prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                1. Introdução
              </h2>
              <p>
                O Hotel Maria Bastos valoriza a privacidade de seus hóspedes e
                visitantes. Esta política descreve como coletamos, usamos e
                protegemos suas informações pessoais em conformidade com a Lei
                Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                2. Coleta de Dados
              </h2>
              <p>
                Coletamos informações que você nos fornece diretamente ao
                realizar uma reserva ou entrar em contato conosco, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nome completo;</li>
                <li>Endereço de e-mail;</li>
                <li>Número de telefone;</li>
                <li>Datas de estadia e preferências de acomodação.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                3. Uso das Informações
              </h2>
              <p>Seus dados são utilizados exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processar e confirmar suas solicitações de reserva;</li>
                <li>Responder a dúvidas e mensagens de contato;</li>
                <li>
                  Garantir uma experiência personalizada durante sua estadia;
                </li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                4. Segurança
              </h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais
                para proteger seus dados pessoais contra acesso não autorizado,
                perda ou alteração. Seus dados são tratados com a máxima
                confidencialidade por nossa equipe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                5. Seus Direitos
              </h2>
              <p>
                Você tem o direito de solicitar o acesso, correção ou exclusão
                de seus dados pessoais a qualquer momento. Para exercer esses
                direitos, entre em contato através do e-mail{" "}
                <strong>contato@mariabastos.com.br</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                6. Alterações nesta Política
              </h2>
              <p>
                Esta política pode ser atualizada periodicamente. Recomendamos a
                consulta regular desta página para estar ciente de qualquer
                modificação.
              </p>
              <p className="text-sm text-gray-500 mt-8">
                Última atualização: Janeiro de 2026.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
