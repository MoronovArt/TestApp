import { ThunkAction } from 'redux-thunk';
import {TInferActions, TRootState} from "../redux-store";
import {Action} from "redux";
import AsyncStorage from "@react-native-community/async-storage";

type TAuthActions = TInferActions<typeof authActions>;
export type TAuthInitialState = typeof initialState
type TThunk = ThunkAction<void, TRootState, unknown, Action<string>>

let initialState = {
    username: "",
    password: "",
    isAuth: undefined as boolean | undefined
};


const authReducer = (state = initialState, action: TAuthActions): TAuthInitialState => {
    switch (action.type) {
        case 'TAPP/AUTH/SET_AUTH':
            return {
                ...state,
                isAuth: action.isAuth,
                username: action.username,
                password: action.password,
            }
        case "TAPP/AUTH/SET_USERNAME":
            return {
                ...state,
                username: action.username
            }
        case "TAPP/AUTH/SET_PASSWORD":
            return {
                ...state,
                password: action.password
            }
        default:
            return state;
    }
}


export const authActions = {
    setUsername: (username: string) => ({type: 'TAPP/AUTH/SET_USERNAME', username: username} as const),
    setPassword: (password: string) => ({type: 'TAPP/AUTH/SET_PASSWORD', password: password} as const),
    setAuth: (isAuth: boolean, username: string, password: string) => ({type: 'TAPP/AUTH/SET_AUTH', isAuth, username, password} as const),
}

export const thunkGetAuthorize = (
    username: string,
    password: string
): TThunk => async dispatch => {
    try {
        await AsyncStorage.setItem('CUSERNAME', username || "");
        await AsyncStorage.setItem('CPASSW', password || "");

        dispatch(authActions.setAuth(true, username, password));

    } catch (error) {
        dispatch(authActions.setAuth(false, "", ""));
    }
}

export const thunkUnAuthorize = (
): TThunk => async dispatch => {
    try {
        await AsyncStorage.removeItem('CUSERNAME');
        await AsyncStorage.removeItem('CPASSW');
        dispatch(authActions.setAuth(false, "", ""));
    } catch (error) {
        dispatch(authActions.setAuth(false, "", ""));
    }
}


export default authReducer;
