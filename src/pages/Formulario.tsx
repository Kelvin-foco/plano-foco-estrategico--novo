import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const Formulario = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome_clinica: '',
    faturamento_atual: '',
    faturamento_meta: '',
    numero_cadeiras: '',
    procedimento_principal: '',
    faz_marketing_online: '',
    canais_atuais: [] as string[],
    investe_em_trafego: '',
    ticket_medio: '',
    pacientes_mes: '',
    distribui_material: '',
    participa_eventos: '',
    fachada_destacada: '',
    usou_radio_outdoor: '',
    tem_programa_indicacao: '',
    pacientes_indicacao_mes: '',
    whatsapp_treinado: '',
    tempo_resposta_whatsapp: '',
    usa_software_gestao: '',
    agenda_organizada: '',
    cidade: '',
    estado: '',
    telefone: '',
    instagram: ''
  });

  const procedimentos = [
    "Limpeza e Profilaxia",
    "Restaurações",
    "Endodontia",
    "Implantes",
    "Ortodontia",
    "Próteses",
    "Cirurgia Oral",
    "Periodontia",
    "Clareamento",
    "Estética Dental"
  ];

  const canaisMarketing = [
    "Instagram",
    "Facebook",
    "Google",
    "WhatsApp",
    "Site próprio",
    "YouTube",
    "TikTok",
    "LinkedIn"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCanaisChange = (canal: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      canais_atuais: checked 
        ? [...prev.canais_atuais, canal]
        : prev.canais_atuais.filter(c => c !== canal)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica dos campos essenciais
    if (!formData.nome_clinica || !formData.cidade || !formData.faturamento_atual || !formData.procedimento_principal) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Salvar TODOS os dados no localStorage para a tela de resultado
      localStorage.setItem('clinicaData', JSON.stringify(formData));
      console.log('Dados completos salvos no localStorage:', formData);

      // Configurações EmailJS
      const SERVICE_ID = 'service_53u6edm';
      const TEMPLATE_ID = 'template_6i8so5r';
      const PUBLIC_KEY = 'AENd6qqqchcIP5Kia';

      // Enviar os campos essenciais incluindo telefone via EmailJS
      const templateParams = {
        nome_clinica: formData.nome_clinica,
        instagram: formData.instagram || 'Não informado',
        cidade: formData.cidade,
        telefone: formData.telefone || 'Não informado',
        faturamento: formData.faturamento_atual,
        procedimentos: formData.procedimento_principal,
        to_email: 'contato@agenciafocomkt.com.br'
      };

      console.log('Enviando dados essenciais via EmailJS:', templateParams);
      
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log('Email enviado com sucesso via EmailJS');
      
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Redirecionando para seu plano estratégico personalizado...",
      });

      setTimeout(() => {
        navigate('/resultado');
      }, 2000);

    } catch (error) {
      console.error('Erro no envio via EmailJS:', error);
      
      toast({
        title: "Erro ao enviar formulário",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Link>
            <div className="ml-4 text-2xl font-bold text-blue-600">
              Foco Marketing
            </div>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vamos conhecer sua clínica
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Responda as perguntas abaixo para recebermos seu plano estratégico personalizado
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                Diagnóstico Estratégico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                
                
                {/* Dados Essenciais */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Informações da Clínica
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nome_clinica">Nome da clínica *</Label>
                      <Input
                        id="nome_clinica"
                        name="nome_clinica"
                        required
                        value={formData.nome_clinica}
                        onChange={(e) => handleInputChange('nome_clinica', e.target.value)}
                        placeholder="Digite o nome da sua clínica"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="instagram">@ do Instagram</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="@suaclinica"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input
                        id="cidade"
                        name="cidade"
                        required
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                        placeholder="Digite sua cidade"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Input
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={(e) => handleInputChange('estado', e.target.value)}
                        placeholder="Digite seu estado"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="numero_cadeiras">Número de cadeiras</Label>
                      <Input
                        id="numero_cadeiras"
                        name="numero_cadeiras"
                        type="number"
                        value={formData.numero_cadeiras}
                        onChange={(e) => handleInputChange('numero_cadeiras', e.target.value)}
                        placeholder="Ex: 3"
                      />
                    </div>
                  </div>
                </div>

                {/* Faturamento */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Faturamento
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="faturamento_atual">Faturamento mensal atual *</Label>
                      <Input
                        id="faturamento_atual"
                        name="faturamento_atual"
                        required
                        value={formData.faturamento_atual}
                        onChange={(e) => handleInputChange('faturamento_atual', e.target.value)}
                        placeholder="Ex: R$ 50.000,00"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="faturamento_meta">Meta de faturamento mensal</Label>
                      <Input
                        id="faturamento_meta"
                        name="faturamento_meta"
                        value={formData.faturamento_meta}
                        onChange={(e) => handleInputChange('faturamento_meta', e.target.value)}
                        placeholder="Ex: R$ 100.000,00"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ticket_medio">Ticket médio por paciente</Label>
                      <Input
                        id="ticket_medio"
                        name="ticket_medio"
                        value={formData.ticket_medio}
                        onChange={(e) => handleInputChange('ticket_medio', e.target.value)}
                        placeholder="Ex: R$ 300,00"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pacientes_mes">Pacientes atendidos por mês</Label>
                      <Input
                        id="pacientes_mes"
                        name="pacientes_mes"
                        type="number"
                        value={formData.pacientes_mes}
                        onChange={(e) => handleInputChange('pacientes_mes', e.target.value)}
                        placeholder="Ex: 150"
                      />
                    </div>
                  </div>
                </div>

                {/* Serviços */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Serviços
                  </h3>
                  
                  <div>
                    <Label htmlFor="procedimento_principal">Procedimento principal *</Label>
                    <Select value={formData.procedimento_principal} onValueChange={(value) => handleInputChange('procedimento_principal', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o procedimento principal" />
                      </SelectTrigger>
                      <SelectContent>
                        {procedimentos.map((proc) => (
                          <SelectItem key={proc} value={proc}>
                            {proc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Marketing Digital */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Marketing Digital
                  </h3>
                  
                  <div>
                    <Label>Faz marketing online atualmente?</Label>
                    <RadioGroup 
                      value={formData.faz_marketing_online} 
                      onValueChange={(value) => handleInputChange('faz_marketing_online', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="marketing_sim" />
                        <Label htmlFor="marketing_sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="marketing_nao" />
                        <Label htmlFor="marketing_nao">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.faz_marketing_online === 'sim' && (
                    <div>
                      <Label>Quais canais utiliza atualmente? (marque todos que se aplicam)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {canaisMarketing.map((canal) => (
                          <div key={canal} className="flex items-center space-x-2">
                            <Checkbox
                              id={canal}
                              checked={formData.canais_atuais.includes(canal)}
                              onCheckedChange={(checked) => handleCanaisChange(canal, checked as boolean)}
                            />
                            <Label htmlFor={canal} className="text-sm">{canal}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Investe em tráfego pago (Google Ads, Facebook Ads)?</Label>
                    <RadioGroup 
                      value={formData.investe_em_trafego} 
                      onValueChange={(value) => handleInputChange('investe_em_trafego', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="trafego_sim" />
                        <Label htmlFor="trafego_sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="trafego_nao" />
                        <Label htmlFor="trafego_nao">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Marketing Offline */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Marketing Offline
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Distribui material impresso (panfletos, folders)?</Label>
                      <RadioGroup 
                        value={formData.distribui_material} 
                        onValueChange={(value) => handleInputChange('distribui_material', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="material_sim" />
                          <Label htmlFor="material_sim">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="material_nao" />
                          <Label htmlFor="material_nao">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Participa de eventos e feiras de saúde?</Label>
                      <RadioGroup 
                        value={formData.participa_eventos} 
                        onValueChange={(value) => handleInputChange('participa_eventos', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="eventos_sim" />
                          <Label htmlFor="eventos_sim">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="eventos_nao" />
                          <Label htmlFor="eventos_nao">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>A fachada da clínica é destacada e atrativa?</Label>
                      <RadioGroup 
                        value={formData.fachada_destacada} 
                        onValueChange={(value) => handleInputChange('fachada_destacada', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="fachada_sim" />
                          <Label htmlFor="fachada_sim">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="fachada_nao" />
                          <Label htmlFor="fachada_nao">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Já usou rádio ou outdoor?</Label>
                      <RadioGroup 
                        value={formData.usou_radio_outdoor} 
                        onValueChange={(value) => handleInputChange('usou_radio_outdoor', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="radio_sim" />
                          <Label htmlFor="radio_sim">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="radio_nao" />
                          <Label htmlFor="radio_nao">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Programa de Indicações */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Programa de Indicações
                  </h3>
                  
                  <div>
                    <Label>Tem programa estruturado de indicações?</Label>
                    <RadioGroup 
                      value={formData.tem_programa_indicacao} 
                      onValueChange={(value) => handleInputChange('tem_programa_indicacao', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="indicacao_sim" />
                        <Label htmlFor="indicacao_sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="indicacao_nao" />
                        <Label htmlFor="indicacao_nao">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="pacientes_indicacao_mes">Quantos pacientes chegam por indicação por mês?</Label>
                    <Input
                      id="pacientes_indicacao_mes"
                      name="pacientes_indicacao_mes"
                      type="number"
                      value={formData.pacientes_indicacao_mes}
                      onChange={(e) => handleInputChange('pacientes_indicacao_mes', e.target.value)}
                      placeholder="Ex: 20"
                    />
                  </div>
                </div>

                {/* Atendimento e Conversão */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Atendimento e Conversão
                  </h3>
                  
                  <div>
                    <Label>A equipe é treinada para conversão via WhatsApp?</Label>
                    <RadioGroup 
                      value={formData.whatsapp_treinado} 
                      onValueChange={(value) => handleInputChange('whatsapp_treinado', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="whatsapp_sim" />
                        <Label htmlFor="whatsapp_sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="whatsapp_nao" />
                        <Label htmlFor="whatsapp_nao">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Tempo de resposta no WhatsApp:</Label>
                    <Select value={formData.tempo_resposta_whatsapp} onValueChange={(value) => handleInputChange('tempo_resposta_whatsapp', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tempo de resposta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imediato">Imediato (até 5 minutos)</SelectItem>
                        <SelectItem value="rapido">Rápido (até 1 hora)</SelectItem>
                        <SelectItem value="moderado">Moderado (até 4 horas)</SelectItem>
                        <SelectItem value="lento">Lento (mais de 4 horas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Gestão e Operações */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Gestão e Operações
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Usa software de gestão odontológica?</Label>
                      <RadioGroup 
                        value={formData.usa_software_gestao} 
                        onValueChange={(value) => handleInputChange('usa_software_gestao', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="software_sim" />
                          <Label htmlFor="software_sim">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="software_nao" />
                          <Label htmlFor="software_nao">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>A agenda está bem organizada e otimizada?</Label>
                      <RadioGroup 
                        value={formData.agenda_organizada} 
                        onValueChange={(value) => handleInputChange('agenda_organizada', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="agenda_sim" />
                          <Label htmlFor="agenda_sim">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="agenda_nao" />
                          <Label htmlFor="agenda_nao">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>Gerando seu plano...</>
                    ) : (
                      <>
                        Gerar meu plano estratégico
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

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

export default Formulario;
