import React from 'react'
import { View, TextInput, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import { CalendarList } from 'react-native-calendars';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');
export default function LaundreeScreen({ route, navigation }) {
    const [selectedDate, setSelectedDate] = React.useState('2020-05-16');
    const [markedDates, setMarkedDates] = React.useState({});

    const setNewDaySelected = (date) => {
        const markedDate = Object.assign({});
        markedDate[date] = {
            selected: true,
            selectedColor: '#DFA460'
        };
        setSelectedDate(date);
        setMarkedDates(markedDate);
    };
    return (
        <View style={styles.MainContainer}>

            <View style={styles.imageViewStyle}>
                <View style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderTopLeftRadius: 45,
                    borderTopRightRadius: 45, width: SCREEN_WIDTH, height: (SCREEN_HEIGHT / (2 / 3)), backgroundColor: 'white'
                }}>
                    <CalendarList
                        markedDates={markedDates}
                        current={selectedDate}
                        pastScrollRange={24}
                        futureScrollRange={24}
                        horizontal
                        pagingEnabled
                        onDayPress={(day) => {
                            setNewDaySelected(day.dateString);
                        }}
                    />
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    HeaderStyle: {
        height: 250
    },
    MainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    imageViewStyle: {
        bottom: 0,
        width: '100%',
        height: (SCREEN_HEIGHT / 1.75),
        position: 'absolute',
        bottom: 0
    }
})
