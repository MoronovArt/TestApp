import {TRootState} from "../redux-store";
import {createSelector} from "reselect";
import {getAuthData} from "./auth.selector";

const getListData = (state: TRootState) => state.list;

export const getListHasMore = createSelector(getListData, (listData) => {
    return {hasMore:(listData.pagination.page === listData.pagination.lastPage ? false : true), currentPage: listData.pagination.page};
})

export const getListDataArray = createSelector(getListData, (listData) => {
   return listData.data;
});
