import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, MapPin } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(255).optional().or(z.literal("")),
  serviceType: z.string().min(1, "Selecione um tipo de serviço"),
  message: z.string().trim().max(1000).optional().or(z.literal(""))
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar dados
      const validatedData = contactSchema.parse(formData);

      // Salvar no banco de dados
      const { error } = await supabase.from("service_requests").insert([
        {
          name: validatedData.name,
          phone: validatedData.phone,
          email: validatedData.email || null,
          service_type: validatedData.serviceType,
          message: validatedData.message || null
        }
      ]);

      if (error) throw error;

      toast({
        title: "Solicitação enviada!",
        description: "Você será redirecionado para o WhatsApp.",
      });

      // Redirecionar para WhatsApp
      const whatsappMessage = encodeURIComponent(
        `Olá! Meu nome é ${validatedData.name}.\n` +
        `Gostaria de solicitar: ${validatedData.serviceType}\n` +
        `Telefone: ${validatedData.phone}` +
        (validatedData.message ? `\nMensagem: ${validatedData.message}` : "")
      );
      
      const whatsappNumber = "5585997370419";
      window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`, "_blank");

      // Limpar formulário
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceType: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente mais tarde.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Solicite Seu Orçamento
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entre em contato conosco e transforme seu ambiente com qualidade profissional
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="animate-fade-in border-2 border-border hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Preencha o Formulário</CardTitle>
              <CardDescription>
                Seus dados serão salvos com segurança e você será redirecionado ao WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
  <Label htmlFor="service">Tipos de serviços *</Label>
  <Select
    value={formData.serviceType}
    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
    // REMOVIDO required para evitar crash no Chrome
  >
    <SelectTrigger id="service">
      <SelectValue placeholder="Selecione um serviço" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Instalação de Forro PVC">Instalação de Forro PVC</SelectItem>
      <SelectItem value="Manutenção de Forro">Manutenção de Forro</SelectItem>
      <SelectItem value="Pacote Completo">Pacotes completos</SelectItem>
      <SelectItem value="Orçamento Personalizado">Orçamento Personalizado</SelectItem>
    </SelectContent>
  </Select>
</div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem.</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Conte-nos mais sobre seu projeto..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-light text-primary-foreground shadow-elegant"
                  size="lg"
                >
                  {isSubmitting ? "Enviando..." : "Enviar e Continuar no WhatsApp"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Telefone/WhatsApp</h3>
                    <p className="text-muted-foreground">(85) 99737-0419</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">E-mail</h3>
                    <p className="text-muted-foreground">contato@martinsforropvc.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Atendimento</h3>
                    <p className="text-muted-foreground">
                      Atendemos toda a região metropolitana<br />
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 13h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Por Que Nos Escolher?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Mais de 10 anos de experiência</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Equipe qualificada e certificada</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Materiais de primeira qualidade</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Garantia em todos os serviços</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Atendimento personalizado</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
