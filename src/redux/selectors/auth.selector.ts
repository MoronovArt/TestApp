import {TRootState} from "../redux-store";
import {createSelector} from "reselect";

export const getAuthData  = (state: TRootState) => state.auth;

export const getIsAuth = createSelector(getAuthData, (authData) => {
    return authData.isAuth;
})
