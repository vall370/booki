import React from 'react';
import { Dimensions, View, Text, Button, ImageBackground, StyleSheet, StatusBar, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.splitScreen}>
          <View style={styles.leftPane}>
            <ImageBackground
              source={require('../assets/6.jpg')}

              style={{
                height: '100%',
                width: '100%',
                position: "relative", // because it's parent
                top: 2,
                left: 2
              }}
            />
          </View>
          <View style={styles.rightPane}>
            <ImageBackground
              source={require('../assets/1.jpg')}
              style={{
                height: '100%',
                width: '100%',
                position: "relative", // because it's parent
                top: 2,
                left: 2
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.background}>
        <ImageBackground style={{ position: 'absolute', width: 200, height: '50%', alignSelf: 'center', marginTop: 50 }} source={require('../assets/Diös.png')} />
        <View style={styles.splitScreen}>

          <View style={styles.leftPane}>

            <TouchableOpacity style={styles.button2}>
              <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', }} onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Bastu', {
                  itemId: 86,
                  otherParam: 'anything you want here',
                });
              }}> Bastu </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightPane}>

            <TouchableOpacity style={styles.button2}>
              <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }} onPress={() => navigation.navigate("Tvättstuga")}> Tvättstuga </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.button}>
            <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', backgroundColor: 'transparent', }}> Logga ut </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  leftButonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',

  },
  card: {
    height: 400,
  },
  image: {
    width: 200,
    height: 200
  },
  button: {
    borderColor: 'white', borderWidth: 1, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 44, width: 200,
  },
  button2: {
    height: 44, width: 150, borderWidth: 1, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 44, backgroundColor: '#ac0d2e', marginTop: 300
  },
  overlay: {
    flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    // width: width,
    // height: height
  },
  splitScreen: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  },
  leftPane: {
    width: '50%',
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  rightPane: {
    width: '50%',
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  viewTextStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  textStyle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white'
  }
});