import fotoError from "./assets/sad-face.png";
import { Helmet } from 'react-helmet-async';

function Error404() {
  return (
    <div>
<Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Error 404</title>
        <meta name="description" content="Page not found" />
      </Helmet>

        <img 
      src={fotoError} 
      alt="404 Error" 
      style={{ width: '35%', height: 'auto', padding: '20px', display: 'block', margin: '0 auto' }}
      />
      <h1 style={{textAlign:'center'}}>404 - Page Not Found</h1>
      <p style={{textAlign:'center', paddingBottom:'50px'}}>The page you are looking for does not exist.</p>
      
    </div>
  );
}

export default Error404;