import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const TermsOfUse: React.FC = () => {
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
            Termos de Uso
          </h1>

          <div className="prose prose-stone lg:prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o site do Hotel Maria Bastos, você
                concorda com os presentes Termos de Uso. Caso não concorde com
                alguma disposição, recomendamos que não utilize o site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                2. Uso do Site
              </h2>
              <p>
                Este site tem como objetivo fornecer informações sobre o Hotel
                Maria Bastos, seus serviços, acomodações e facilitar o contato
                para reservas. O conteúdo disponibilizado é meramente
                informativo e pode ser atualizado a qualquer momento sem aviso
                prévio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                3. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo presente neste site — incluindo textos,
                fotografias, logotipos, design, layout e demais elementos
                gráficos — é de propriedade exclusiva do Hotel Maria Bastos ou
                de seus licenciadores, sendo protegido pela legislação
                brasileira de direitos autorais e propriedade intelectual.
              </p>
              <p>
                É proibida a reprodução, distribuição ou utilização de qualquer
                conteúdo deste site sem autorização prévia e expressa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                4. Reservas e Informações
              </h2>
              <p>
                As informações sobre tarifas, disponibilidade e condições de
                hospedagem apresentadas no site são de caráter informativo.
                Valores e disponibilidade estão sujeitos a alterações e devem
                ser confirmados no momento da reserva junto à nossa equipe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                5. Limitação de Responsabilidade
              </h2>
              <p>
                O Hotel Maria Bastos não se responsabiliza por eventuais
                indisponibilidades temporárias do site, erros técnicos ou
                imprecisões nas informações publicadas. Nos empenhamos para
                manter todas as informações atualizadas e corretas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                6. Links Externos
              </h2>
              <p>
                Este site pode conter links para sites de terceiros. O Hotel
                Maria Bastos não se responsabiliza pelo conteúdo, políticas de
                privacidade ou práticas desses sites externos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                7. Alterações nos Termos
              </h2>
              <p>
                Estes termos podem ser atualizados a qualquer momento. O uso
                continuado do site após eventuais modificações implica na
                aceitação dos novos termos.
              </p>
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
