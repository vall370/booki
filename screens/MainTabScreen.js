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
function MainTabScreen({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: 'white',
        inactiveTintColor: '#6fb6ae',
        style: {
          backgroundColor: '#0f8679',
        },
      }}

    >

      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#009310',
          tabBarIcon: ({ color, tintColor, focused }) => (
            <Icon name={focused ? "receipt" : "receipt-outline"} color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}

        options={{
          activeColor: '#009310',
          tabBarLabel: 'Home',
          tabBarColor: '#009310',
          tabBarIcon: ({ color, tintColor, focused }) => (
            <Icon name={focused ? "home" : "home-outline"} color={color} size={26} />
          ),

        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarColor: '#009310',
          tabBarIcon: ({ color, tintColor, focused }) => (
            <Icon name={focused ? "person" : "person-outline"} color={color} size={26} />
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
  )
}

export default MainTabScreen;

function HomeStackScreen({ navigation, route }) {
  try {
    let tabBarVisible = true
    if (route.state.index === 0) {
      tabBarVisible = false
    }
    navigation.setOptions({
      tabBarVisible: tabBarVisible
    })
  } catch {
    console.log("route state is undefined")
  }
  return (
    <HomeStack.Navigator screenOptions={{

      tabBarColor: '#020093',
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        tabBarColor: '#009310',
        headerShown: false,
        headerBackTitleVisible: false,
        title: 'Overview',
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }} />
      <HomeStack.Screen name="Bastu" component={SaunaScreen} options={{
        tabBarColor: '#009310',

        headerShown: false,
        // headerBackTitleVisible: true,
        // title: 'Sauna',
      }} />
      <HomeStack.Screen name="Tvättstuga" component={LaundreeScreen} options={{
        tabBarColor: '#009310',

        headerTitleStyle: { alignSelf: 'center' },
        headerStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
        // headerBackTitleVisible: true,
        // title: 'Sauna',
        headerRight: props => <ActionBarIcon {...props} />

      }} />
    </HomeStack.Navigator>
  )
}
function DetailsStackScreen({ navigation, route }) {
  return (
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
  )
}