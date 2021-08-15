import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { QueryClient, QueryClientProvider } from 'react-query';

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
import MovieDetailsPage from './src/pages/MovieDetails';
import MoviesSearchPage from './src/pages/MoviesSearch';
import { Movie } from './src/api/types/movie';

export type TabsParamList = {
  HomeTabs: undefined;
  Home: undefined;
  Splashscreen: undefined;
  MoviesSearch: undefined;
};

export type StackParamsList = {
  MovieDetails: { movie: Movie };
};

export type ParamsList = TabsParamList & StackParamsList & {};

const routeIcons = {
  Home: 'home-outline',
  HomeFocused: 'home',
  MoviesSearch: 'search-outline',
  MoviesSearchFocused: 'search',
};

const Tab = createBottomTabNavigator<ParamsList>();
const Stack = createNativeStackNavigator<ParamsList>();

const queryClient = new QueryClient();

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
          backgroundColor: Theme.backgroundColor,
        },
        tabBarShowLabel: false,
        tabBarBadgeStyle: {
          backgroundColor: 'red',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="MoviesSearch" component={MoviesSearchPage} />
    </Tab.Navigator>
  );
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splashscreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splashscreen" component={SplashScreenPage} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen
              name="MovieDetails"
              component={MovieDetailsPage}
              options={({ route, navigation }) => ({
                title: route.params.movie.title,
                headerShown: true,
                headerStyle: {
                  backgroundColor: Theme.backgroundColor,
                },
                headerTitleStyle: {
                  color: '#FFF',
                },
                // headerLeft: () => {
                //   return (
                //     <TouchableOpacity onPress={navigation.goBack()}>
                //       <Ionicons name="arrow-back" size={25} color="#FFF" />
                //     </TouchableOpacity>
                //   );
                // },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
