import { CheckCircle2 } from "lucide-react";

export const About = () => {
  const benefits = [
    {
      title: "Durabilidade Excepcional",
      description: "Forros PVC duram décadas sem perder qualidade, resistindo à umidade e não racham."
    },
    {
      title: "Manutenção Simples",
      description: "Fácil limpeza com pano úmido. Material não acumula pó e mantém aparência nova por anos."
    },
    {
      title: "Instalação Rápida",
      description: "Processo limpo e ágil que não gera entulho significativo, minimizando transtornos."
    },
    {
      title: "Custo-Benefício",
      description: "Investimento acessível com excelente retorno em durabilidade e economia com manutenção."
    },
    {
      title: "Isolamento Térmico",
      description: "Reduz temperatura interna em até 5°C, proporcionando mais conforto e economia de energia."
    },
    {
      title: "Variedade de Designs",
      description: "Ampla gama de cores, texturas e acabamentos para harmonizar com qualquer decoração."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Por Que Escolher Forro PVC?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O forro em PVC é a solução moderna para quem busca qualidade, durabilidade 
              e praticidade na construção ou reforma de ambientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-lg bg-card border-2 border-border hover:border-primary hover:shadow-elegant transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border-l-4 border-primary p-8 rounded-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Instalação e Manutenção Profissional
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Nossa equipe especializada garante uma <strong>instalação impecável</strong>, 
                desde o planejamento até o acabamento final. Utilizamos técnicas avançadas 
                e materiais de primeira linha para assegurar a perfeição em cada detalhe.
              </p>
              <p>
                A <strong>manutenção regular</strong> é essencial para preservar a beleza 
                e funcionalidade do seu forro. Oferecemos serviços preventivos que incluem 
                inspeção, limpeza profunda e pequenos reparos, garantindo a longevidade 
                do investimento.
              </p>
              <p>
                Com anos de experiência no mercado, a <strong>Martins Forro PVC</strong> se 
                destaca pela qualidade do serviço, pontualidade e compromisso com a 
                satisfação do cliente. Cada projeto é tratado com atenção exclusiva, 
                independente do tamanho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
