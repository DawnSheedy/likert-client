import { createStore } from 'redux';
import reducers from './reducers'
import initialState from './initial-state'

export default function configureStore() {
    const store = createStore(reducers, initialState);
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(reducers))
      }
    return store;
}