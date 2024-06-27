import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css"
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes/web.js';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import storeStates from './redux/store/index.js';
import { thunk } from 'redux-thunk';
import { AuthProvider } from './redux/middleware/AuthMidContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(storeStates, applyMiddleware(thunk))
root.render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <Routes>
          {
            routes.map((item, i) => <Route key={'route-' + i} path={item.path} element={item.content}></Route>)
          }
        </Routes>
      </AuthProvider>
    </Router>
  </Provider>
);