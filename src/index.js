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
import RootLayout from './views/components/layouts/RootLayout.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(storeStates, applyMiddleware(thunk))
const adminRoutes = routes.filter(item => [
  '/dashboard',
  '/machine',
  '/log-activity'
].includes(item.path));

const nonAdminRoutes = routes.filter(item => ![
  '/dashboard',
  '/machine',
  '/log-activity'
].includes(item.path));

root.render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <Routes>
          {
            nonAdminRoutes.map((item, i) => <Route key={'route-' + i} path={item.path} element={item.content}></Route>)
          }
          <Route element={<RootLayout/>}>
          {
            adminRoutes.map((item, i) => <Route index={(i === 0)} key={'route-admin' + i} path={item.path} element={item.content}/>)
          }
          </Route>
        </Routes>

      </AuthProvider>
    </Router>
  </Provider>
);