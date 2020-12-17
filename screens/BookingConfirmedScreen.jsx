import React from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Paragraph, Button} from 'react-native-paper';

export default function BookingConfirmedScreen({navigation}) {
  return (
    <View
      style={{
        marginTop: '25%',
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height: 100, width: '100%', resizeMode: 'contain'}}
        source={{
          uri: 'http://167.99.133.22:5556/uploads/foretag/cebola.png',
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
          marginTop: '25%',
        }}>
        <Icon name="ios-checkbox" size={200} color={'#2B2E35'} />
        <Text style={{fontSize: 28}}>Bokning bekräftad</Text>
        <Text style={{fontSize: 28}}>Din bokningstid är mellan</Text>
        <Text style={{fontSize: 28}}>1200 1500</Text>
        <Button
          mode="contained"
          color={'#2B2E35'}
          onPress={() => navigation.navigate('Notifications')}
          style={{marginTop: 25}}>
          Tillbaka
        </Button>
      </View>
    </View>
  );
}
