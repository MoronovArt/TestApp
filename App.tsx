/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {Provider} from "react-redux";
import store, {persistor} from "./src/redux/redux-store";
import {StyleSheet} from "react-native";
import { Provider as ANTProvider} from '@ant-design/react-native';
import ruRU from '@ant-design/react-native/es/locale-provider/ru_RU';
import Main from "./src/components/main.component";
import {PersistGate} from "redux-persist/integration/react";

const App = () => {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ANTProvider locale={ruRU}>
                <Main/>
            </ANTProvider>
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({

});

export default App;
