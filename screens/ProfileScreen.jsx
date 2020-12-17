import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import {ListItem, Avatar, Icon, Input, Text} from 'react-native-elements';

import {
  Appbar,
  Paragraph,
  Divider,
  Menu,
  Button,
  List,
  Checkbox,
  TextInput,
  TouchableRipple,
  Switch,
  useTheme,
  RadioButton,
  Modal,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';
import Icons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../components/context';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer',
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
  },
];
export default function ProfileScreen() {
  const [visible, setVisible] = React.useState(false);

  const [notificationValueTime, setNotificationValueTime] = useState('timmar');
  const [checked, setChecked] = React.useState(true);
  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const [inputVal, setInputVal] = useState('test');
  const [menuTimeValue, setMenuTimeValue] = useState('hours');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [value, onChangeText] = React.useState('Useless Placeholder');

  const paperTheme = useTheme();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  const onPressItemHandler = value => {
    setMenuTimeValue(value);
    setOpen(false);
  };
  const keyExtractor = (item, index) => index.toString();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const AdjustNotificationTimeModal = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <View />
        <Text>ads</Text>
      </Modal>
    );
  };

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      {isDialogVisible ? (
        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Påminnelse innan möte</Dialog.Title>
            <Dialog.Content>
              <View style={styles.container}>
                <View style={styles.textInputWrapper}>
                  <Input
                    maxLength={2}
                    style={styles.textInput}
                    placeholder="Month"
                    placeholderTextColor="#d3d3d3"
                    onChangeText={text => onChangeText(text)}
                    value={value}
                  />
                </View>
                <View style={styles.textInputWrapper}>
                  <Menu
                    style={{marginTop: 70}}
                    visible={isOpen}
                    onDismiss={() => setOpen(false)}
                    anchor={
                      <Button
                        style={{marginTop: 25}}
                        color="#8DB600"
                        icon="account"
                        dark={true}
                        mode="contained"
                        onPress={() => setOpen(true)}>
                        {menuTimeValue}
                      </Button>
                    }>
                    <Menu.Item
                      onPress={() => onPressItemHandler('timmar')}
                      title="timmar"
                    />
                    <Menu.Item
                      onPress={() => onPressItemHandler('minuter')}
                      title="minuter"
                    />
                  </Menu>
                </View>
              </View>
            </Dialog.Content>
            <Dialog.Actions style={{marginTop: 32}}>
              <Button onPress={() => setIsDialogVisible(false)}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : null}
      <Appbar.Header style={{backgroundColor: '#0f8679'}}>
        <Appbar.Content title="Profil" />
        {/* <Appbar.Action icon="check-bold" onPress={this.goToConfirmedBooking} /> */}
      </Appbar.Header>
      <Image
        style={{height: 100, width: '100%', resizeMode: 'contain'}}
        source={{
          uri: 'http://167.99.133.22:5556/uploads/foretag/cebola.png',
        }}
      />
      <TextInput label="Address" value="Demovägen 22" />
      <TextInput label="Lägenhetsnummer" value="1001" />f{' '}
      <Button
        onPress={() => {
          console.log('Pressed');
        }}
        mode="outlined"
        compact={true}>
        Byt Pin-kod
      </Button>
      <Paragraph style={{marginTop: 16}}>App inställningar</Paragraph>
      <Divider style={{marginTop: 8}} />
      <Paragraph style={{marginTop: 8}}>Inställningar</Paragraph>
      <Paragraph style={{marginTop: 8}}>Läge</Paragraph>
      <TouchableRipple
        onPress={() => {
          toggleTheme();
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}>
          <Text>Notifikationer</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          setIsDialogVisible(true);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}>
          <Text>Sätt Påminnelse tid</Text>
          <View pointerEvents="none">
            <Text>
              {value} {menuTimeValue}
            </Text>
          </View>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          toggleTheme();
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}>
          <Text>Dark Theme</Text>
          <View pointerEvents="none">
            <Switch value={paperTheme.dark} />
          </View>
        </View>
      </TouchableRipple>
      {/*       <List.Section>
        <List.Subheader>Inloggad som</List.Subheader>
        <List.Item
          style={{backgroundColor: 'lightgrey'}}
          left={() => (
            <Paragraph style={{marginLeft: 8}}>Lägenhet: 1001</Paragraph>
          )}
          right={() => <Paragraph>Byggnad: Demovägen 22</Paragraph>}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>Notifikationer</List.Subheader>
        <List.Item
          title="Status för Notifikationer"
          right={() => (
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          )}
        />
        <List.Item
          disabled={false}
          onPress={() => {
            console.log('asd');
          }}
          left={() => (
            <Paragraph style={{fontSize: 18, marginLeft: 8}}>
              Påminnelse innan bokning
            </Paragraph>
          )}
          right={() => <Paragraph style={{fontSize: 18}}>2 timmar</Paragraph>}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Byt kod</List.Subheader>
        <Button
          icon="lock-smart"
          mode="contained"
          color="cyan"
          style={{width: 200, alignSelf: 'center'}}
          onPress={() => console.log('Pressed')}>
          Byt kod
        </Button>
      </List.Section> */}
      {/*   <ListItem
        bottomDivider
        onPress={() => {
          console.log(item.title);
        }}>
        <Icon name={'av-timer'} />
        <ListItem.Content
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ListItem.Title>Demovägen 22 1001</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={toggleModal}>
        <Icon name={'av-timer'} />
        <ListItem.Content
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ListItem.Title>Password</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <Icon name={'av-timer'} />
        <ListItem.Content style={{flexDirection: 'row'}}>
          <Text>asdaaaaaaaaaaaa</Text>
          <TextInput
            style={{fontSize: 18}}
            onChangeText={text => onChangeText(text)}
            value={value}
            keyboardType="number-pad"
          />
          {/*          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TextInput
              style={{fontSize: 18}}
              onChangeText={text => onChangeText(text)}
              value={value}
              keyboardType="number-pad"
            />
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Text style={{fontSize: 18, marginTop: 10}} onPress={openMenu}>
                  {notificationValueTime}
                </Text>
              }>
              <Menu.Item
                onPress={() => {
                  onPressItemHandler('timmar');
                }}
                title="timmar"
              />
              <Menu.Item
                onPress={() => {
                  onPressItemHandler('minuter');
                }}
                title="minuter"
              />
            </Menu>
          </View> 
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        onPress={() => {
          console.log(item.title);
        }}>
        <Icon name={'av-timer'} />
        <ListItem.Content
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ListItem.Title numberOfLines={2}>asd</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={() => {
          console.log(item.title);
        }}>
        <Icon name={'av-timer'} />
        <ListItem.Content
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ListItem.Title>Exampel Namn</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={() => {
          console.log(item.title);
        }}>
        <Icon name={'av-timer'} />
        <ListItem.Content
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ListItem.Title>Exampel Namn</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem> */}
    </>
  );
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textInputWrapper: {
    flex: 1,
    height: 50,
  },
  textInput: {
    flex: 1,
  },
});
