
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, MessageCircle, Target, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface ClinicaData {
  nome_clinica: string;
  faturamento_atual: string;
  faturamento_meta: string;
  numero_cadeiras: string;
  procedimento_principal: string;
  faz_marketing_online: string;
  canais_atuais: string[];
  investe_em_trafego: string;
  ticket_medio: string;
  pacientes_mes: string;
}

const Resultado = () => {
  const [clinicaData, setClinicaData] = useState<ClinicaData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('clinicaData');
    if (data) {
      setClinicaData(JSON.parse(data));
    }
  }, []);

  if (!clinicaData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dados não encontrados
          </h2>
          <Link to="/formulario">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Fazer diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const gerarDiagnostico = () => {
    const faturamentoAtual = parseFloat(clinicaData.faturamento_atual.replace(/[R$.,\s]/g, ''));
    const faturamentoMeta = parseFloat(clinicaData.faturamento_meta.replace(/[R$.,\s]/g, ''));
    const ticketMedio = parseFloat(clinicaData.ticket_medio.replace(/[R$.,\s]/g, ''));
    const pacientesMes = parseInt(clinicaData.pacientes_mes);
    const numeroCadeiras = parseInt(clinicaData.numero_cadeiras);

    return {
      gapFaturamento: faturamentoMeta - faturamentoAtual,
      crescimentoNecessario: ((faturamentoMeta - faturamentoAtual) / faturamentoAtual * 100).toFixed(1),
      pacientesNecessarios: Math.ceil((faturamentoMeta - faturamentoAtual) / ticketMedio),
      capacidadeMaxima: numeroCadeiras * 20 * 22, // 20 pacientes por cadeira por dia, 22 dias úteis
      utilizacaoAtual: (pacientesMes / (numeroCadeiras * 20 * 22) * 100).toFixed(1)
    };
  };

  const diagnostico = gerarDiagnostico();

  const gerarRecomendacoes = () => {
    const recomendacoes = [];

    // Análise de marketing online
    if (clinicaData.faz_marketing_online === 'nao') {
      recomendacoes.push({
        categoria: "Marketing Digital",
        prioridade: "Alta",
        acao: "Implementar presença digital imediatamente",
        detalhes: "Criar contas no Instagram e Google Meu Negócio, desenvolver estratégia de conteúdo focada em educação odontológica."
      });
    }

    // Análise de tráfego pago
    if (clinicaData.investe_em_trafego === 'nao') {
      recomendacoes.push({
        categoria: "Tráfego Pago",
        prioridade: "Média",
        acao: "Investir em Google Ads e Meta Ads",
        detalhes: `Começar com investimento de R$ 1.500-3.000/mês focando em ${clinicaData.procedimento_principal.toLowerCase()} na sua região.`
      });
    }

    // Análise de capacidade
    if (parseFloat(diagnostico.utilizacaoAtual) > 85) {
      recomendacoes.push({
        categoria: "Capacidade",
        prioridade: "Alta",
        acao: "Expandir capacidade de atendimento",
        detalhes: "Considerar aumento de horários de funcionamento ou contratação de mais profissionais."
      });
    }

    // Análise de ticket médio
    const ticketMedio = parseFloat(clinicaData.ticket_medio.replace(/[R$.,\s]/g, ''));
    if (ticketMedio < 800) {
      recomendacoes.push({
        categoria: "Ticket Médio",
        prioridade: "Média",
        acao: "Aumentar valor médio por paciente",
        detalhes: "Implementar vendas cruzadas, pacotes de tratamento e procedimentos estéticos complementares."
      });
    }

    return recomendacoes;
  };

  const recomendacoes = gerarRecomendacoes();

  const downloadPDF = () => {
    // Simular download do PDF
    const element = document.createElement('a');
    const file = new Blob([`
PLANO ESTRATÉGICO - ${clinicaData.nome_clinica}

DIAGNÓSTICO ATUAL:
- Faturamento atual: ${clinicaData.faturamento_atual}
- Meta de faturamento: ${clinicaData.faturamento_meta}
- Gap de crescimento: ${diagnostico.crescimentoNecessario}%
- Utilização de capacidade: ${diagnostico.utilizacaoAtual}%

RECOMENDAÇÕES:
${recomendacoes.map(rec => `
- ${rec.categoria}: ${rec.acao}
  ${rec.detalhes}
`).join('')}

Gerado por Foco Marketing
    `], { type: 'text/plain' });
    
    element.href = URL.createObjectURL(file);
    element.download = `plano-estrategico-${clinicaData.nome_clinica.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Início
            </Link>
            <div className="ml-4 text-2xl font-bold text-blue-600">
              Foco Marketing
            </div>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plano Estratégico para {clinicaData.nome_clinica}
            </h1>
            <p className="text-xl text-gray-600">
              Seu diagnóstico personalizado e ações práticas para alcançar R$ 100.000 de faturamento
            </p>
          </div>

          {/* Diagnóstico Atual */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Target className="mr-3 h-6 w-6 text-blue-600" />
                Diagnóstico Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {clinicaData.faturamento_atual}
                  </div>
                  <div className="text-sm text-gray-600">Faturamento Atual</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {diagnostico.crescimentoNecessario}%
                  </div>
                  <div className="text-sm text-gray-600">Crescimento Necessário</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {diagnostico.utilizacaoAtual}%
                  </div>
                  <div className="text-sm text-gray-600">Utilização da Capacidade</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {diagnostico.pacientesNecessarios}
                  </div>
                  <div className="text-sm text-gray-600">Pacientes Adicionais/Mês</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oportunidades de Crescimento */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <TrendingUp className="mr-3 h-6 w-6 text-green-600" />
                Oportunidades de Crescimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    Potencial de Mercado
                  </h3>
                  <p className="text-blue-800">
                    Com base no seu procedimento principal ({clinicaData.procedimento_principal.toLowerCase()}) 
                    e localização, existe um grande potencial de crescimento através de marketing digital 
                    direcionado e otimização da experiência do paciente.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    Expansão de Serviços
                  </h3>
                  <p className="text-green-800">
                    Oportunidade de implementar tratamentos complementares e pacotes de cuidados 
                    que podem aumentar significativamente o ticket médio por paciente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recomendações Estratégicas */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Zap className="mr-3 h-6 w-6 text-yellow-600" />
                Ações Estratégicas Prioritárias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recomendacoes.map((rec, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {rec.categoria}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        rec.prioridade === 'Alta' ? 'bg-red-100 text-red-800' :
                        rec.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        Prioridade {rec.prioridade}
                      </span>
                    </div>
                    <h4 className="font-medium text-blue-900 mb-2">{rec.acao}</h4>
                    <p className="text-gray-700">{rec.detalhes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plano de Implementação */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Users className="mr-3 h-6 w-6 text-purple-600" />
                Plano de Implementação (90 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      Primeiros 30 dias
                    </h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Configurar Google Meu Negócio</li>
                      <li>• Criar perfil profissional no Instagram</li>
                      <li>• Implementar sistema de agendamento online</li>
                      <li>• Treinar equipe para experiência do paciente</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">
                      30-60 dias
                    </h3>
                    <ul className="space-y-2 text-green-800">
                      <li>• Lançar campanhas de tráfego pago</li>
                      <li>• Implementar estratégia de conteúdo</li>
                      <li>• Desenvolver pacotes de tratamento</li>
                      <li>• Sistema de follow-up pós-consulta</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">
                      60-90 dias
                    </h3>
                    <ul className="space-y-2 text-purple-800">
                      <li>• Otimizar conversões e ROI</li>
                      <li>• Implementar programa de fidelidade</li>
                      <li>• Expandir oferta de serviços</li>
                      <li>• Análise e ajustes estratégicos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Baixar Plano Completo
                </h3>
                <p className="text-gray-600 mb-6">
                  Receba seu plano estratégico detalhado em PDF para implementar em sua clínica.
                </p>
                <Button 
                  onClick={downloadPDF}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Baixar plano estratégico em PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Falar com Especialista
                </h3>
                <p className="text-gray-600 mb-6">
                  Converse com nossa equipe para acelerar a implementação do seu plano.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full"
                  size="lg"
                  onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Gostaria de falar sobre o plano estratégico da minha clínica.', '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Fale com um especialista da Foco
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Próximos Passos */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                Pronto para transformar sua clínica?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A Foco Marketing é especializada em marketing para clínicas odontológicas. 
                Vamos implementar juntos as estratégias que levarão sua clínica aos R$ 100.000 mensais.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-gray-600">Clínicas atendidas</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">150%</div>
                  <div className="text-gray-600">Crescimento médio</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">90 dias</div>
                  <div className="text-gray-600">Para ver resultados</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-4">
              Foco Marketing
            </div>
            <p className="text-gray-400 mb-6">
              Especialistas em marketing para clínicas odontológicas
            </p>
            <div className="text-gray-500 text-sm">
              © 2024 Foco Marketing. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resultado;
