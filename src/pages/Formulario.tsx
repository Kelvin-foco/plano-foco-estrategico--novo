
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import emailjs from 'emailjs-com';
import { useToast } from "@/hooks/use-toast";

interface FormData {
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

const Formulario = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [canaisAtuais, setCanaisAtuais] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(numbers) || 0);
    return formatted;
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const formatted = formatCurrency(e.target.value);
    setValue(fieldName, formatted);
  };

  const handleCanalChange = (canal: string, checked: boolean) => {
    let novosCanais;
    if (checked) {
      novosCanais = [...canaisAtuais, canal];
    } else {
      novosCanais = canaisAtuais.filter(c => c !== canal);
    }
    setCanaisAtuais(novosCanais);
    setValue('canais_atuais', novosCanais);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    console.log('Dados do formulário:', data);
    
    // Salvar dados no localStorage
    localStorage.setItem('clinicaData', JSON.stringify(data));
    
    // Preparar dados para envio por email
    const emailData = {
      nome_clinica: data.nome_clinica,
      faturamento_atual: data.faturamento_atual,
      faturamento_meta: data.faturamento_meta,
      numero_cadeiras: data.numero_cadeiras,
      procedimento_principal: data.procedimento_principal,
      faz_marketing_online: data.faz_marketing_online === 'sim' ? 'Sim' : 'Não',
      canais_atuais: data.canais_atuais?.join(', ') || 'Nenhum',
      investe_em_trafego: data.investe_em_trafego === 'sim' ? 'Sim' : 'Não',
      ticket_medio: data.ticket_medio,
      pacientes_mes: data.pacientes_mes,
      distribui_material: data.distribui_material === 'sim' ? 'Sim' : 'Não',
      participa_eventos: data.participa_eventos === 'sim' ? 'Sim' : 'Não',
      fachada_destacada: data.fachada_destacada === 'sim' ? 'Sim' : 'Não',
      usou_radio_outdoor: data.usou_radio_outdoor === 'sim' ? 'Sim' : 'Não',
      tem_programa_indicacao: data.tem_programa_indicacao === 'sim' ? 'Sim' : 'Não',
      pacientes_indicacao_mes: data.pacientes_indicacao_mes || 'Não informado',
      whatsapp_treinado: data.whatsapp_treinado === 'sim' ? 'Sim' : 'Não',
      tempo_resposta_whatsapp: data.tempo_resposta_whatsapp,
      usa_software_gestao: data.usa_software_gestao === 'sim' ? 'Sim' : 'Não',
      agenda_organizada: data.agenda_organizada === 'sim' ? 'Sim' : 'Não',
      cidade: data.cidade,
      estado: data.estado,
      telefone: data.telefone,
      instagram: data.instagram || 'Não informado'
    };

    try {
      console.log('Enviando email com dados:', emailData);
      
      const result = await emailjs.send(
        'service_aykfj2g',
        'template_gtkqhel',
        emailData,
        'yVbA8gOTXqIEDrAv_'
      );
      
      console.log('Email enviado com sucesso:', result);
      
      toast({
        title: "Diagnóstico enviado!",
        description: "Seus dados foram enviados com sucesso. Redirecionando para o resultado...",
      });
      
      // Redirecionar para a página de resultado após 2 segundos
      setTimeout(() => {
        navigate('/resultado');
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      
      toast({
        title: "Erro ao enviar",
        description: "Houve um problema ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nome_clinica">Nome da Clínica *</Label>
        <Input
          id="nome_clinica"
          {...register("nome_clinica", { required: "Nome da clínica é obrigatório" })}
          placeholder="Ex: Clínica Odontológica Dr. Silva"
        />
        {errors.nome_clinica && <p className="text-red-500 text-sm mt-1">{errors.nome_clinica.message}</p>}
      </div>

      <div>
        <Label htmlFor="faturamento_atual">Faturamento Atual Mensal *</Label>
        <Input
          id="faturamento_atual"
          {...register("faturamento_atual", { required: "Faturamento atual é obrigatório" })}
          placeholder="Ex: R$ 50.000"
          onChange={(e) => handleCurrencyChange(e, 'faturamento_atual')}
        />
        {errors.faturamento_atual && <p className="text-red-500 text-sm mt-1">{errors.faturamento_atual.message}</p>}
      </div>

      <div>
        <Label htmlFor="faturamento_meta">Meta de Faturamento Mensal *</Label>
        <Input
          id="faturamento_meta"
          {...register("faturamento_meta", { required: "Meta de faturamento é obrigatória" })}
          placeholder="Ex: R$ 100.000"
          onChange={(e) => handleCurrencyChange(e, 'faturamento_meta')}
        />
        {errors.faturamento_meta && <p className="text-red-500 text-sm mt-1">{errors.faturamento_meta.message}</p>}
      </div>

      <div>
        <Label htmlFor="numero_cadeiras">Número de Cadeiras *</Label>
        <Select onValueChange={(value) => setValue('numero_cadeiras', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 cadeira</SelectItem>
            <SelectItem value="2">2 cadeiras</SelectItem>
            <SelectItem value="3">3 cadeiras</SelectItem>
            <SelectItem value="4">4 cadeiras</SelectItem>
            <SelectItem value="5">5 cadeiras</SelectItem>
            <SelectItem value="6+">6 ou mais cadeiras</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="procedimento_principal">Procedimento Principal *</Label>
        <Select onValueChange={(value) => setValue('procedimento_principal', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Clínica Geral">Clínica Geral</SelectItem>
            <SelectItem value="Ortodontia">Ortodontia</SelectItem>
            <SelectItem value="Implantodontia">Implantodontia</SelectItem>
            <SelectItem value="Endodontia">Endodontia</SelectItem>
            <SelectItem value="Periodontia">Periodontia</SelectItem>
            <SelectItem value="Prótese">Prótese</SelectItem>
            <SelectItem value="Odontopediatria">Odontopediatria</SelectItem>
            <SelectItem value="Cirurgia">Cirurgia</SelectItem>
            <SelectItem value="Estética">Estética</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label>Você faz marketing online atualmente? *</Label>
        <Select onValueChange={(value) => setValue('faz_marketing_online', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Quais canais você utiliza atualmente? (marque todos que se aplicam)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['Instagram', 'Facebook', 'Google', 'WhatsApp', 'Site próprio', 'Indicações'].map((canal) => (
            <div key={canal} className="flex items-center space-x-2">
              <Checkbox
                id={canal}
                checked={canaisAtuais.includes(canal)}
                onCheckedChange={(checked) => handleCanalChange(canal, checked as boolean)}
              />
              <Label htmlFor={canal} className="text-sm">{canal}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Você investe em tráfego pago (Google Ads, Facebook Ads)? *</Label>
        <Select onValueChange={(value) => setValue('investe_em_trafego', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="ticket_medio">Ticket Médio por Paciente *</Label>
        <Input
          id="ticket_medio"
          {...register("ticket_medio", { required: "Ticket médio é obrigatório" })}
          placeholder="Ex: R$ 800"
          onChange={(e) => handleCurrencyChange(e, 'ticket_medio')}
        />
        {errors.ticket_medio && <p className="text-red-500 text-sm mt-1">{errors.ticket_medio.message}</p>}
      </div>

      <div>
        <Label htmlFor="pacientes_mes">Quantos pacientes novos você atende por mês? *</Label>
        <Input
          id="pacientes_mes"
          type="number"
          {...register("pacientes_mes", { required: "Número de pacientes é obrigatório" })}
          placeholder="Ex: 50"
        />
        {errors.pacientes_mes && <p className="text-red-500 text-sm mt-1">{errors.pacientes_mes.message}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <Label>Você distribui material educativo/promocional? *</Label>
        <Select onValueChange={(value) => setValue('distribui_material', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Participa de eventos/feiras de saúde? *</Label>
        <Select onValueChange={(value) => setValue('participa_eventos', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sua fachada é destacada/chamativa? *</Label>
        <Select onValueChange={(value) => setValue('fachada_destacada', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Já usou rádio/outdoor/mídia impressa? *</Label>
        <Select onValueChange={(value) => setValue('usou_radio_outdoor', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Tem programa de indicação estruturado? *</Label>
        <Select onValueChange={(value) => setValue('tem_programa_indicacao', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {watch('tem_programa_indicacao') === 'sim' && (
        <div>
          <Label htmlFor="pacientes_indicacao_mes">Quantos pacientes chegam por indicação por mês?</Label>
          <Input
            id="pacientes_indicacao_mes"
            type="number"
            {...register("pacientes_indicacao_mes")}
            placeholder="Ex: 10"
          />
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div>
        <Label>Sua equipe é treinada para conversão via WhatsApp? *</Label>
        <Select onValueChange={(value) => setValue('whatsapp_treinado', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Qual o tempo de resposta no WhatsApp? *</Label>
        <Select onValueChange={(value) => setValue('tempo_resposta_whatsapp', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="imediato">Imediato (até 5 minutos)</SelectItem>
            <SelectItem value="rapido">Rápido (até 30 minutos)</SelectItem>
            <SelectItem value="moderado">Moderado (até 2 horas)</SelectItem>
            <SelectItem value="lento">Lento (mais de 2 horas)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Usa software de gestão odontológica? *</Label>
        <Select onValueChange={(value) => setValue('usa_software_gestao', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sua agenda está bem organizada? *</Label>
        <Select onValueChange={(value) => setValue('agenda_organizada', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">Sim</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="cidade">Cidade *</Label>
        <Input
          id="cidade"
          {...register("cidade", { required: "Cidade é obrigatória" })}
          placeholder="Ex: São Paulo"
        />
        {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>}
      </div>

      <div>
        <Label htmlFor="estado">Estado *</Label>
        <Input
          id="estado"
          {...register("estado", { required: "Estado é obrigatório" })}
          placeholder="Ex: SP"
        />
        {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>}
      </div>

      <div>
        <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
        <Input
          id="telefone"
          {...register("telefone", { required: "Telefone é obrigatório" })}
          placeholder="(11) 99999-9999"
        />
        {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
      </div>

      <div>
        <Label htmlFor="instagram">Instagram da clínica (opcional)</Label>
        <Input
          id="instagram"
          {...register("instagram")}
          placeholder="@clinica_exemplo"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center hover:opacity-70 transition-colors" style={{ color: '#274587' }}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Link>
            <div className="flex items-center">
              <img alt="Foco Marketing" src="/lovable-uploads/7e12ad46-c4fb-42e5-a133-7e480388984d.png" className="h-12" />
            </div>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Diagnóstico Estratégico Gratuito
            </h1>
            <p className="text-xl text-gray-600">
              Responda algumas perguntas para receber seu plano personalizado
            </p>
            <div className="mt-4">
              <div className="text-sm text-gray-500">
                Etapa {currentStep} de 4
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: '#274587',
                    width: `${(currentStep / 4) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                {currentStep === 1 && "Informações Básicas da Clínica"}
                {currentStep === 2 && "Marketing Digital e Captação"}
                {currentStep === 3 && "Marketing Tradicional e Indicações"}
                {currentStep === 4 && "Operações e Contato"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="px-6"
                    >
                      Anterior
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="text-white hover:opacity-90 px-6"
                        style={{ backgroundColor: '#274587' }}
                      >
                        Próximo
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white hover:opacity-90 px-8"
                        style={{ backgroundColor: '#274587' }}
                      >
                        {isSubmitting ? 'Enviando...' : 'Gerar meu plano estratégico'}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Left Section */}
            <div>
              <div className="mb-4">
                <img alt="Foco Marketing" className="h-20" src="/lovable-uploads/70824f60-9d6d-4c7c-9eaf-86f5700bab89.png" />
              </div>
              <p className="text-gray-600">
                Especialistas em marketing digital para clínicas odontológicas.
              </p>
            </div>
            
            {/* Center Section */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Links importantes</h4>
              <div className="space-y-2">
                <Link to="/politica-privacidade" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Política de Privacidade
                </Link>
                <Link to="/termos-uso" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Termos de Uso
                </Link>
              </div>
            </div>
            
            {/* Right Section */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contato@agenciafocomkt.com.br</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="https://wa.me/5538988180075" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    (38) 98818-0075
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2025 Formulário de Diagnóstico. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Formulario;
