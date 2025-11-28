import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, HardHat, Package } from "lucide-react";
import serviceInstall from "@/assets/service-install.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import servicePackage from "@/assets/service-package.jpg";

const services = [
  {
    icon: HardHat,
    title: "Instalação Profissional",
    description: "Instalação completa de forro em PVC com acabamento perfeito e garantia de qualidade.",
    image: serviceInstall,
    features: [
      "Medição e planejamento precisos",
      "Materiais de primeira qualidade",
      "Equipe especializada e treinada",
      "Instalação rápida e limpa",
      "Garantia de 2 anos"
    ]
  },
  {
    icon: Wrench,
    title: "Manutenção Especializada",
    description: "Serviço completo de manutenção preventiva e corretiva para seu forro PVC.",
    image: serviceMaintenance,
    features: [
      "Inspeção técnica detalhada",
      "Limpeza e conservação",
      "Troca de placas danificadas",
      "Reparo de estruturas",
      "Manutenção preventiva periódica"
    ]
  },
  {
    icon: Package,
    title: "Pacotes Personalizados",
    description: "Pacotes sob medida que combinam instalação, manutenção e suporte contínuo.",
    image: servicePackage,
    features: [
      "Orçamento personalizado",
      "Flexibilidade de pagamento",
      "Manutenção incluída",
      "Suporte prioritário",
      "Descontos especiais"
    ]
  }
];

export const Services = () => {
  return (
    <section id="servicos" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em forro PVC para residências e empresas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 border-border hover:border-primary bg-card animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
