import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import "../styles/somos.css";


import acertosSrc from "../img/acertos.png";
import precisaoSrc from "../img/precisao.png";
import clarezaSrc from "../img/clareza.png";
import logoSrc from "../img/logo.png";
import tempoSrc from "../img/tempo.png";
import phone from "../img/doctor-phone.png";
import laptop from "../img/pc.png";


import flavioFoto from "../img/flaviofoto.jpeg";
import evellynFoto from "../img/evellynfoto.jpeg";
import leonardoFoto from "../img/leonardofoto.jpeg";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home-container">
        {/* Seção Hero */}
        <section className="hero">
          <div className="hero-content">
            <h1>Diagnóstico clínico <br /> com IA para apoio <br /> médico.</h1>
            <p>Apoio inteligente à decisão médica com base nos sintomas relatados, análise de dados e protocolos clínicos. Rápido, preciso e 100% online.</p>
          </div>
          <div className="hero-image">
            <img src={phone} alt="Médico" />
          </div>
        </section>

        {/* Seção Benefícios */}
        <section className="benefits-container">
          <p className="benefits-intro">Com o nosso sistema você garante</p>
          <div className="benefits">
            <div className="benefit"><img src={acertosSrc} alt="" /><span>Redução de erros</span></div>
            <div className="benefit"><img src={precisaoSrc} alt="" /><span>Maior precisão</span></div>
            <div className="benefit"><img src={clarezaSrc} alt="" /><span>Mais Clareza</span></div>
            <div className="benefit"><img src={tempoSrc} alt="" /><span>Economia de tempo</span></div>
          </div>
        </section>

        {/* Seção Planos */}
        <section id="planos" className="plans">
          <div className="plans-visual-container">
            <div className="price-bubble bubble-free">
              <strong>3 Diagnósticos</strong>
              <span className="label">totalmente</span>
              <h2>GRÁTIS</h2>
              <span className="period">p/mês</span>
            </div>
            <div className="plans-main-image">
              <img src={laptop} alt="Notebook" />
            </div>
            <div className="price-bubble bubble-paid">
              <strong>Outros Planos Avançados</strong>
              <span className="label">A partir de</span>
              <h2>R$ 25,50</h2>
              <span className="period">p/mês</span>
            </div>
          </div>
          <div className="plans-text">
            <h2>Os melhores planos, com os menores preços</h2>
            <p>Comece com 3 diagnósticos gratuitos e evolua para planos avançados pagos, com análises mais completas e recursos extras.</p>
            <button className="learn-more-btn">Saiba mais..</button>
          </div>
        </section>

        {/* Seção Quem Somos */}
        <section id="sobre" className="about-us">
          <div className="about-content">
            <h2>QUEM SOMOS</h2>
            <p>Somos uma healthtech focada no desenvolvimento de soluções em inteligência artificial aplicada à saúde.</p>
            <p>O Dr. AI Diagnóstico é uma plataforma 100% online que utiliza inteligência artificial para auxiliar médicos no apoio ao diagnóstico, com rapidez e precisão.</p>
            <p>Nossa tecnologia analisa sintomas e padrões clínicos para oferecer insights diagnósticos, sempre como ferramenta de apoio, sem substituir a avaliação médica.</p>
            <p>Unimos inovação e medicina baseada em evidências para contribuir com decisões clínicas mais seguras e eficientes.</p>
          </div>
          <div className="about-illustration">
            <img src={logoSrc} alt="Cérebro" style={{ width: '500px' }} />
          </div>
        </section>

        {/* Seção Equipe com Fotos Reais */}
        <section className="team-section">
          <h2 className="team-title">Nossa Equipe</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="avatar-circle">
                <img src={flavioFoto} alt="Flávio Santana" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span className="member-name">Flávio Santana</span>
            </div>
            <div className="team-card">
              <div className="avatar-circle">
                <img src={evellynFoto} alt="Evellyn Furtado" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span className="member-name">Evellyn Furtado</span>
            </div>
            <div className="team-card">
              <div className="avatar-circle">
                <img src={leonardoFoto} alt="Leonardo Teixeira" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span className="member-name">Leonardo Teixeira</span>
            </div>
          </div>
        </section>

        {/* Seção FAQ */}
        <section className="faq-section">
  <h2 className="faq-main-title">FAQ</h2>
  
  <div className="faq-container">
    {}
    <div className="faq-item">
      <div className="faq-question">O que é o Dr. AIgnóstico?</div>
      <div className="faq-answer">
        O Dr. AIgnóstico é uma plataforma de inteligência artificial desenvolvida para auxiliar médicos no apoio ao diagnóstico clínico. 
        A ferramenta analisa os sintomas informados, identifica padrões clínicos e fornece insights diagnósticos, ajudando o médico a tomar decisões com mais agilidade e segurança. 
        O sistema foi criado para otimizar o tempo do profissional de saúde e apoiar a prática clínica, sempre alinhado às boas práticas médicas.
      </div>
    </div>

    {}
    <div className="faq-item">
      <div className="faq-question">O Dr. AIgnóstico é destinado a quem?</div>
      <div className="faq-answer">
        <strong>O Dr. AIgnóstico é destinado exclusivamente a médicos.</strong><br/>
        A plataforma atua como ferramenta de suporte à decisão, sendo que a decisão final é sempre do médico, que avalia o contexto clínico, exames e demais informações do paciente. 
        O sistema não substitui a avaliação médica, apenas auxilia no processo diagnóstico.
      </div>
    </div>

    {}
    <div className="faq-item">
      <div className="faq-question">Os dados dos usuários são seguros?</div>
      <div className="faq-answer">
        Sim. A segurança dos dados é uma prioridade. 
        Nós trabalhamos com dados dos usuários médicos, e não com dados sensíveis de pacientes. Todas as informações são protegidas seguindo boas práticas de segurança da informação e conformidade com a LGPD. 
        Além disso, antes de acessar a plataforma, realizamos um processo de verificação do usuário, garantindo que apenas profissionais autorizados utilizem o sistema.
      </div>
    </div>

    {}
    <div className="faq-item">
      <div className="faq-question">O Dr. AIgnóstico pode ser utilizado em atendimentos presenciais e online?</div>
      <div className="faq-answer">
        Sim. O Dr. AIgnóstico pode ser utilizado tanto em atendimentos presenciais quanto em telemedicina, auxiliando o médico na análise dos sintomas e na organização do raciocínio clínico, independentemente do formato do atendimento.
      </div>
    </div>

    {}
    <div className="faq-item">
      <div className="faq-question">É necessário treinamento para utilizar a plataforma?</div>
      <div className="faq-answer">
        Não. A plataforma foi desenvolvida para ser intuitiva e de fácil utilização, permitindo que o médico comece a usar rapidamente. 
        Mesmo assim, oferecemos orientações e suporte para garantir a melhor experiência e aproveitamento das funcionalidades do sistema.
      </div>
    </div>

    {}
    <div className="faq-item">
      <div className="faq-question">Dúvidas</div>
      <div className="faq-answer">
        Para mais informações ou dúvidas sobre o sistema, envie um email para <strong>projetomedicos2025@gmail.com</strong>
      </div>
    </div>
  </div>
</section>
      </main>
      <Footer />
    </>
  );
}