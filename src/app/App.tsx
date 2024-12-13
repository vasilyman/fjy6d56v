import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ArrowDown } from 'src/shared/arrowDown';

function App() {
  const onClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ marginTop: '64px' }}>
          <ArrowDown onClick={onClick} />
        </div>
      </header>
      <main className='App-main'>
        <p>
          <ul>
            <li>
              <p><b>каких целей хотите достичь:</b></p>
              <p>ускорить изучение библиотеки реакт, перенять опыт преподавателей</p>
            </li>
            <li>
              <p><b>какими технологиями хотите овладеть</b></p>
              <p>классовый и функциональный реакт, styled-components, saga, router, rxjs</p>
            </li>
            <li>
              <p>
                <b>какими технологиями уже владеете</b>
              </p>
              <p>
                экосистема Vue, Nuxt, Webpack, Vite, sass, typescript
              </p>
            </li>
            <li>
              <p>
                <b>расскажите о себе и своем опыте</b>
              </p>
              <p>
                SPA, SPA+SSR (nuxt) 6+лет
              </p>
            </li>
          </ul>
        </p>
      </main>
    </div>
  );
}

export default App;
