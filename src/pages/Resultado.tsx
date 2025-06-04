import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Target, TrendingUp, Zap } from "lucide-react";
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
  distribui_material: string;
  participa_eventos: string;
  fachada_destacada: string;
  usou_radio_outdoor: string;
  tem_programa_indicacao: string;
  pacientes_indicacao_mes: string;
  whatsapp_treinado: string;
  tempo_resposta_whatsapp: string;
  usa_software_gestao: string;
  agenda_organizada: string;
  cidade: string;
  estado: string;
  telefone: string;
  instagram: string;
}

const Resultado = () => {
  const [clinicaData, setClinicaData] = useState<ClinicaData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('clinicaData');
    console.log('Dados recuperados do localStorage:', data);
    if (data) {
      const parsedData = JSON.parse(data);
      console.log('Dados parsed:', parsedData);
      setClinicaData(parsedData);
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
            <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#274587' }}>
              Fazer diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const gerarDiagnostico = () => {
    console.log('Gerando diagnóstico com dados:', clinicaData);
    
    // Limpar valores monetários e converter para números
    const faturamentoAtual = parseFloat(clinicaData.faturamento_atual.replace(/[R$.,\s]/g, '')) || 0;
    const faturamentoMeta = parseFloat(clinicaData.faturamento_meta.replace(/[R$.,\s]/g, '')) || 0;
    const ticketMedio = parseFloat(clinicaData.ticket_medio.replace(/[R$.,\s]/g, '')) || 0;
    const pacientesMes = parseInt(clinicaData.pacientes_mes) || 0;
    const numeroCadeiras = parseInt(clinicaData.numero_cadeiras) || 1;

    console.log('Valores convertidos:', {
      faturamentoAtual,
      faturamentoMeta,
      ticketMedio,
      pacientesMes,
      numeroCadeiras
    });

    const gapFaturamento = faturamentoMeta - faturamentoAtual;
    const crescimentoNecessario = faturamentoAtual > 0 ? ((gapFaturamento / faturamentoAtual) * 100).toFixed(1) : "0";
    const pacientesNecessarios = ticketMedio > 0 ? Math.ceil(gapFaturamento / ticketMedio) : 0;
    const capacidadeMaxima = numeroCadeiras * 20 * 22; // 20 pacientes por cadeira por dia, 22 dias úteis
    const utilizacaoAtual = capacidadeMaxima > 0 ? (pacientesMes / capacidadeMaxima * 100).toFixed(1) : "0";

    return {
      gapFaturamento,
      crescimentoNecessario,
      pacientesNecessarios,
      capacidadeMaxima,
      utilizacaoAtual,
      faturamentoAtual,
      faturamentoMeta,
      ticketMedio,
      pacientesMes,
      numeroCadeiras
    };
  };

  const diagnostico = gerarDiagnostico();

  const gerarRecomendacoesPersonalizadas = () => {
    console.log('Gerando recomendações personalizadas...');
    const recomendacoes = [];
    const canaisAtuais = Array.isArray(clinicaData.canais_atuais) ? clinicaData.canais_atuais : [];
    const ticketMedio = parseFloat(clinicaData.ticket_medio.replace(/[R$.,\s]/g, '')) || 0;
    const pacientesIndicacao = parseInt(clinicaData.pacientes_indicacao_mes) || 0;

    console.log('Dados para recomendações:', {
      canaisAtuais,
      ticketMedio,
      pacientesIndicacao,
      fazMarketingOnline: clinicaData.faz_marketing_online,
      investeTrafego: clinicaData.investe_em_trafego,
      whatsappTreinado: clinicaData.whatsapp_treinado
    });

    // Análise de Marketing Digital baseada nos canais atuais
    if (!canaisAtuais.includes('Instagram') && !canaisAtuais.includes('Facebook')) {
      recomendacoes.push({
        categoria: "Presença Digital",
        prioridade: "Alta",
        acao: "Criar presença nas redes sociais",
        detalhes: `Desenvolver perfis profissionais no Instagram e Facebook focados em ${clinicaData.procedimento_principal.toLowerCase()}. Publicar casos antes/depois, dicas de cuidados bucais e depoimentos de pacientes 3x por semana. Atualmente você não utiliza estas plataformas essenciais.`,
        impactoEstimado: "15-25 novos pacientes/mês"
      });
    }

    if (!canaisAtuais.includes('Google') && clinicaData.faz_marketing_online === 'nao') {
      recomendacoes.push({
        categoria: "Visibilidade Local",
        prioridade: "Alta",
        acao: "Otimizar presença no Google",
        detalhes: `Você ainda não faz marketing online. Configure e otimize Google Meu Negócio, implemente estratégia de SEO local para "${clinicaData.cidade}, ${clinicaData.estado}" e solicite avaliações de pacientes satisfeitos.`,
        impactoEstimado: "20-30 novos pacientes/mês"
      });
    }

    // Análise de Tráfego Pago baseada no investimento atual
    if (clinicaData.investe_em_trafego === 'nao') {
      const investimentoSugerido = Math.max(1500, ticketMedio * 3);
      recomendacoes.push({
        categoria: "Tráfego Pago",
        prioridade: "Média",
        acao: "Implementar campanhas de Google Ads",
        detalhes: `Como você não investe em tráfego pago, comece com investimento de R$ ${investimentoSugerido.toLocaleString()}/mês em campanhas direcionadas para "${clinicaData.procedimento_principal.toLowerCase()}" em ${clinicaData.cidade}. ROI esperado: 3:1 baseado no seu ticket médio de ${clinicaData.ticket_medio}.`,
        impactoEstimado: `${Math.ceil(investimentoSugerido / ticketMedio * 3)} novos pacientes/mês`
      });
    }

    // Análise do Programa de Indicação
    if (clinicaData.tem_programa_indicacao === 'nao' || pacientesIndicacao < 10) {
      const statusIndicacao = clinicaData.tem_programa_indicacao === 'nao' ? 'Você não possui' : 'Seu programa atual gera apenas ' + pacientesIndicacao + ' indicações/mês.';
      recomendacoes.push({
        categoria: "Programa de Indicações",
        prioridade: "Alta",
        acao: "Estruturar sistema de recompensas por indicação",
        detalhes: `${statusIndicacao} um programa estruturado. Crie programa oferecendo desconto de 15% na próxima consulta para quem indicar + brinde para o novo paciente. Com seus ${clinicaData.pacientes_mes} pacientes/mês, o potencial é alto.`,
        impactoEstimado: "10-20 novos pacientes/mês via indicações"
      });
    }

    // Análise de Marketing Offline baseado nas ações atuais
    const acoes_offline = [
      clinicaData.distribui_material === 'sim',
      clinicaData.participa_eventos === 'sim',
      clinicaData.fachada_destacada === 'sim',
      clinicaData.usou_radio_outdoor === 'sim'
    ].filter(Boolean).length;

    if (acoes_offline < 2) {
      const acoesAtuais = [];
      if (clinicaData.distribui_material === 'sim') acoesAtuais.push('material impresso');
      if (clinicaData.participa_eventos === 'sim') acoesAtuais.push('eventos');
      if (clinicaData.fachada_destacada === 'sim') acoesAtuais.push('fachada destacada');
      if (clinicaData.usou_radio_outdoor === 'sim') acoesAtuais.push('rádio/outdoor');
      
      recomendacoes.push({
        categoria: "Marketing Local",
        prioridade: "Média",
        acao: "Implementar estratégias de marketing local",
        detalhes: `Atualmente você utiliza apenas: ${acoesAtuais.join(', ') || 'nenhuma ação offline'}. Participe de feiras de saúde em ${clinicaData.cidade}, desenvolva parcerias com academias e estabelecimentos próximos, crie material educativo para distribuição.`,
        impactoEstimado: "8-15 novos pacientes/mês"
      });
    }

    // Análise de Conversão WhatsApp
    if (clinicaData.whatsapp_treinado === 'nao' || clinicaData.tempo_resposta_whatsapp !== 'imediato') {
      const problemaWhatsapp = clinicaData.whatsapp_treinado === 'nao' ? 
        'Sua equipe não é treinada para conversão' : 
        `Seu tempo de resposta é "${clinicaData.tempo_resposta_whatsapp}" quando deveria ser imediato`;
      
      recomendacoes.push({
        categoria: "Otimização de Conversão",
        prioridade: "Alta",
        acao: "Treinar equipe para conversão via WhatsApp",
        detalhes: `${problemaWhatsapp}. Implemente scripts de atendimento, treinamento em técnicas de conversão e sistema de resposta rápida. Meta: converter 70% dos contatos em agendamentos. Seu telefone: ${clinicaData.telefone}.`,
        impactoEstimado: "Aumento de 30-40% na conversão de leads"
      });
    }

    // Análise de Ticket Médio
    if (ticketMedio < 800) {
      recomendacoes.push({
        categoria: "Aumento do Ticket Médio",
        prioridade: "Média",
        acao: "Desenvolver estratégia de upsell",
        detalhes: `Seu ticket médio atual de ${clinicaData.ticket_medio} está abaixo do potencial. Crie pacotes de tratamento combinados, ofereça procedimentos complementares (${clinicaData.procedimento_principal.toLowerCase()} + clareamento + limpeza), implemente planos de manutenção preventiva. Meta: aumentar para R$ ${(ticketMedio * 1.3).toFixed(0)}.`,
        impactoEstimado: `Aumento de R$ ${((ticketMedio * 0.3) * parseInt(clinicaData.pacientes_mes)).toLocaleString()} no faturamento mensal`
      });
    }

    // Análise de Gestão e Operações
    if (clinicaData.usa_software_gestao === 'nao' || clinicaData.agenda_organizada === 'nao') {
      const problemaGestao = [];
      if (clinicaData.usa_software_gestao === 'nao') problemaGestao.push('não usa software de gestão');
      if (clinicaData.agenda_organizada === 'nao') problemaGestao.push('agenda desorganizada');
      
      recomendacoes.push({
        categoria: "Otimização Operacional",
        prioridade: "Média",
        acao: "Implementar sistema de gestão eficiente",
        detalhes: `Atualmente você tem: ${problemaGestao.join(' e ')}. Com ${clinicaData.numero_cadeiras} cadeiras e ${clinicaData.pacientes_mes} pacientes/mês, adote software de gestão odontológica, otimize agendamento online, implemente lembretes automáticos e follow-up pós-consulta.`,
        impactoEstimado: "Redução de 20% no no-show e aumento na retenção"
      });
    }

    console.log('Recomendações geradas:', recomendacoes);
    return recomendacoes;
  };

  const recomendacoes = gerarRecomendacoesPersonalizadas();

  const gerarPlanoImplementacao = () => {
    const plano = {
      fase1: [],
      fase2: [],
      fase3: []
    };

    // Distribuir recomendações por fases baseado na prioridade
    recomendacoes.forEach(rec => {
      if (rec.prioridade === 'Alta') {
        if (plano.fase1.length < 4) {
          plano.fase1.push(rec.acao);
        } else {
          plano.fase2.push(rec.acao);
        }
      } else {
        if (plano.fase2.length < 4) {
          plano.fase2.push(rec.acao);
        } else {
          plano.fase3.push(rec.acao);
        }
      }
    });

    return plano;
  };

  const planoImplementacao = gerarPlanoImplementacao();

  const downloadPDF = () => {
    const content = `
PLANO ESTRATÉGICO PERSONALIZADO - ${clinicaData.nome_clinica}

=== DIAGNÓSTICO ATUAL ===
• Faturamento atual: ${clinicaData.faturamento_atual}
• Meta de faturamento: ${clinicaData.faturamento_meta}
• Crescimento necessário: ${diagnostico.crescimentoNecessario}%
• Pacientes adicionais necessários: ${diagnostico.pacientesNecessarios}
• Utilização atual da capacidade: ${diagnostico.utilizacaoAtual}%

=== ANÁLISE SITUACIONAL ===
• Procedimento principal: ${clinicaData.procedimento_principal}
• Canais atuais: ${clinicaData.canais_atuais?.join(', ') || 'Não informado'}
• Marketing online: ${clinicaData.faz_marketing_online}
• Tráfego pago: ${clinicaData.investe_em_trafego}
• Programa de indicação: ${clinicaData.tem_programa_indicacao}
• WhatsApp treinado: ${clinicaData.whatsapp_treinado}

=== ESTRATÉGIAS PERSONALIZADAS ===
${recomendacoes.map((rec, index) => `
${index + 1}. ${rec.categoria} (Prioridade ${rec.prioridade})
   Ação: ${rec.acao}
   Detalhes: ${rec.detalhes}
   Impacto Estimado: ${rec.impactoEstimado}
`).join('')}

=== PLANO DE IMPLEMENTAÇÃO 90 DIAS ===
Primeiros 30 dias:
${planoImplementacao.fase1.map(acao => `• ${acao}`).join('\n')}

30-60 dias:
${planoImplementacao.fase2.map(acao => `• ${acao}`).join('\n')}

60-90 dias:
${planoImplementacao.fase3.map(acao => `• ${acao}`).join('\n')}
    `;
    
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
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
            <Link to="/" className="flex items-center hover:opacity-70 transition-colors" style={{ color: '#274587' }}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Início
            </Link>
            <div className="ml-4 text-2xl font-bold" style={{ color: '#274587' }}>
              Diagnóstico Estratégico
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
              Estratégias personalizadas baseadas na análise completa do seu negócio em {clinicaData.cidade}, {clinicaData.estado}
            </p>
          </div>

          {/* Diagnóstico Atual */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Target className="mr-3 h-6 w-6" style={{ color: '#274587' }} />
                Diagnóstico da Situação Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: '#274587' }}>
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
                  <div className="text-sm text-gray-600">Utilização da Capacidade ({clinicaData.numero_cadeiras} cadeiras)</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {diagnostico.pacientesNecessarios}
                  </div>
                  <div className="text-sm text-gray-600">Pacientes Adicionais/Mês</div>
                </div>
              </div>
              
              {/* Informações detalhadas da clínica */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Especialidade:</strong> {clinicaData.procedimento_principal}
                  </div>
                  <div>
                    <strong>Ticket Médio:</strong> {clinicaData.ticket_medio}
                  </div>
                  <div>
                    <strong>Pacientes/Mês:</strong> {clinicaData.pacientes_mes}
                  </div>
                  <div>
                    <strong>Marketing Online:</strong> {clinicaData.faz_marketing_online === 'sim' ? 'Sim' : 'Não'}
                  </div>
                  <div>
                    <strong>Tráfego Pago:</strong> {clinicaData.investe_em_trafego === 'sim' ? 'Sim' : 'Não'}
                  </div>
                  <div>
                    <strong>Programa Indicação:</strong> {clinicaData.tem_programa_indicacao === 'sim' ? 'Sim' : 'Não'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análise de Oportunidades */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <TrendingUp className="mr-3 h-6 w-6 text-green-600" />
                Análise de Oportunidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    Canais de Captação Atuais
                  </h3>
                  <p className="text-blue-800 mb-2">
                    <strong>Utilizando:</strong> {Array.isArray(clinicaData.canais_atuais) && clinicaData.canais_atuais.length > 0 ? clinicaData.canais_atuais.join(', ') : 'Poucos canais identificados'}
                  </p>
                  <p className="text-blue-800">
                    <strong>Oportunidade:</strong> {clinicaData.faz_marketing_online === 'nao' ? 'Expandir para canais digitais pode triplicar' : 'Otimizar canais existentes pode dobrar'} o volume de novos pacientes.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    Potencial de Indicações
                  </h3>
                  <p className="text-green-800 mb-2">
                    <strong>Atual:</strong> {clinicaData.pacientes_indicacao_mes || '0'} pacientes/mês por indicação
                  </p>
                  <p className="text-green-800">
                    <strong>Potencial:</strong> Com {clinicaData.pacientes_mes} pacientes ativos, estruturar programa pode gerar 15-25 indicações mensais.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estratégias Personalizadas */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Zap className="mr-3 h-6 w-6 text-yellow-600" />
                Estratégias Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recomendacoes.map((rec, index) => (
                  <div key={index} className="border-l-4 pl-6 py-4 bg-gray-50 rounded-r-lg" style={{ borderLeftColor: '#274587' }}>
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
                    <h4 className="font-medium mb-2" style={{ color: '#274587' }}>{rec.acao}</h4>
                    <p className="text-gray-700 mb-2">{rec.detalhes}</p>
                    <div className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded inline-block">
                      💡 {rec.impactoEstimado}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plano de Implementação */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Plano de Implementação (90 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    Primeiros 30 dias
                  </h3>
                  <ul className="space-y-2 text-blue-800">
                    {planoImplementacao.fase1.map((acao, index) => (
                      <li key={index}>• {acao}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    30-60 dias
                  </h3>
                  <ul className="space-y-2 text-green-800">
                    {planoImplementacao.fase2.map((acao, index) => (
                      <li key={index}>• {acao}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    60-90 dias
                  </h3>
                  <ul className="space-y-2 text-purple-800">
                    {planoImplementacao.fase3.map((acao, index) => (
                      <li key={index}>• {acao}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download do Plano */}
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Baixar Plano Estratégico Completo
              </h3>
              <p className="text-gray-600 mb-6">
                Receba todas as estratégias personalizadas em um arquivo para implementar em sua clínica.
              </p>
              <Button 
                onClick={downloadPDF}
                className="text-white hover:opacity-90"
                style={{ backgroundColor: '#274587' }}
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Baixar plano estratégico
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-900 text-sm">
              © 2025 Plano Estratégico Personalizado. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resultado;
