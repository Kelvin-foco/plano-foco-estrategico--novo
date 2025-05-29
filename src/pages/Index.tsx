
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              Foco Marketing
            </div>
            <div className="hidden md:flex space-x-8 text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Sobre</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Serviços</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Descubra os Próximos Passos para sua Clínica{" "}
              <span className="text-blue-600">Alcançar 100 Mil</span>{" "}
              de Faturamento
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Responda algumas perguntas e receba um plano estratégico personalizado 
              com ações práticas para escalar sua clínica odontológica.
            </p>
            <Link to="/formulario">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Começar agora gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nosso diagnóstico?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa metodologia exclusiva analisa cada aspecto da sua clínica para 
              entregar um plano personalizado e eficaz.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Análise Personalizada
              </h3>
              <p className="text-gray-600">
                Cada clínica é única. Nosso algoritmo considera suas especificidades 
                para criar estratégias sob medida.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Foco no Paciente
              </h3>
              <p className="text-gray-600">
                Estratégias centradas na experiência do paciente para aumentar 
                a satisfação e gerar mais indicações.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Resultados Comprovados
              </h3>
              <p className="text-gray-600">
                Metodologia testada em centenas de clínicas que alcançaram 
                seus objetivos de faturamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar sua clínica?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Junte-se a centenas de dentistas que já descobriram o caminho 
            para o crescimento sustentável.
          </p>
          <Link to="/formulario">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Começar minha análise gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-4">
              Foco Marketing
            </div>
            <div className="text-gray-900 text-sm">
              © 2025 Foco Marketing. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
