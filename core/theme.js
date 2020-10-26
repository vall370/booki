import { AsyncStorage } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#600EE6',
    secondary: '#414757',
    bookedbyme: '#d4979e',
    bookedbyanother: '#9cb6d3',
    error: '#f13a59',
  },
};

const colors = {
  'Demovägen 1': {
    primary: '#d4979e',
    secondary: '#9cb6d3',
    accent: '#f13a59',
    tertiary: '#600EE6',
    dark: '#414757',
  },
  'Demovägen 2': {
    primary: '#ffcc00',
    secondary: '#ff6666',
    accent: '#cc0066',
    tertiary: '#30475e',
    dark: '#66cccc',
  },
};

export const getColors = async () => {
  const building = await AsyncStorage.getItem('building');
  // console.log(colors[building])
  return colors[building];
};
