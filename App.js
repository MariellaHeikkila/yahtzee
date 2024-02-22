
import {  Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './components/Home';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'information'
                : 'information-outline';
            } else if (route.name === 'GameBoard') {
              iconName = focused 
              ? 'dice-multiple' 
              : 'dice-multiple-outline';
            } else if (route.name === 'ScoreBoard') {
              iconName = focused 
              ? 'view-list' 
              : 'view-list-outline';
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F545EC',
          tabBarInactiveTintColor: '#A0629D',
        })}
      >
        <Tab.Screen name="Home" component={Home}
         options={{tabBarStyle: {display: 'none'}}}
        />
        <Tab.Screen name="GameBoard" component={GameBoard} />
        <Tab.Screen name="ScoreBoard" component={ScoreBoard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


