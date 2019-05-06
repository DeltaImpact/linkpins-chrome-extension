// import store from './store';
// import {incrementBackgroundCounter, decrementBackgroundCounter} from '../../store/actions/background/actions';
// import {incrementBackgroundCounter, decrementBackgroundCounter} from '../../store/actions/popup/actions';

// import {Store, applyMiddleware} from 'webext-redux';
// import logger from "redux-logger";

// const store = new Store();
// const middleware = [logger];
// const storeWithMiddleware = applyMiddleware(store, ...middleware);

// // increment or decrement background counter every second
// setInterval(() => {
//     storeWithMiddleware.dispatch(Math.random() >= 0.5 ?
//         incrementBackgroundCounter() :
//         decrementBackgroundCounter()
//     );
// }, 1000);