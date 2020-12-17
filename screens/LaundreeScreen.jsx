import React, {Component, useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import {
  Card,
  Button,
  Appbar,
  Paragraph,
  ActivityIndicator,
  TextInput,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import moment from 'moment';
import {normalize} from '../core/size';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../components/context';
import NotifService from '../core/NotifService';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function LaundreeScreen({navigation}) {
  const [currentDay, setCurrentDay] = useState(moment().format('YYYY-MM-DD'));
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentApartment, setCurrentApartment] = useState('');
  const [currentBuilding, setCurrentBuilding] = useState('');
  const [currentFocus, setCurrentFocus] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [building, setBuilding] = useState('');
  const {colors} = useTheme();
  const [selected, setSelected] = useState('');
  const [timeslotid, setTimeslotid] = useState([]);
  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const notif = useRef(new NotifService(onRegister, onNotif));
  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };
  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };
  const onSetReminder = datetime => {
    const {
      date,
      apartment,
      building,
      start_time: startTime,
      end_time: endTime,
    } = props;
    const remindDate = moment(datetime).format('YYYY-MM-DD');
    const remindTime = moment(datetime).format('hh:mm');
    let title = 'Reminder!';
    let message = `You have booked ${apartment} ${building} on ${moment(
      date,
    ).format('YYYY-MM-DD')} at ${startTime} - ${endTime}`;
    let date1 = datetime;
    notif.current.scheduleNotif(title, message, date1);

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

  const onBookPress = () => {
    console.log({
      rid: 1,
      building: currentBuilding,
      apartment: currentApartment,
      date: selectedDay,
      tid: currentFocus,
    });
    goToConfirmedBooking();
    axios
      // This is where the data is hosted
      .post('http://167.99.133.22:5556/api/bookings/booking', {
        rid: 1,
        building: currentBuilding,
        apartment: currentApartment,
        date: selectedDay,
        tid: currentFocus,
      })
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        if (response && response.data && response.status === 201) {
          getEvents();
          const startTime = moment(
            currentFocus.timeslot.split('-')[0],
            'hh:mm',
          );

          const notifyTime = startTime.subtract(2, 'hours').toDate();
          let title = 'Reminder!';
          let message = `You have booked ${currentApartment} ${currentBuilding} on ${selected} at ${
            currentFocus.timeslot
          }`;
          notif.current.scheduleNotif(title, message, notifyTime);
          /*           scheduleNotification(
            'Reminder!',
            `You have booked ${currentApartment} ${currentBuilding} on ${selected} at ${
              currentFocus.timeslot
            }`,
            notifyTime,
          ); */
          /*           const {message} = response.data;
          Alert.alert('Booked!', message, [
            {
              title: 'Okay',
              onPress: () => {
                onFocusPress(null);
              },
            },
          ]); */
        }
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => {
        if (error && error.data) {
          const {message} = error.data;
          Alert.alert('Oops!', message, [
            {
              title: 'Okay',
              onPress: () => {
                onFocusPress(null);
              },
            },
          ]);
        }
      });
  };

  const onFocusPress = currentFocus => {
    setCurrentFocus(currentFocus);
    toggleBookButton();
  };

  const getCardColor = (apartment, timeslot) => {
    const isTimePassed1 = isTimePassed(timeslot);

    const isToday1 = isToday();
    const isPast1 = isPast();
    if (isPast1) {
      return {
        textColor: colors.text,
        backgroundColor: colors.disabled,
      };
    }
    if (apartment === currentApartment) {
      return {
        textColor: colors.text,
        backgroundColor: colors.timeslotIsApartment,
      };
    }
    if (typeof apartment === 'string' && apartment != currentApartment) {
      return {
        textColor: colors.text,
        backgroundColor: colors.timeslotNotApartment,
      };
    }
    if (apartment === currentApartment) {
      return {
        textColor: colors.calendarTimeslot,
        backgroundColor: colors.calendarTimeslot,
      };
    }
    return {
      textColor: colors.calendarTimeslot,
      backgroundColor: colors.calendarTimeslot,
    };
  };
  const getCurrentApartmentBuilding = async () => {
    const apartment = await AsyncStorage.getItem('apartment');
    const building = await AsyncStorage.getItem('building');
    setCurrentApartment(apartment);
    setCurrentBuilding(building);
  };
  useEffect(() => {
    getCurrentApartmentBuilding();
    getEvents();
  }, [events]);

  const onDayPress = day => {
    setSelectedDay(day.dateString);
    getEvents();
  };

  const getEvents = () => {
    axios
      // This is where the data is hosted
      .get(
        `http://167.99.133.22:5556/api/bookings/bookingavailable?rid=1&date=${selectedDay}`,
      )
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        setEvents(response.data.timeslots);
        setIsLoading(false);
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(() => setIsLoading(false));
  };

  const toggleBookButton = () => {
    setIsButtonVisible(!isButtonVisible);
  };
  const isTimePassed = timeslot => {
    const minutesOfDay = m => m.minutes() + m.hours() * 60;
    const startTime = moment(timeslot.split(' - ')[0], 'hh:mm');
    const endTime = moment(timeslot.split(' - ')[1], 'hh:mm');
    const currentTime = moment();
    return (
      minutesOfDay(currentTime) >=
      (minutesOfDay(startTime) +
        (minutesOfDay(endTime) === 0 ? 1459 : minutesOfDay(endTime))) /
        2
    );
  };

  const isToday = () => {
    return moment(selectedDay, 'YYYY-MM-DD').isSame(moment(), 'date');
  };
  const isPast = () => {
    return moment(selectedDay, 'YYYY-MM-DD').isBefore(moment(), 'date');
  };
  const isFocused = id => {
    if (currentFocus) {
      return currentFocus.tid === id;
    }
    return false;
  };
  const RenderBookButton = () => {
    if (isButtonVisible) {
      return (
        <TouchableOpacity
          style={[colors.bookingButton, styles.floating]}
          onPress={() => {
            onFocusPress(null);
          }}>
          <Button
            labelStyle={{color: colors.text}}
            style={[styles.floating, {backgroundColor: colors.bookingButton}]}
            mode="contained"
            onPress={() => {
              onBookPress();
            }}>
            Book now
          </Button>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const goToQRCode = () => {
    navigation.navigate('QRCode');
  };
  const goToConfirmedBooking = () => {
    navigation.navigate('BookingConfirmed');
  };
  const goToSomeComponent = () => {
    navigation.navigate('SomeComponent');
  };

  const ShowBookingButton = timeslot_id => {
    timeslotid.push(timeslot_id);
    const lastItem = timeslotid[timeslotid.length - 1];
    const secondlastItem = timeslotid[timeslotid.length - 2];
    setIsButtonVisible(true);
    if (lastItem === secondlastItem) {
      setIsButtonVisible(false);
      timeslotid.splice(0, timeslotid.length);
      console.log(timeslot_id);
    }
  };
  return (
    <View style={{height: '100%', backgroundColor: colors.background}}>
      <CalendarList
        theme={{
          calendarBackground: colors.calendarBackground,
          textSectionTitleColor: '#05526D',
          dayTextColor: '#05526D',
          todayTextColor: '#05526D',
          selectedDayTextColor: '#05526D',
          monthTextColor: '#05526D',
          indicatorColor: '#05526D',
          selectedDayBackgroundColor: '#05526D',
          arrowColor: 'white',
        }}
        onDayPress={onDayPress}
        minDate={moment().pas}
        current={currentDay}
        pastScrollRange={1}
        futureScrollRange={2}
        horizontal
        pagingEnabled={true}
        markedDates={{
          [selectedDay]: {
            selected: true,
            selectedColor: colors.primary,
          },
        }}
        renderHeader={date => {
          const header = date.toString('MMMM yyyy');
          const [month, year] = header.split(' ');
          const textStyle = {
            fontSize: 18,
            fontWeight: 'bold',
            // paddingTop: 10,
            paddingBottom: 10,
            color: '#05526D',
            paddingRight: 5,
          };

          return (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{marginLeft: 5, ...textStyle}}>{`${month}`}</Text>
              <Text style={{marginRight: 5, ...textStyle}}>{year}</Text>
            </View>
          );
        }}
      />
      <ScrollView>
        {!isLoading ? (
          <View style={styles.cardsContainer}>
            {events.map(function(timeslots) {
              const {timeslot_id, apartment, timeslot} = timeslots;
              const {textColor, backgroundColor} = getCardColor(
                apartment,
                timeslot,
              );
              const isTimePassed1 = isTimePassed(timeslot);
              const isFocused1 = isFocused(timeslot_id);
              const isToday1 = isToday();
              return (
                <TouchableOpacity
                  key={timeslot_id}
                  disabled={
                    (isTimePassed1 && isToday1) ||
                    typeof bookedBy !== 'undefined'
                  }
                  onPress={() => {
                    setCurrentFocus(timeslot_id);
                    ShowBookingButton(timeslot_id);
                  }}>
                  <Card
                    style={[
                      styles.card,
                      {backgroundColor},
                      isFocused1 && {borderColor: colors.primary},
                    ]}>
                    <View>
                      <Paragraph style={[styles.text, {color: colors.text}]}>
                        {timeslot}
                      </Paragraph>
                      <Paragraph style={[styles.text, {color: textColor}]}>
                        {apartment}
                      </Paragraph>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
      {!isButtonVisible ? null : (
        <TouchableOpacity
          style={[colors.bookingButton, styles.floating]}
          onPress={() => {
            onFocusPress(null);
          }}>
          <Button
            labelStyle={{color: colors.text}}
            style={[styles.floating, {backgroundColor: colors.bookingButton}]}
            mode="contained"
            onPress={() => {
              onBookPress();
            }}>
            Book now
          </Button>
        </TouchableOpacity>
      )}
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
            <Switch value={colors.dark} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    margin: normalize(4.5),
    width: SCREEN_WIDTH / 3 - normalize(10),
    marginTop: normalize(8),
    height: SCREEN_WIDTH / 7 - normalize(10),
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    marginStart: 5,
  },

  floating: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    color: 'white',
  },
  text: {
    textAlign: 'center', // <-- the magic
    marginBottom: 0,
    fontSize: normalize(14),
  },
});
