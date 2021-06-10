import {TInferActions, TRootState} from "../redux-store";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";


type TChatsListActions = TInferActions<typeof listActions>;
export type TChatsListInitialState = typeof initialState
type TThunk = ThunkAction<void, TRootState, unknown, Action<string>>

let initialState = {
    pagination: {

    } as TPagination,
    data: [

    ] as TData[],
};

export const listActions = {
    setListData: (pagination: TPagination, data: TData[]) => ({ type: 'TAPP/LIST/SET_DATA', pagination, data} as const),
}

const listReducer = (state = initialState, action: TChatsListActions): TChatsListInitialState => {
    switch (action.type) {
        case 'TAPP/LIST/SET_DATA':
            return {
                ...state,
                pagination: action.pagination,
                data: (action.pagination.page === 1 ? action.data : [...state.data, ...action.data]),
            }
        default:
            return state;
    }
}

export const thunkListData = (
    page: number
): TThunk => async dispatch => {
    try {
        const fetchResult = await fetch(`https://st.clickservice.com/gw/site/example/data?page=${page}`, {
            method: 'GET',
            headers: new Headers({
                'token': 'YhZxGziqojyQXu5r'
            })
        });
        const resultData = await fetchResult.json() as TResponseData;
        dispatch(listActions.setListData(resultData.pagination, resultData.data));
    } catch (error) {

    }
}


export default listReducer;
