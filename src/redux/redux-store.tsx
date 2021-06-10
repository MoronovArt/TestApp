import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from "./reducers/auth.reducer";
import listReducer from "./reducers/list.reducer";
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from "@react-native-community/async-storage";


type TRootReducer = typeof rootReducer;
export type TRootState = ReturnType<TRootReducer>
export type TInferActions<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

let rootReducer = combineReducers({
    auth:authReducer,
    list: listReducer
});

const middlewares = [thunkMiddleware];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer<TRootState, any>(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export const persistor = persistStore(store);

export default store

