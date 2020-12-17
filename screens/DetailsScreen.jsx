import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import ListItem from '../components/ListItem';
import {normalize} from '../core/size';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import PushNotification from 'react-native-push-notification';
import NotifService from '../core/NotifService';
import {scheduleNotification} from '../core/notification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function DetailsScreen(props, {navigation}) {
  const [events, setEvents] = useState([]);
  const [registerToken, setRegisterToken] = useState();
  const [fcmRegistered, setFcmRegistered] = useState();
  const notif = useRef(new NotifService(onRegister, onNotif));
  const [isVisible, setIsVisible] = useState(false);
  const [time12, setTime12] = useState('');
  const toggleDatePicker = () => {
    setIsVisible(!isVisible);
  };
  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };
  const handlePerm = perms => {
    console.log(JSON.stringify(perms));
    /*     Alert.alert('Permissions', JSON.stringify(perms));
     */
  };
  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };
  const onSetReminder = datetime => {
    time12;
    const {
      date,
      apartment,
      building,
      start_time: startTime,
      end_time: endTime,
    } = props;
    const remindDate = moment(datetime).format('YYYY-MM-DD');
    const remindTime = moment(datetime).format('hh:mm');

    scheduleNotification(
      'Reminder!',
      `You have booked ${apartment} ${building} on ${date} at ${startTime} - ${endTime}`,
      datetime,
    );
    Alert.alert(
      'Done!',
      `You have set a reminder on ${remindDate} at ${remindTime} for this booking.`,
      [
        {
          title: 'Okay',
          onPress: toggleDatePicker,
        },
      ],
    );
  };

  useEffect(() => {
    getHistoryOfBookings();
  }, []);
  const getHistoryOfBookings = async () => {
    const currentApartment = await AsyncStorage.getItem('apartment');
    const currentBuilding = await AsyncStorage.getItem('building');

    Axios
      // This is where the data is hosted
      .get(
        `http://167.99.133.22:5556/api/bookings/bookinghistory?building=${currentBuilding}&apartment=${currentApartment}`,
      )
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        /*         console.log(response.data.results);
         */ setEvents(response.data.results);
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(console.log);
  };
  const isToday = date =>
    moment(date, 'YYYY-MM-DD').isSame(moment().format('YYYY-MM-DD'));

  const isPast = date =>
    moment(date, 'YYYY-MM-DD').isBefore(moment().format('YYYY-MM-DD'));

  const isFuture = date =>
    moment(date, 'YYYY-MM-DD').isAfter(moment().format('YYYY-MM-DD'));

  const sorted = orderBy(events, event => {
    if (isToday(event.date)) {
      return 0;
    }
    if (isFuture(event.date)) {
      return 1;
    }
    return 2;
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.current.getScheduledLocalNotifications(handlePerm);
        }}>
        <Text>Check Permission</Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={sorted}
        keyExtractor={data => data.id.toString()}
        renderItem={({item}) => <ListItem {...item} />}
      />
      <DateTimePickerModal
        isVisible={isVisible}
        mode="datetime"
        onConfirm={onSetReminder}
        onCancel={toggleDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: normalize(10),
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
});
