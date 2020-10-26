import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { Card, Button, Appbar, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import moment from 'moment';
import { normalize } from '../core/size';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

class LaundreeScreen extends Component {
  constructor() {
    super();

    this.state = {
      currentDay: moment().format('YYYY-MM-DD'),
      selected: moment().format('YYYY-MM-DD'),
      events: [],
      isLoading: true,
      currentApartment: null,
      currentBuilding: null,
      currentFocus: null,
      isButtonVisible: false,
      text: 'http://facebook.github.io/-native/',
      building: '',
      colors: {},
    };
  }

  componentDidMount() {
    //   this.getColors();
    this.getEvents();
    this.getCurrentApartment();
    this.getBuilding();
  }

  onDayPress = day => {
    this.setState({ selected: day.dateString }, this.getEvents);
  };

  onBookPress = () => {
    const {
      currentFocus,
      currentApartment,
      currentBuilding,
      selected,
    } = this.state;
    axios
      // This is where the data is hosted
      .post('api.vasketid.se/laundree1/public/booking', {
        rid: 1,
        building: currentBuilding,
        apartment: currentApartment,
        tid: currentFocus.tid,
        date: selected,
      })
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        if (response && response.data && response.status === 201) {
          this.getEvents();
          const startTime = moment(
            currentFocus.timeslot.split('-')[0],
            'hh:mm',
          );
          /*             const notifyTime = startTime.subtract(2, 'hours').toDate();
                                scheduleNotification(
                                  'Reminder!',
                                  `You have booked ${currentApartment} ${currentBuilding} on ${selected} at ${
                                  currentFocus.timeslot
                                  }`,
                                  notifyTime,
                                ); */
          const { message } = response.data;
          Alert.alert('Booked!', message, [
            {
              title: 'Okay',
              onPress: () => {
                this.onFocusPress(null);
              },
            },
          ]);
        }
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => {
        if (error && error.data) {
          const { message } = error.data;
          Alert.alert('Oops!', message, [
            {
              title: 'Okay',
              onPress: () => {
                this.onFocusPress(null);
              },
            },
          ]);
        }
      });
  };

  onFocusPress = currentFocus => {
    this.setState(
      {
        currentFocus,
      },
      this.toggleBookButton,
    );
  };

  getCurrentApartment = async () => {
    const currentApartment = await AsyncStorage.getItem('apartment');
    const currentBuilding = await AsyncStorage.getItem('building');
    this.setState({
      currentApartment,
      currentBuilding,
    });
  };

  getCardColor = (bookedBy, timeslot) => {
    const { theme } = this.props;
    const { currentApartment, colors } = this.state;
    const isTimePassed = this.isTimePassed(timeslot);
    const isToday = this.isToday();
    if (typeof bookedBy === 'undefined') {
      return {
        textColor: theme.colors.text,
        backgroundColor:
          isTimePassed && isToday ? theme.colors.disabled : 'white',
      };
    }
    if (bookedBy === currentApartment) {
      return {
        textColor: 'white',
        backgroundColor: colors.primary,
      };
    }
    return {
      textColor: 'white',
      backgroundColor: colors.secondary,
    };
  };
  getColors = async () => {
    const colors = await getColors();
    this.setState({
      colors,
    });
  };
  getBuilding = async () => {
    const building = await AsyncStorage.getItem("building");
    this.setState({
      building: building
    });
  };

  getEvents() {
    const { selected } = this.state;
    axios
      // This is where the data is hosted
      .get(
        `api.vasketid.se/laundree1/public/bookingavailable?rid=1&date=${selected}`,
      )
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        console.log(response.data.timeslots);
        this.setState({
          events: response.data.timeslots,
          isLoading: false,
        });
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(() => this.setState({ isLoading: false }));
  }

  toggleBookButton = () => {
    const { isButtonVisible } = this.state;
    this.setState({
      isButtonVisible: !isButtonVisible,
    });
  };

  isTimePassed = timeslot => {
    const minutesOfDay = m => m.minutes() + m.hours() * 60;
    const startTime = moment(timeslot.split('-')[0], 'hh:mm');
    const endTime = moment(timeslot.split(' - ')[1], 'hh:mm');
    const currentTime = moment();
    return (
      minutesOfDay(currentTime) >=
      (minutesOfDay(startTime) +
        (minutesOfDay(endTime) === 0 ? 1459 : minutesOfDay(endTime))) /
      2
    );
  };

  isToday = () => {
    const { selected } = this.state;
    return moment(selected, 'YYYY-MM-DD').isSame(moment(), 'date');
  };

  isFocused = id => {
    const { currentFocus } = this.state;
    if (currentFocus) {
      return currentFocus.tid === id;
    }
    return false;
  };

  goToQRCode = () => {
    const { navigation } = this.props;

    navigation.navigate('QRCode');
  };
  goToConfirmedBooking = () => {
    const { navigation } = this.props;

    navigation.navigate('BookingConfirmed');
  };
  goToSomeComponent = () => {
    const { navigation } = this.props;

    navigation.navigate('SomeComponent');
  };
  renderBookButton = () => {
    const { colors } = this.state;
    return (
      <TouchableOpacity
        style={styles.floating}
        onPress={() => this.onFocusPress(null)}>
        <Button
          style={{ backgroundColor: colors.primary }}
          mode="contained"
          onPress={this.onBookPress}>
          Book now
        </Button>
      </TouchableOpacity>
    );
  };

  render() {
    const { isLoading, events, selected, isButtonVisible, colors } = this.state;
    const { navigate } = this.props.navigation;
    const { theme } = this.props;

    return (
      <View style={styles.container}>
        {/* <Appbar.Header style={{ backgroundColor: '#0f8679' }}>
                    <Appbar.Content title="Boka" subtitle="Boka tvättid" />
                    <Appbar.Action icon="qrcode" onPress={this.goToQRCode} />
                    <Appbar.Action icon="check-bold" onPress={this.goToConfirmedBooking} />

                </Appbar.Header> */}
        <ScrollView style={{ flex: 1 }}>
          <CalendarList
            theme={{
              calendarBackground: '#333248',
              textSectionTitleColor: 'white',
              dayTextColor: 'white',
              todayTextColor: 'white',
              selectedDayTextColor: 'white',
              monthTextColor: 'white',
              indicatorColor: 'white',
              selectedDayBackgroundColor: '#333248',
              arrowColor: 'white',
              'stylesheet.calendar.header': {
                dayHeader: {
                  fontWeight: '600',
                  color: '#48BFE3',
                },
              },
              'stylesheet.day.basic': {
                today: {
                  borderColor: '#48BFE3',
                  borderWidth: 0.8,
                },
                todayText: {
                  color: '#5390D9',
                  fontWeight: '800',
                },
              },
            }}
            current={this.state.currentDay}
            pastScrollRange={1}
            futureScrollRange={2}
            horizontal
            pagingEnabled={true}
            markedDates={{
              [selected]: {
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
                color: '#5E60CE',
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
                  <Text
                    style={{ marginLeft: 5, ...textStyle }}>{`${month}`}</Text>
                  <Text style={{ marginRight: 5, ...textStyle }}>{year}</Text>
                </View>
              );
            }}
          />
          {/* <Text>{`${selected}`}</Text> */}
          <ScrollView style={styles.container}>
            {!isLoading ? (
              <View style={styles.cardsContainer}>
                <Text>{this.state.building}</Text>
                {events.map(timeslots => {
                  const { tid, bookedBy, timeslot } = timeslots;
                  const { textColor, backgroundColor } = this.getCardColor(
                    bookedBy,
                    timeslot,
                  );
                  const isTimePassed = this.isTimePassed(timeslot);
                  const isFocused = this.isFocused(tid);
                  const isToday = this.isToday();
                  return (
                    <TouchableOpacity
                      key={tid}
                      disabled={
                        (isTimePassed && isToday) ||
                        typeof bookedBy !== 'undefined'
                      }
                      onPress={() => this.onFocusPress(timeslots)}>
                      <Card
                        style={[
                          styles.card,
                          { backgroundColor },
                          isFocused && { borderColor: colors.primary },
                        ]}>
                        <View>
                          <Paragraph style={[styles.text, { color: textColor }]}>
                            {timeslot}
                          </Paragraph>
                          <Paragraph style={[styles.text, { color: textColor }]}>
                            {bookedBy}
                          </Paragraph>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
                <Paragraph>Loading...</Paragraph>
              )}
          </ScrollView>
          {isButtonVisible && this.renderBookButton()}
        </ScrollView>
      </View>
    );
  }
}

LaundreeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default LaundreeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    padding: normalize(20),
    justifyContent: 'flex-end',
  },
  text: {
    marginBottom: 0,
    fontSize: normalize(14),
  },
});
