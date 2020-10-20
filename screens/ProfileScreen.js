import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, AsyncStorage, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import { Card, Button, Appbar, Paragraph, Avatar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function ProfileScreen({ props, navigation }) {
  const [text, setText] = React.useState('');
  const goToQRCode = () => {
    navigation.navigate('QRCode')
  }
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: '#0f8679' }}>
        <Appbar.Content title="Profil" />
        <Appbar.Action icon="qrcode" onPress={goToQRCode} />
        {/* <Appbar.Action icon="check-bold" onPress={this.goToConfirmedBooking} /> */}

      </Appbar.Header>
      <View style={{ marginTop: 25 }}>
        <Image
          style={{ height: 100, width: '100%', resizeMode: 'contain' }}
          source={{
            uri: 'http://192.168.0.14:8080/uploads/foretag/lulebo2.png',
          }}
        />
      </View>
      <View style={[styles.container, { marginTop: 25 }]}>
        <KeyboardAvoidingView
          behavior="position">
          <Paragraph style={{ color: '#0f8679' }}>Profilinställningar</Paragraph>
          <Divider />
          <View style={styles.formContainer}>
            <Paragraph style={{ color: '#0f8679' }}>Adress</Paragraph>
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              style={styles}
              onChangeText={text => setText(text)}
            />
            <Paragraph style={{ color: '#0f8679' }}>Lägenhetsnummer</Paragraph>
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              style={styles}
              onChangeText={text => setText(text)}
            />
            <Paragraph style={{ color: '#0f8679' }}>Lösenord</Paragraph>
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              style={styles}
              onChangeText={text => setText(text)}
            />
            <Button mode="contained" color='#0f8679' style={{ width: 150, alignSelf: 'center', marginTop: 25, borderRadius: 24 }}>Spara</Button>
          </View>
        </KeyboardAvoidingView>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formContainer: {
    backgroundColor: 'white',
    width: 250,
    borderRadius: 10,
    // paddingTop: 32,
    paddingBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'center',
  },
})
