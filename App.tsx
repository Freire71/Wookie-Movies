import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Barlow_100Thin,
  Barlow_200ExtraLight,
  Barlow_300Light,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
  Barlow_800ExtraBold,
  Barlow_900Black,
} from '@expo-google-fonts/barlow';

import Theme from './src/config/Theme';
import HomePage from './src/pages/Home';
import SplashScreenPage from './src/pages/Splashscreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type TabsParamList = {
  HomeTabs: undefined;
  Home: undefined;
  Search: undefined;
  Splashscreen: undefined;
};

const routeIcons = {
  Home: 'home-outline',
  HomeFocused: 'home',
  Search: 'search-outline',
  SearchFocused: 'search',
};

const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName =
            routeIcons[focused ? `${route.name}Focused` : `${route.name}`];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#363740',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1c1c26',
        },
        tabBarShowLabel: false,
        tabBarBadgeStyle: {
          backgroundColor: 'red',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
    </Tab.Navigator>
  );
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Barlow_100Thin,
    Barlow_200ExtraLight,
    Barlow_300Light,
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
    Barlow_800ExtraBold,
    Barlow_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splashscreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splashscreen" component={SplashScreenPage} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
