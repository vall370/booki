import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    AsyncStorage,
} from 'react-native';

import { Input, Icon } from 'react-native-elements';
import Users from '../model/users';
import { Button } from 'react-native-paper'
import { AuthContext } from '../components/context';
import BackButton from '../components/BackButton';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);


export default function SignInScreen({ route, navigation }) {
    const [building, setBuilding] = useState('Demovägen 1')
    const [apartment, setApartment] = useState('1001')
    const [password, setPassword] = useState('password')
    const [isLoading, setIsLoading] = useState(false)
    const [isBuildingValid, setIsBuildingValid] = useState(false)
    const [isApartmentValid, setIsApartmentValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [check_textInputChange, setCheck_textInputChange] = useState(false)
    const [isValidUser, setIsValidUser] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [currentCompany, setCurrentCompany] = useState('')

    // const company = route.params;

    const getCurrentApartment = async () => {
        const getCompany = await AsyncStorage.getItem('company');
        setCurrentCompany(getCompany)
    };
    const { signIn } = React.useContext(AuthContext);

    const SetUserInterfaceFromChooseCompany = (props) => {

        switch (props.value) {
            case 'Lulebo':
                return <View style={styles.buttonContainer}>
                    <Image
                        style={{ height: 100, width: '100%', resizeMode: 'contain' }}
                        source={{
                            uri: 'http://192.168.0.14:8080/uploads/foretag/lulebo.png',
                        }}
                    />
                </View>;
            case 'Diös Fastigheter':
                return <View elevation={25} style={styles.buttonContainer}>
                    <Image
                        source={require('../assets/L_dios.png')}
                        style={{ alignSelf: 'center' }}
                    ></Image>
                </View>;
            case 'Heimstaden':
                return <Text>You are a Manager.</Text>;
            default:
                return <Text>You are a User.</Text>;
        }
    }
    // const textInputChange = (val) => {
    //     if (val.trim().length >= 4) {
    //         setData({
    //             ...data,
    //             username: val,
    //             check_textInputChange: true,
    //             isValidUser: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             username: val,
    //             check_textInputChange: false,
    //             isValidUser: false
    //         });
    //     }
    // }

    // const handlePasswordChange = (val) => {
    //     if (val.trim().length >= 8) {
    //         setData({
    //             ...data,
    //             password: val,
    //             isValidPassword: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             password: val,
    //             isValidPassword: false
    //         });
    //     }
    // }

    // const updateSecureTextEntry = () => {
    //     setData({
    //         ...data,
    //         secureTextEntry: !secureTextEntry
    //     });
    // }

    // const handleValidUser = (val) => {
    //     if (val.trim().length >= 4) {
    //         setData({
    //             ...data,
    //             isValidUser: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             isValidUser: false
    //         });
    //     }
    // }

    const loginHandle = (apartment, building, password) => {

        const foundUser = Users.filter(item => {
            return apartment == item.apartment && building == item.building && password == item.password;
        });
        if (foundUser.length == 0) {
            console.log('Invalid User!', 'Something is incorrect.');
            return;
        }
        signIn(foundUser);
    }
    useEffect(() => {
        getCurrentApartment()
    }, []);
    return (
        <View style={styles.container}>
            <BackButton goBack={() => navigation.navigate('ChooseCompany')} />
            <View style={{ flex: 1, alignItems: 'center', top: 100, }}>
                <SetUserInterfaceFromChooseCompany value={currentCompany} />

            </View>
            <View style={styles.header}>
                <Text style={styles.text_header}>Logga in</Text>
            </View>
            <KeyboardAvoidingView
                contentContainerStyle={styles.loginContainer}
                behavior="position">

                <View style={styles.formContainer}>

                    <Input
                        leftIcon={
                            <Icon
                                name="envelope-o"
                                type="font-awesome"
                                color="rgba(0, 0, 0, 0.38)"
                                size={25}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        }
                        value={building}
                        keyboardAppearance="light"
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={'Building'}
                        containerStyle={{
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        onSubmitEditing={() => passwordInput.focus()}
                        onChangeText={building => setBuilding(building)}
                    // errorMessage={
                    //     isBuildingValid ? null : 'Please enter a valid building'
                    // }
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name="envelope-o"
                                type="font-awesome"
                                color="rgba(0, 0, 0, 0.38)"
                                size={25}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        }
                        value={apartment}
                        keyboardAppearance="light"
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={'Apartment'}
                        containerStyle={{
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={apartment => setApartment(apartment)}
                    // errorMessage={
                    //     isApartmentValid ? null : 'Please enter a valid apartment'
                    // }
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name="lock"
                                type="font-awesome"
                                color="rgba(0, 0, 0, 0.38)"
                                size={25}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        }
                        value={password}
                        keyboardAppearance="light"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        containerStyle={{
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={'Password'}
                        onSubmitEditing={() => loginHandle(apartment, building, password)}
                        onChangeText={password => setPassword(password)}

                    /*                             errorMessage={
                                                    isPasswordValid
                                                        ? null
                                                        : 'Please enter at least 8 characters'
                                                } */
                    />
                    {/* <Button
                        buttonStyle={styles.loginButton}
                        containerStyle={{ marginTop: 32, flex: 0 }}
                        activeOpacity={0.8}
                        title={'LOGIN'}
                        onPress={() => { loginHandle(apartment, building, password) }}
                        titleStyle={styles.loginTextButton}
                    /> */}
                    <View style={styles.buttonContainer}>
                        <Button mode="text" style={styles.button} color={'#0f8679'} onPress={() => { console.log('') }}>Glömt lösenordet?</Button>
                        <Button mode="contained" style={styles.button} color={'#0f8679'} onPress={() => { loginHandle(apartment, building, password) }}>Logga in</Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.helpContainer}>
                <Button
                    title={'Need help ?'}
                    titleStyle={{ color: 'white' }}
                    buttonStyle={{ backgroundColor: 'transparent' }}
                    underlayColor="transparent"
                    onPress={() => console.log('Account created')}
                />
            </View>

        </View>
    )
}

/*     login() {
        const { building, apartment } = this.state;
        this.setState({ isLoading: true });
        // Simulate an API call
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isBuildingValid: building.length >= 1 || this.buildingInput.shake(),
                isApartmentValid: apartment.length >= 1 || this.apartmentInput.shake(),
                // isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
            });
        }, 1500);
        const username = 'user1'
        const password = 'password'
        const foundUser = Users.filter(item => {
            return username == item.username && password == item.password;
        });

        if (foundUser.length == 0) {
            console.log('Invalid User!', 'username or password is incorrect.');
            return;
        }
        signIn(foundUser);
    } */

const styles = StyleSheet.create({
    header: {
        flex: 1,
        top: 25,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    text_header: {
        color: '#0f8679',
        fontWeight: 'bold',
        fontSize: 30
    },
    image: {
        flexGrow: 1,
        height: null,
        width: null,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        width: undefined,
        height: 40
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textStyle: {
        color: '#FFFFFF'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        // backgroundColor: '#2B2E35'
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    loginContainer: {
        alignItems: 'center',
        // justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    titleContainer: {
        // height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        // paddingTop: 32,
        paddingBottom: 32,
        // alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },

    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});