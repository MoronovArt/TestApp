import React, {createRef} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    Keyboard, GestureResponderEvent
} from "react-native";
import {Button, Icon, InputItem, Toast} from "@ant-design/react-native";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {authActions, thunkGetAuthorize} from "../redux/reducers/auth.reducer";
import {getAuthData} from "../redux/selectors/auth.selector";

const Auth = () => {
    const refPasswordInput = createRef<InputItem>();
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const dispatch = useDispatch();

    const {username, password} = useSelector(getAuthData, shallowEqual);

    const setPassword = (password: string) => {
        dispatch(authActions.setPassword(password));
    }
    const setUsername = (username: string) => {
        dispatch(authActions.setUsername(username));
    }

    const moveOnNextInput = () => {
        refPasswordInput.current && refPasswordInput.current.focus();
    }

    const toggleSecureEntry = () => {
        setSecureTextEntry((prevValue) => !prevValue);
    };

    const renderIcon = () => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon name={secureTextEntry ? 'eye-invisible' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const getAuthorize = async (username: string, password: string) => {
        if(!username || !password) {
            Toast.fail('Заполните обязательные поля!');
            return;
        }
        dispatch(thunkGetAuthorize(username, password));
    }

    const onErrorLoginClick = (event: GestureResponderEvent) => {
        Toast.fail('Поле "Логин" должно быть заполнено!');
    }

    const onErrorPasswordClick = (event: GestureResponderEvent) => {
        Toast.fail('Поле "Пароль" должно быть заполнено');
    }

    return (
        <View style={styles.signInContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.flexStyle}>
                <View style={styles.flexStyle}>
                    <View style={styles.headerContainer}>
                        <View style={styles.helloContainer}>
                            <Text style={styles.helloStyle}>Здравствуйте</Text>
                            <Text style={styles.helloUnderStyle}>
                                Введите данные авторизации
                            </Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <InputItem
                                error={username ? false : true}
                                type="text"
                                returnKeyType={"next"}
                                value={username}
                                placeholderTextColor={styles.placeholderColor.backgroundColor}
                                blurOnSubmit={false}
                                onChangeText={nextValue => setUsername(nextValue)}
                                onErrorClick={onErrorLoginClick}
                                onSubmitEditing={moveOnNextInput}
                                placeholder="Логин"
                            >
                                <Icon name={"user"}/>
                            </InputItem>
                            <InputItem ref={refPasswordInput}
                                       error={password ? false : true}
                                       type={secureTextEntry ? "password" : "default"}
                                       returnKeyType={"go"}
                                       onErrorClick={onErrorPasswordClick}
                                       placeholderTextColor={styles.placeholderColor.backgroundColor}
                                       value={password}
                                       onChangeText={nextValue => setPassword(nextValue)}
                                       onSubmitEditing={() => getAuthorize(username, password)}
                                       blurOnSubmit={false}
                                       placeholder="Пароль"
                                       extra={renderIcon()}
                            >
                                <Icon name={"lock"}/>
                            </InputItem>
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.signInButtonContainer}>
                <Button type={"primary"}
                        disabled={false}
                        onPress={() => getAuthorize(username, password)}
                >ВОЙТИ</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        backgroundColor:"white"
    },
    signInButtonContainer: {
        marginBottom:15,
        marginHorizontal:25
    },
    helloStyle: {
        fontSize: 25,
        fontWeight: "bold"
    },
    headerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "white"
    },
    helloContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 150,
        backgroundColor: 'white'
    },
    helloUnderStyle: {
        marginTop: 16,
        textAlign: "center"
    },
    placeholderColor: {
        backgroundColor: '#cccccc'
    },
    flexStyle: {
        flex:1
    }
});

export default Auth;
