import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';

import Theme from './src/config/Theme';
import HomePage from './src/pages/Home';

export type TabsParamList = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const routeIcons = {
  Home: 'home-outline',
  HomeFocused: 'home',
};

export default function App() {
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
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomePage} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
