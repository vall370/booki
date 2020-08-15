import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, Image, Dimensions, View, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { Button, Paragraph, Searchbar } from 'react-native-paper';
import { ListItem } from 'react-native-elements';

export default class ChooseCompany extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            text: '',
            company2: '',
            chooseButton: false,
            image: '',
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        axios.get("http://192.168.0.10:3000/companies").then(response => {
            this.setState({ dataSource: response.data, isLoading: false }, function () {
                this.arrayholder = response.data;
            });
        });
    }
    async onPressCompany(item) {
        await this.setState({
            company2: item.company,
            image: item.image,
        });
        this.props.navigation.navigate('ChoosenCompany', {
            image: this.state.image,
            company: this.state.company2,
        })
    }
    renderItem = ({ item }) => (
        <ListItem
            title={item.company}
            bottomDivider={true}
            contentContainerStyle={styles.listView}
            onPress={() => {
                this.onPressCompany(item);
            }
            } />
    );
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.company ? item.company.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            text: text,
        });
    }

    render() {
        const { navigation } = this.props;
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            );
        }

        if (!this.state.chooseButton) {
            //Loading View while data is loading
            return (
                <View style={styles.MainContainer}>
                    <Button
                        style={{ marginTop: 125 }}
                        mode="contained"
                        color="#3498DB"

                        labelStyle={{ color: "white", fontSize: 18 }}
                        onPress={() => this.setState({ chooseButton: true })}>
                        Välj din hyresvärd
</Button>
                    <Text style={[styles.baseText, { marginTop: 10 }]}>
                        Finns inte din hyresvärd med?
<Text style={styles.innerText}> Kontakta oss</Text>
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.MainContainer}>

                <Text>{this.state.company2}</Text>
                <View style={styles.bottomView} >
                    <Searchbar
                        placeholder="Search"
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                    />

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                    />
                    <Button style={{ marginBottom: 25, backgroundColor: 'lightgrey' }} onPress={() => this.setState({ chooseButton: false })} color="white" mode="contained">Avbryt</Button>
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#F5FCFF"
    },
    baseText: {
        fontWeight: 'bold'
    },
    innerText: {
        color: '#3498DB'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: 24,
        color: '#333',
    },
    text: {
        color: '#4f603c',
        fontSize: 24,

    },
    err: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold',
    },
    listView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    MainContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    bottomView: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        bottom: 0
    },
    textStyle: {
        color: '#fff',
        fontSize: 22
    }
});
