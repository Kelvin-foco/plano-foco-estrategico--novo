
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PoliticaPrivacidade = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Informações que Coletamos</h2>
                <p>
                  Coletamos informações que você fornece diretamente através do nosso formulário de diagnóstico, incluindo:
                  nome da clínica, dados de contato, informações sobre faturamento, número de cadeiras, procedimentos realizados,
                  estratégias de marketing utilizadas e outras informações relacionadas ao funcionamento da sua clínica odontológica.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Como Utilizamos suas Informações</h2>
                <p>Utilizamos as informações coletadas para:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Gerar um diagnóstico personalizado para sua clínica</li>
                  <li>Criar estratégias de marketing adequadas ao seu perfil</li>
                  <li>Entrar em contato para oferecer nossos serviços</li>
                  <li>Melhorar nossos serviços e metodologias</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Compartilhamento de Informações</h2>
                <p>
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando 
                  necessário para prestar nossos serviços ou quando exigido por lei.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Segurança dos Dados</h2>
                <p>
                  Implementamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado,
                  alteração, divulgação ou destruição.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Seus Direitos</h2>
                <p>
                  Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos,
                  entre em contato conosco através do e-mail contato@agenciafocomkt.com.br.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Alterações nesta Política</h2>
                <p>
                  Esta política pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente
                  para se manter informado sobre como protegemos suas informações.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contato</h2>
                <p>
                  Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
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

export default PoliticaPrivacidade;
