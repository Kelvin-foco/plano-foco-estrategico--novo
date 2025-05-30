import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    instagram: '',
    cidade: '',
    faturamento_atual: '',
    procedimento_principal: ''
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
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
      // Salvar dados no localStorage
      localStorage.setItem('clinicaData', JSON.stringify(formData));
      console.log('Dados salvos no localStorage:', formData);

      // Configurações EmailJS - VALORES REAIS
      const SERVICE_ID = 'service_53u6edm';
      const TEMPLATE_ID = 'template_6i8so5r';
      const PUBLIC_KEY = 'AENd6qqqchcIP5Kia';

      // Preparar dados para envio
      const templateParams = {
        nome_clinica: formData.nome_clinica,
        instagram: formData.instagram || 'Não informado',
        cidade: formData.cidade,
        faturamento: formData.faturamento_atual,
        procedimentos: formData.procedimento_principal,
        to_email: 'contato@agenciafocomkt.com.br'
      };

      console.log('Enviando dados via EmailJS:', templateParams);
      
      // Enviar via EmailJS usando o método send
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
                      <Label htmlFor="faturamento_atual">Faturamento mensal *</Label>
                      <Input
                        id="faturamento_atual"
                        name="faturamento_atual"
                        required
                        value={formData.faturamento_atual}
                        onChange={(e) => handleInputChange('faturamento_atual', e.target.value)}
                        placeholder="Ex: R$ 50.000,00"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="procedimento_principal">Procedimentos realizados *</Label>
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
