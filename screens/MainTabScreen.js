import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import SaunaScreen from './SaunaScreen';
import LaundreeScreen from './LaundreeScreen';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import { Image } from 'react-native';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createBottomTabNavigator();
function ActionBarIcon() {
  return (
    <Image
      source={require('../assets/Diös.png')}
      style={{
        width: 100,
        height: 70,
        margin: 50
      }} />
  );
}
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}

      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009310',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),

      }}
    />
    <Tab.Screen
      name="Notifications"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{

      headerShown: false,
      headerBackTitleVisible: false,
      title: 'Overview',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
    }} />
    <HomeStack.Screen name="Bastu" component={SaunaScreen} options={{

      headerShown: true,
      // headerBackTitleVisible: true,
      // title: 'Sauna',
    }} />
    <HomeStack.Screen name="Tvättstuga" component={LaundreeScreen} options={{
      headerTitleStyle: { alignSelf: 'center' },
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      // headerBackTitleVisible: true,
      // title: 'Sauna',
      headerRight: props => <ActionBarIcon {...props} />

    }} />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#1f65ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </DetailsStack.Navigator>
);
