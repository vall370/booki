import React from 'react';
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../components/context';
import {Button} from 'react-native-paper';
var {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.splitScreen}>
          <View style={styles.leftPane}>
            <Image
              source={require('../assets/6.jpg')}
              style={{
                height: '100%',
                width: '100%',
                position: 'relative', // because it's parent
              }}
            />
          </View>
          <View style={styles.rightPane}>
            <Image
              source={require('../assets/1.jpg')}
              style={{
                height: '100%',
                width: '100%',
                position: 'relative', // because it's parent
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.background}>
        <ImageBackground
          style={{
            position: 'absolute',
            width: 400,
            height: '50%',
            alignSelf: 'center',
            marginTop: 50,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'http://192.168.0.14:8080/uploads/foretag/lulebo2.png',
          }}
        />
        <View
          style={{
            marginTop: 50,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button
            color={colors.button}
            style={styles.button2}
            mode="contained"
            onPress={() =>
              navigation.navigate('Bastu', {
                itemId: 86,
                otherParam: 'anything you want here',
              })
            }>
            Bastu
          </Button>

          <Button
            color={colors.button}
            style={[styles.button2]}
            mode="contained"
            onPress={() => navigation.navigate('Tvättstuga')}>
            Tvättstuga
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color={colors.button}
            style={[styles.button, {borderColor: colors.button}]}
            onPress={() => {
              signOut();
            }}>
            <Text
              style={{
                fontSize: 12,
                color: colors.button,
                textAlign: 'center',
                backgroundColor: 'transparent',
                fontWeight: 'bold',
              }}>
              {' '}
              Logga ut{' '}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: 'rgba(255,255,255, 0.4)',
  },
  card: {
    height: 400,
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 44,
    width: 200,
  },
  button2: {
    width: 150,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    height: 44,
    marginTop: 300,
  },
  overlay: {
    flex: 1,

    opacity: 0.5,
    backgroundColor: 'black',
  },
  splitScreen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  splitScreen1: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  leftPane: {
    height: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPane: {
    height: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTextStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  textStyle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
});
