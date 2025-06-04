
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-70 transition-colors" style={{ color: '#274587' }}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Link>
            <div className="ml-4">
              <img 
                src="/lovable-uploads/7e59ea8e-ac69-4dbd-b200-0499d6c5f9d7.png" 
                alt="Foco Marketing" 
                className="h-8"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceitação dos Termos</h2>
                <p>
                  Ao utilizar nossos serviços e preencher o formulário de diagnóstico, você concorda com estes Termos de Uso.
                  Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Descrição dos Serviços</h2>
                <p>
                  Oferecemos serviços de diagnóstico estratégico para clínicas odontológicas, incluindo análise de marketing,
                  recomendações personalizadas e estratégias para crescimento do faturamento.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Uso Adequado</h2>
                <p>Você concorda em:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Fornecer informações verdadeiras e precisas</li>
                  <li>Não utilizar nossos serviços para fins ilegais ou não autorizados</li>
                  <li>Não tentar interferir no funcionamento de nossos sistemas</li>
                  <li>Respeitar os direitos de propriedade intelectual</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Propriedade Intelectual</h2>
                <p>
                  Todo o conteúdo, metodologias e materiais fornecidos são de propriedade da Foco Marketing e estão
                  protegidos por direitos autorais e outras leis de propriedade intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitação de Responsabilidade</h2>
                <p>
                  As recomendações fornecidas são baseadas nas informações que você nos fornece. Os resultados podem variar
                  e não garantimos resultados específicos. Nossos serviços são fornecidos "como estão".
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Modificações dos Termos</h2>
                <p>
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                  imediatamente após sua publicação nesta página.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Lei Aplicável</h2>
                <p>
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes
                  do Brasil.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contato</h2>
                <p>
                  Para questões sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <ul className="list-none mt-2 space-y-1">
                  <li>Email: contato@agenciafocomkt.com.br</li>
                  <li>Telefone: (38) 98818-0075</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 text-center">
              <Link to="/">
                <Button style={{ backgroundColor: '#274587' }} className="text-white hover:opacity-90">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermosUso;
