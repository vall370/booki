import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import SaunaScreen from './SaunaScreen';
import LaundreeScreen from './LaundreeScreen';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import {Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BookingConfirmedScreen from './BookingConfirmedScreen';
import BookingShowQR from './BookingShowQR';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
/* const QRCodeStack = createStackNavigator();
 */
const Tab = createBottomTabNavigator();
function ActionBarIcon() {
  return (
    <Image
      source={require('../assets/Diös.png')}
      style={{
        width: 100,
        height: 70,
        margin: 50,
      }}
    />
  );
}
function MainTabScreen({navigation, route}) {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: 'white',
        inactiveTintColor: '#6fb6ae',
        style: {
          backgroundColor: colors.tabBarColor,
        },
      }}>
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          /*           tabBarVisible: false,
           */ tabBarLabel: 'Updates',
          tabBarColor: colors.tabBarColor,
          tabBarIcon: ({color, tintColor, focused}) => (
            <Icon
              name={focused ? 'receipt' : 'receipt-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          activeColor: '#009310',
          tabBarLabel: 'Home',
          tabBarColor: colors.tabBarColor,
          tabBarIcon: ({color, tintColor, focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarColor: colors.tabBarColor,
          tabBarIcon: ({color, tintColor, focused}) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#009310',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default MainTabScreen;

function HomeStackScreen({navigation, route}) {
  const {colors} = useTheme();
  useEffect(() => {
    try {
      console.log(route.state.index);

      let tabBarVisible = true;
      if (route.state.index === 0) {
        tabBarVisible = false;
      }
      /*       if (route.state.index === 3) {
        tabBarVisible = false;
      } */
      navigation.setOptions({
        tabBarVisible: tabBarVisible,
      });
    } catch {
      console.log('route state is undefined');
    }
  });

  return (
    <HomeStack.Navigator
      screenOptions={{
        tabBarColor: colors.tabBarColor,
        headerStyle: {
          backgroundColor: colors.tabBarColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: colors.tabBarColor,
          headerShown: false,
          headerBackTitleVisible: false,
          title: 'Overview',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Bastu"
        component={SaunaScreen}
        options={{
          tabBarColor: '#009310',

          headerShown: false,
          // headerBackTitleVisible: true,
          // title: 'Sauna',
        }}
      />
      <HomeStack.Screen
        name="Tvättstuga"
        component={LaundreeScreen}
        options={{
          tabBarColor: colors.primary,

          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: {
            backgroundColor: 'white',
          },
          headerShown: false,
          // headerBackTitleVisible: true,
          // title: 'Sauna',
          headerRight: props => <ActionBarIcon {...props} />,
        }}
      />
      <HomeStack.Screen
        name="BookingConfirmed"
        component={BookingConfirmedScreen}
        options={{
          tabBarColor: colors.primary,

          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: {
            backgroundColor: 'white',
          },
          headerShown: false,
          // headerBackTitleVisible: true,
          // title: 'Sauna',
          headerRight: props => <ActionBarIcon {...props} />,
        }}
      />
    </HomeStack.Navigator>
  );
}
function DetailsStackScreen({navigation, route}) {
  return (
    <DetailsStack.Navigator
      /*       options={{tabBarVisible: false}}
       */

      screenOptions={{
        headerStyle: {
          backgroundColor: '#1f65ff',
        },
        /*         tabBarVisible: false,
         */ headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <DetailsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false,
          /*           tabBarVisible: false,
           */ headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#1f65ff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <DetailsStack.Screen
        name="BookingShowQR"
        component={BookingShowQR}
        options={{
          headerShown: false,
        }}
      />
    </DetailsStack.Navigator>
  );
}
/* function QRCodeStackScreen({navigation, route}) {
  return (
    <QRCodeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1f65ff',
        },
        tabBarVisible: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <QRCodeStack.Screen
        name="Details"
        component={BookingShowQR}
        options={{
          headerShown: false,
          tabBarVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#1f65ff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </QRCodeStack.Navigator>
  );
}
 */
