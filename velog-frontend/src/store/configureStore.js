import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { rootSaga } from "../reducers";
import createSagaMiddleware from "redux-saga";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  // const enhancer =
  //   process.env.NODE_ENV === "production"
  //     ? compose(applyMiddleware(...middlewares, routerMiddleware(history)))
  //     : composeWithDevTools(
  //         applyMiddleware(...middlewares, routerMiddleware(history))
  //       );

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  //store.sagaTask = sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
