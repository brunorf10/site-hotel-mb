import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const Accessibility: React.FC = () => {
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
            Acessibilidade
          </h1>

          <div className="prose prose-stone lg:prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Nosso Compromisso
              </h2>
              <p>
                O Hotel Maria Bastos tem o compromisso de garantir que todos os
                hóspedes tenham uma experiência confortável e acessível. Nossas
                instalações foram projetadas pensando na inclusão e no bem-estar
                de todas as pessoas, independentemente de suas necessidades de
                mobilidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Apartamento Adaptado
              </h2>
              <p>
                Dispomos de apartamento especialmente adaptado para pessoas com
                deficiência ou mobilidade reduzida, com as seguintes
                características:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Espaço amplo de 23,60 m² com circulação facilitada;</li>
                <li>
                  Portas e corredores com largura adequada para cadeira de
                  rodas;
                </li>
                <li>Banheiro adaptado com barras de apoio;</li>
                <li>Cadeira de banho geriátrica disponível;</li>
                <li>Box acessível com acesso sem desnível;</li>
                <li>
                  Todas as comodidades padrão do hotel (Smart TV, Wi-Fi,
                  frigobar, climatização, etc.).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Áreas Comuns
              </h2>
              <p>
                Nossas áreas comuns contam com recursos de acessibilidade para
                garantir a autonomia e o conforto de todos os hóspedes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Elevador com acesso a todos os andares;</li>
                <li>
                  Recepção acessível e equipe treinada para atendimento
                  inclusivo;
                </li>
                <li>Estacionamento com vagas reservadas;</li>
                <li>Sinalização adaptada nos corredores e quartos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Acessibilidade Digital
              </h2>
              <p>
                Buscamos tornar nosso site o mais acessível possível, seguindo
                boas práticas de desenvolvimento web para garantir uma navegação
                inclusiva a todos os visitantes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Precisa de Assistência?
              </h2>
              <p>
                Se você possui necessidades especiais de acessibilidade ou
                deseja mais informações sobre nossos recursos adaptados, entre
                em contato conosco antes da sua chegada para que possamos
                preparar tudo para a sua estadia:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Telefone/WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/5588963722226"
                    className="text-accent hover:underline"
                  >
                    (88) 96372-2226
                  </a>
                </li>
                <li>
                  <strong>E-mail:</strong>{" "}
                  <a
                    href="mailto:contato@mariabastos.com.br"
                    className="text-accent hover:underline"
                  >
                    contato@mariabastos.com.br
                  </a>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-8">
                Última atualização: Março de 2026.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
