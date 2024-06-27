import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { pathRoutes } from './routes/web.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-3xl font-bold underline'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to={pathRoutes.login}>To Login</Link>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
