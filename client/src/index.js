import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import './index.css';
import App from './App';
// import store from './store';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
// document.addEventListener("keydown", function(event) {
//   if (event.key === "Enter") {
//     window.location.href = "/home";
//   }
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
