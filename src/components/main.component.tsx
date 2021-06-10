import React, {useEffect} from "react";
import List from "./list.component";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Auth from "./auth.component";
import {getIsAuth} from "../redux/selectors/auth.selector";
import {StyleSheet, View} from "react-native";

const Main = () => {

    const isAuth = useSelector(getIsAuth, shallowEqual);

    useEffect(() => {

    }, [])



    return (
        <View style={styles.mainView}>
            {isAuth ? <List/> : <Auth/>}
        </View>
    )
}

const styles = StyleSheet.create({
   mainView: {
       flex:1
   }
});

export default Main;
