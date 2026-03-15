import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/planos.css";
import medicaHero from "../img/medica-hero.png"; 

export default function Planos() {
  // Dados extraídos fielmente da sua imagem
  const planosData = [
    { id: 1, nome: "Pacote 50", preco: "25,00", qtd: 50, valorUnit: "0,50" },
    { id: 2, nome: "Pacote 100", preco: "48,00", qtd: 100, valorUnit: "0,48" },
    { id: 3, nome: "Pacote 200", preco: "90,00", qtd: 200, valorUnit: "0,45" },
    { id: 4, nome: "Pacote 300", preco: "129,00", qtd: 300, valorUnit: "0,43" },
  ];

  return (
    <>
      <Navbar />
      <main className="container-planos">
        
        <section className="hero-planos">
          <div className="lado-imagem-hero">
            <img src={medicaHero} alt="Ilustração médica" className="imagem-hero-completa" />
          </div>
          <div className="lado-texto-hero">
            <h1>
              Somos uma plataforma de inteligência artificial que auxilia médicos nas melhores decisões diagnósticas.
            </h1>
          </div>
        </section>

        <section className="secao-planos">
          <h2>Escolha o plano ideal para você</h2>
          <p>Diagnósticos inteligentes com a melhor qualidade do Brasil</p>

          <div className="grade-planos">
            {planosData.map((plano) => (
              <div key={plano.id} className="cartao-plano">
                <h3>{plano.nome}</h3>

                <div className="preco-plano">
                  <span className="moeda">R$</span>
                  <span className="valor">{plano.preco}</span>
                  <span className="periodo">/mês</span>
                </div>
                
                <div className="selo-plano">
                  <strong>{plano.qtd}</strong>
                  <span>Consultas</span>
                </div>

                <ul className="lista-beneficios">
                  {/* Adicionado o ✔ conforme solicitado */}
                  <li><span>✔</span> Valor R$ {plano.valorUnit} / consulta</li>
                  <li><span>✔</span> Diagnóstico IA</li>
                  <li><span>✔</span> Suporte Especializado</li>
                  <li><span>✔</span> Relatórios Detalhados</li>
                </ul>

                <button className="botao-contratar">Contratar Agora</button>
              </div>
            ))}
          </div>
        </section>

        <section className="secao-escolher">
          <h2>Por que Escolher o Dr.Algnóstico?</h2>
          <p>Mais do que conexão, oferecemos uma experiência completa com a melhor tecnologia.</p>

          <div className="grade-recursos">
            <div className="item-recurso">
              <div className="icone-headset"></div>
              <h4>Suporte Humanizado</h4>
              <p>Equipe de especialistas disponível todos os dias para resolver qualquer problema técnico rapidamente.</p>
            </div>
            <div className="item-recurso">
              <div className="icone-headset"></div>
              <h4>Precisão Algorítmica</h4>
              <p>Nossa IA utiliza os protocolos mais recentes para garantir segurança no suporte à decisão médica.</p>
            </div>
            <div className="item-recurso">
              <div className="icone-headset"></div>
              <h4>Flexibilidade Total</h4>
              <p>Sem fidelidade abusiva. Você escolhe o pacote que melhor se adapta ao volume da sua clínica.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}