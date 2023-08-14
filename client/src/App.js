import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" component={HomePage} />
      </Router>
    </Provider>
  );
}

export default App;