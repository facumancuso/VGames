// import { createStore } from 'redux';
// // import { Provider } from 'react-redux';
// import rootReducer from './reducers';


// const store = createStore(rootReducer);

// export default store;


// import  createStore  from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunkMiddleware))
    );

export default store;