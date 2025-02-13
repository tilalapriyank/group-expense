import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer"; 
import rootSaga from "./rootSaga"; 

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware) as unknown as ReturnType<typeof getDefaultMiddleware>,
});

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

export default store;


