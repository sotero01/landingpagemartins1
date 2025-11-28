import logo from "@/assets/logo.jpeg";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img src={logo} alt="Martins Forro PVC" className="h-16 w-auto" />
            <p className="text-primary-foreground/80">
              Especialistas em instalação e manutenção de forros em PVC. 
              Qualidade e profissionalismo em cada projeto.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Instalação de Forro PVC</li>
              <li>Manutenção Especializada</li>
              <li>Pacotes completos</li>
              <li>Orçamento Personalizado</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Tel: (11) 99999-9999</li>
              <li>contato@martinsforropvc.com.br</li>
              <li>Segunda a Sexta: 8h às 18h</li>
              <li>Sábado: 8h às 13h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Martins Forro PVC. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
