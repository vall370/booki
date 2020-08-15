import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Button } from 'react-native-elements';

export default function ChoosenCompany({ route, navigation }) {
    const company = route.params;
    const { image } = route.params;
    const [data, setData] = useState({})
    const ButtonClickCheckFunction = () => {

        Alert.alert("Button Clicked")

    }
    console.log(data)
    const getDataUsingSimpleGetCall = () => {
        axios
            .get('http://192.168.0.10:3000/companies')
            .then(function (response) {
                // handle success
                alert(JSON.stringify(response.data));
            })
            .catch(function (error) {
                // handle error
                alert(error.message);
            });
    };
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get('http://192.168.0.10:3000/companies');
            setData(response.data);
        };
        fetchProduct();
    }, []);
    return (

        <View style={styles.container}>
            <View style={{ height: '100%' }}>
                <Image
                    source={require('../assets/123123.png')}

                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={styles.background}>
                <View style={{ flex: 1, alignItems: 'center', top: 50 }}>
                    <Image
                        style={{ width: '100%', height: 200 }}
                        source={require('../assets/L_dios.png')
                        }
                    />
                    <Text style={{ color: 'white', fontFamily: 'Open Sans', fontSize: 18 }}>Välkommen till din digitala bokning</Text>
                    <View style={{ marginTop: 100 }}>
                        <Button
                            containerStyle={{ width: 150 }}
                            iconRight={true}
                            icon={{
                                name: "chevron-right",
                                size: 24,
                                color: "white"
                            }}
                            title="Logga in"
                            buttonStyle={{ justifyContent: 'space-between', backgroundColor: "#d7002c" }}
                            onPress={() => { navigation.navigate('SignInScreen') }}
                        />
                        <Button
                            containerStyle={{ width: 150, marginTop: 25 }}
                            buttonStyle={{ justifyContent: 'space-between', backgroundColor: "#d7002c" }}
                            iconRight={true}
                            icon={{
                                name: "chevron-right",
                                size: 24,
                                color: "white"
                            }}
                            title="Bank-ID"
                        />

                    </View>

                    <View style={styles.MainContainer}>
                        <Button
                            buttonStyle={{ justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.6)', borderWidth: 2, borderColor: 'black' }}
                            icon={{
                                name: "chevron-left",
                                size: 24,
                                color: "white"
                            }}
                            title="Välj din hyresvärd"
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',

    },
    SubmitButtonStyle: {
        width: 200,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#E40138",
    },

    // TextStyle: {
    //     color: '#fff',
    //     textAlign: 'center',
    // },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    GooglePlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc4e41',
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
    },
    ImageIconStyle: {
        padding: 10,
        alignContent: 'center',
    },
    TextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
    },
    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
        left: '25%'
    },
})
