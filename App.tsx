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

export type TabsParamList = {
  Home: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const routeIcons = {
  Home: 'home-outline',
  HomeFocused: 'home',
  Search: 'search-outline',
  SearchFocused: 'search',
};

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
      </NavigationContainer>
    </ThemeProvider>
  );
}
