import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { Card } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { normalize } from '../core/size';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import NotifService from '../core/NotifService';

const styles = StyleSheet.create({
    contentContainer: {
        padding: normalize(10),
    },
    card: {
        marginBottom: normalize(10),
    },
    inner: {
        flexDirection: 'row',
    },
    code: {
        width: normalize(8),
        backgroundColor: 'red',
        borderTopLeftRadius: normalize(4),
        borderBottomLeftRadius: normalize(4),
    },
    innerContent: {
        padding: normalize(10),
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
/*         color: 'grey',
 */        fontSize: normalize(16),
        paddingBottom: normalize(10),
    },
    qr: {
        padding: normalize(10),
        justifyContent: 'center',
    },
});

export default function ListItem(props) {
    const [isVisible, setIsVisible] = useState(false)
    const { colors } = useTheme();
    const navigation = useNavigation();
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
        let title = "Reminder!"
        let message = `You have booked ${apartment} ${building} on ${moment(date).format('YYYY-MM-DD')} at ${startTime} - ${endTime}`
        let date1 = datetime
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

    const toggleDatePicker = () => {
        setIsVisible(!isVisible)
    };

    const getLabelColor = date => {
        if (isToday(date)) {
            return colors.bookingIsToday;
        }

        if (isPast(date)) {
            return colors.bookingIsPast;
        }

        return colors.bookingIsFuture;
    };

    const isToday = date =>
        moment(date, 'YYYY-MM-DD').isSame(moment().format('YYYY-MM-DD'));

    const isPast = date =>
        moment(date, 'YYYY-MM-DD').isBefore(moment().format('YYYY-MM-DD'));

    const isFuture = date =>
        moment(date, 'YYYY-MM-DD').isAfter(moment().format('YYYY-MM-DD'));
    const goToBookingShowQR = props => {
        navigation.navigate('BookingShowQR');

        console.log(props)
    }
    return (
        <TouchableOpacity onPress={() => { goToBookingShowQR(props.id) }}>
            <Card style={[styles.card, { backgroundColor: colors.bookingCardColor }]}>
                <View style={styles.inner}>
                    <View
                        style={[styles.code, { backgroundColor: getLabelColor(props.date) }]}
                    />
                    <View style={styles.innerContent}>
                        <Text style={[styles.title, { color: colors.text }]}>{props.id}</Text>
                        <View style={styles.card}>
                            <Text style={{ color: colors.text }}>{props.building}</Text>
                            <Text style={{ color: colors.text }}>{moment(props.date).format('YYYY-MM-DD HH:mm')}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text style={{ color: colors.text }}>{`${props.start_time} - ${props.end_time}`}</Text>
                            <TouchableOpacity onPress={toggleDatePicker}>
                                <Text style={{ color: colors.text }}>Set reminder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.qr}>
                        <QRCode value={props.apartment} size={normalize(80)} />
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isVisible}
                    mode="datetime"
                    onConfirm={onSetReminder}
                    onCancel={toggleDatePicker}
                />
            </Card>
        </TouchableOpacity>
    )
}

/* export default class ListItem extends Component {
    state = {
        isVisible: false,
        colors: {},
    };

    componentDidMount() {
        getColors();
    }

    onSetReminder = datetime => {
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

    toggleDatePicker = () => {
        const { isVisible } = state;
        setState({
            isVisible: !isVisible,
        });
    };

    getColors = async () => {
        const colors = await getColors();
        setState({
            colors,
        });
    };

    getLabelColor = date => {
        const { colors } = state;
        if (isToday(date)) {
            return colors.primary;
        }

        if (isPast(date)) {
            return colors.accent;
        }

        return colors.secondary;
    };

    isToday = date =>
        moment(date, 'YYYY-MM-DD').isSame(moment().format('YYYY-MM-DD'));

    isPast = date =>
        moment(date, 'YYYY-MM-DD').isBefore(moment().format('YYYY-MM-DD'));

    isFuture = date =>
        moment(date, 'YYYY-MM-DD').isAfter(moment().format('YYYY-MM-DD'));

    render() {
        const { isVisible } = state;
        const {
            id,
            date,
            apartment,
            building,
            start_time: startTime,
            end_time: endTime,
        } = props;
        return (
            <Card style={styles.card}>
                <View style={styles.inner}>
                    <View
                        style={[styles.code, { backgroundColor: getLabelColor(date) }]}
                    />
                    <View style={styles.innerContent}>
                        <Text style={styles.title}>{id}</Text>
                        <View style={styles.card}>
                            <Text>{building}</Text>
                            <Text>{date}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text>{`${startTime} - ${endTime}`}</Text>
                            <TouchableOpacity onPress={toggleDatePicker}>
                                <Text color="primary">Set reminder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.qr}>
                        <QRCode value={apartment} size={normalize(80)} />
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isVisible}
                    mode="datetime"
                    onConfirm={onSetReminder}
                    onCancel={toggleDatePicker}
                />
            </Card>
        );
    }
}

ListItem.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    building: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
}; */
