import React, {useCallback, useEffect} from "react";
import {thunkListData} from "../redux/reducers/list.reducer";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
    Dimensions,
    FlatList,
    FlatListProps,
    ListRenderItem,
    ListRenderItemInfo,
    RefreshControl,
    StyleSheet, Text,
    View, ViewToken
} from "react-native";
import {getListDataArray, getListHasMore} from "../redux/selectors/list.selector";

import {ActivityIndicator, Icon, List as ANTList} from "@ant-design/react-native";
import {thunkUnAuthorize} from "../redux/reducers/auth.reducer";

const List = () => {
    const dispatch = useDispatch();
    const data = useSelector(getListDataArray, shallowEqual);
    const {hasMore, currentPage} = useSelector(getListHasMore, shallowEqual)

    useEffect(() => {
        if(data.length === 0) dispatch(thunkListData(1));
    }, []);


    const renderItem = useCallback((list: ListRenderItemInfo<TData>) => {
        return (
            <ANTList.Item data-seed="logId"
                          multipleLine
                          align="bottom">
                {list.item.rate.name}
                <ANTList.Item.Brief>{"Дата создания: " + list.item.created_at}</ANTList.Item.Brief>
                <ANTList.Item.Brief>{"Дата начала: " +list.item.start_date}</ANTList.Item.Brief>
                <ANTList.Item.Brief>{"Дата окончания: " +list.item.finish_date}</ANTList.Item.Brief>
            </ANTList.Item>
        )
    }, []);

    const refreshList = () => {
        dispatch(thunkListData(1));
    }

    const getMore = useCallback(() => {
        if(hasMore) dispatch(thunkListData(currentPage + 1));
    }, [hasMore, currentPage]);

    const Footer = useCallback(() => {
        if (!hasMore) return null;
        return (
            <View style={{flex:1, justifyContent:"center", alignItems:"center", padding: 10}}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }, [hasMore]);

    const UnAutorize = () => {
        dispatch(thunkUnAuthorize());
    }

    return (
        <View style={styles.listContainer}>
            <View style={{height:45, backgroundColor:"#108ee9", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:14}}>
                <Text style={{color: "white", fontSize:16}}>{"Список"}</Text>
                <Icon name={"logout"} onPress={UnAutorize} color={"white"}/>
            </View>
            <FlatList style={styles.list}
                      data={data}
                      renderItem={renderItem}
                      refreshControl={
                          <RefreshControl
                              refreshing={false}
                              onRefresh={refreshList}
                              progressViewOffset={5}
                          />}
                      keyExtractor={item => item.created_at + item.number + item.rate.name}
                      initialNumToRender={20}
                      getItemLayout={(data, index) => (
                          {length: 105.4, offset: 105.4 * index, index}
                      )}
                      viewabilityConfig={
                          {
                              viewAreaCoveragePercentThreshold:0,
                              waitForInteraction:true,
                              minimumViewTime:1000
                          }
                      }
                      removeClippedSubviews={true}
                      maxToRenderPerBatch={20}
                      onEndReachedThreshold={0.1}
                      windowSize={Dimensions.get("window").height - 45}
                      ListFooterComponent={(props) => <Footer {...props}/>}
                      onEndReached={getMore}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        backgroundColor: "white"
    },
    list: {
        flex:1
    }
});

export default List;
