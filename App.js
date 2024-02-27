
import {  Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './components/Home';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import { moderateScale, verticalScale } from './constants/Metrics'


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#332E2C',
          },
          headerTintColor: '#f5e8e3',
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
            return <MaterialCommunityIcons name={iconName} size={moderateScale(30)} color={color} />;
          },
          tabBarActiveTintColor: '#F0681A',
          tabBarInactiveTintColor: '#C56B37',
          tabBarStyle: {
            backgroundColor: '#332E2C', 
            height: verticalScale(70),
            },
          tabBarLabelStyle: {fontSize: moderateScale(14)}
          
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


