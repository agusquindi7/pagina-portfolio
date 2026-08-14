import panelFoto from './assets/PanelWindow.png';
import github from './assets/github.png';
import fotoPerfil from './assets/foto-perfil.webp'
import linkedin from './assets/linkedin.png';
import instagram from './assets/instagram.png';
import { HelmetProvider } from 'react-helmet-async'
import { Helmet } from 'react-helmet-async'
import './Home.css';

function Home() {
  const panelBg = {
    backgroundImage: `url(${panelFoto})`,
  };

  return (
    <>
    <Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Home</title>
        <meta name="description" content="Home Page de Agustín Quindimil" />
      </Helmet>
    <div className="panel-window" style={panelBg}>
      <div className="home-content">
        <img src={fotoPerfil} alt="Agustín Quindimil" className="foto-perfil" />
        <p className="home-texto">
          Hello, my name is Agustín Quindimil. I'm a full-stack developer,
          back-end developer, and game developer. I invite you to take a look
          at my web portfolio!
        </p>
        <div className="social-icons">
          <a href="https://github.com/agusquindi7" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" style={{width:'32px',height:'32px'}}/>
          </a>
          <a href="https://www.linkedin.com/in/agustin-quindimil-853700211/?locale=es-ES" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" style={{width:'32px',height:'32px', filter: 'brightness(0) invert(1)'}} />
          </a>
          <a href="https://www.instagram.com/agus_quindi/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" style={{width:'32px',height:'32px'}} />
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;