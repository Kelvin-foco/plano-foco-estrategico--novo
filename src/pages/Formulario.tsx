
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import { toast } from "@/hooks/use-toast";

const Formulario = () => {
  const navigate = useNavigate();
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
    telefone: ''
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
      // Prepare data for EmailJS
      const emailData = {
        ...formData,
        canais_atuais: formData.canais_atuais.join(', ')
      };

      // Send email using EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        emailData,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      toast({
        title: "Formulário enviado com sucesso!",
        description: "Redirecionando para seu plano estratégico personalizado...",
      });

      // Store form data for results page
      localStorage.setItem('clinicaData', JSON.stringify(formData));
      
      setTimeout(() => {
        navigate('/resultado');
      }, 2000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
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
              <form onSubmit={handleSubmit} className="space-y-8">
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

                {/* Marketing */}
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
    </div>
  );
};

export default Formulario;
