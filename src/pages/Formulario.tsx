
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const Formulario = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome_clinica: '',
    instagram: '',
    cidade: '',
    estado: '',
    numero_cadeiras: '',
    faturamento_atual: '',
    faturamento_meta: 'R$ 100.000,00',
    procedimento_principal: '',
    faz_marketing_online: '',
    canais_atuais: [] as string[],
    investe_em_trafego: '',
    ticket_medio: '',
    pacientes_mes: '',
    telefone: '',
    // Ações de Marketing Offline
    distribui_material: '',
    participa_eventos: '',
    fachada_destacada: '',
    usou_radio_outdoor: '',
    // Programa de Indicação
    tem_programa_indicacao: '',
    pacientes_indicacao_mes: '',
    // WhatsApp e Processos de Vendas
    whatsapp_treinado: '',
    tempo_resposta_whatsapp: '',
    // Gestão
    usa_software_gestao: '',
    agenda_organizada: ''
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

  const canaisDisponiveis = [
    "Instagram",
    "Google",
    "Indicação",
    "WhatsApp",
    "Tráfego Pago",
    "Facebook",
    "Site/Blog",
    "Outros"
  ];

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (canal: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      canais_atuais: checked 
        ? [...prev.canais_atuais, canal]
        : prev.canais_atuais.filter(c => c !== canal)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Salvar dados no localStorage ANTES do envio do email
      localStorage.setItem('clinicaData', JSON.stringify(formData));
      console.log('Dados salvos no localStorage:', formData);

      // Configuração EmailJS
      const SERVICE_ID = 'service_xxxxxxxxx'; // Substitua pelo seu Service ID
      const TEMPLATE_ID = 'template_xxxxxxxxx'; // Substitua pelo seu Template ID  
      const PUBLIC_KEY = 'xxxxxxxxxxxxxxxxx'; // Substitua pela sua Public Key

      // Enviar via EmailJS
      if (formRef.current) {
        console.log('Enviando formulário via EmailJS...');
        
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          formRef.current,
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

      } else {
        throw new Error('Referência do formulário não encontrada');
      }

    } catch (error) {
      console.error('Erro no envio via EmailJS:', error);
      
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente em alguns instantes.",
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Dados Básicos */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Dados Básicos
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
                      <Label htmlFor="instagram">Instagram da clínica</Label>
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
                      <Label htmlFor="estado">Estado *</Label>
                      <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {estados.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="estado" value={formData.estado} />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>

                {/* Dados Operacionais */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Dados Operacionais
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="numero_cadeiras">Número de cadeiras odontológicas *</Label>
                      <Input
                        id="numero_cadeiras"
                        name="numero_cadeiras"
                        type="number"
                        required
                        value={formData.numero_cadeiras}
                        onChange={(e) => handleInputChange('numero_cadeiras', e.target.value)}
                        placeholder="Ex: 3"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="procedimento_principal">Procedimento mais realizado *</Label>
                      <Select value={formData.procedimento_principal} onValueChange={(value) => handleInputChange('procedimento_principal', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o procedimento" />
                        </SelectTrigger>
                        <SelectContent>
                          {procedimentos.map((proc) => (
                            <SelectItem key={proc} value={proc}>
                              {proc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="procedimento_principal" value={formData.procedimento_principal} />
                    </div>
                    
                    <div>
                      <Label htmlFor="faturamento_atual">Faturamento atual mensal *</Label>
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
                      <Label htmlFor="faturamento_meta">Meta de faturamento *</Label>
                      <Input
                        id="faturamento_meta"
                        name="faturamento_meta"
                        required
                        value={formData.faturamento_meta}
                        onChange={(e) => handleInputChange('faturamento_meta', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ticket_medio">Ticket médio dos procedimentos *</Label>
                      <Input
                        id="ticket_medio"
                        name="ticket_medio"
                        required
                        value={formData.ticket_medio}
                        onChange={(e) => handleInputChange('ticket_medio', e.target.value)}
                        placeholder="Ex: R$ 500,00"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pacientes_mes">Número médio de pacientes/mês *</Label>
                      <Input
                        id="pacientes_mes"
                        name="pacientes_mes"
                        type="number"
                        required
                        value={formData.pacientes_mes}
                        onChange={(e) => handleInputChange('pacientes_mes', e.target.value)}
                        placeholder="Ex: 100"
                      />
                    </div>
                  </div>
                </div>

                {/* Marketing e Captação */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Marketing e Captação
                  </h3>
                  
                  <div>
                    <Label>Já faz marketing online? *</Label>
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
                    <input type="hidden" name="faz_marketing_online" value={formData.faz_marketing_online} />
                  </div>
                  
                  <div>
                    <Label>Quais canais de captação utiliza atualmente?</Label>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {canaisDisponiveis.map((canal) => (
                        <div key={canal} className="flex items-center space-x-2">
                          <Checkbox
                            id={canal}
                            checked={formData.canais_atuais.includes(canal)}
                            onCheckedChange={(checked) => handleCheckboxChange(canal, checked as boolean)}
                          />
                          <Label htmlFor={canal} className="text-sm">{canal}</Label>
                        </div>
                      ))}
                    </div>
                    <input type="hidden" name="canais_atuais" value={formData.canais_atuais.join(', ')} />
                  </div>
                  
                  <div>
                    <Label>Investe em tráfego pago? *</Label>
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
                    <input type="hidden" name="investe_em_trafego" value={formData.investe_em_trafego} />
                  </div>
                </div>

                {/* Ações de Marketing Offline */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Ações de Marketing Offline
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Distribui material impresso ou panfletos? *</Label>
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
                      <input type="hidden" name="distribui_material" value={formData.distribui_material} />
                    </div>
                    
                    <div>
                      <Label>Participa de eventos locais relacionados à saúde? *</Label>
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
                      <input type="hidden" name="participa_eventos" value={formData.participa_eventos} />
                    </div>
                    
                    <div>
                      <Label>Sua clínica tem fachada destacada ou iluminação LED? *</Label>
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
                      <input type="hidden" name="fachada_destacada" value={formData.fachada_destacada} />
                    </div>
                    
                    <div>
                      <Label>Já utilizou publicidade em rádio ou outdoor? *</Label>
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
                      <input type="hidden" name="usou_radio_outdoor" value={formData.usou_radio_outdoor} />
                    </div>
                  </div>
                </div>

                {/* Programa de Indicação */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Programa de Indicação
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Possui programa de indicação para pacientes? *</Label>
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
                      <input type="hidden" name="tem_programa_indicacao" value={formData.tem_programa_indicacao} />
                    </div>
                    
                    <div>
                      <Label htmlFor="pacientes_indicacao_mes">Aprox. quantos pacientes chegam por indicação mensalmente?</Label>
                      <Input
                        id="pacientes_indicacao_mes"
                        name="pacientes_indicacao_mes"
                        type="number"
                        value={formData.pacientes_indicacao_mes}
                        onChange={(e) => handleInputChange('pacientes_indicacao_mes', e.target.value)}
                        placeholder="Ex: 15"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp e Processos de Vendas */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    WhatsApp e Processos de Vendas
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Sua equipe de WhatsApp é treinada para conversão? *</Label>
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
                      <input type="hidden" name="whatsapp_treinado" value={formData.whatsapp_treinado} />
                    </div>
                    
                    <div>
                      <Label htmlFor="tempo_resposta_whatsapp">Qual o tempo médio de resposta no WhatsApp? *</Label>
                      <Select value={formData.tempo_resposta_whatsapp} onValueChange={(value) => handleInputChange('tempo_resposta_whatsapp', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tempo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imediato">Imediato</SelectItem>
                          <SelectItem value="ate_1h">Até 1 hora</SelectItem>
                          <SelectItem value="mais_1h">Mais de 1 hora</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="tempo_resposta_whatsapp" value={formData.tempo_resposta_whatsapp} />
                    </div>
                  </div>
                </div>

                {/* Gestão */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Gestão
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Utiliza software de gestão da clínica? *</Label>
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
                      <input type="hidden" name="usa_software_gestao" value={formData.usa_software_gestao} />
                    </div>
                    
                    <div>
                      <Label>Sua agenda de atendimentos é bem estruturada e organizada? *</Label>
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
                      <input type="hidden" name="agenda_organizada" value={formData.agenda_organizada} />
                    </div>
                  </div>
                </div>

                {/* Campo oculto com email de destino */}
                <input type="hidden" name="to_email" value="contato@agenciafocomkt.com.br" />

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
