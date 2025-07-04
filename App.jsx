import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CompletedScreen from './src/screens/CompletedScreen'
import Incompletes from './src/screens/Incompletes'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddTaskScreen from './src/screens/AddTaskScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()

const MyStackNavigator = ()=> {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      <Stack.Screen name='AddTaskScreen' component={AddTaskScreen} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const MyTabNavigator = ()=>{
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarActiveTintColor:'#3a86ff',
        tabBarStyle:{
          backgroundColor:'#000000',
          height:65,
          paddingTop:7,
          borderTopColor:'#000'
        }
      }}
    >
      <Tab.Screen 
        name='HomeStack' 
        component={MyStackNavigator} 
        options={{
          tabBarIcon: ({color,size,focused})=>(
              <View style={{
                width:size*3,
                height:size*1.5,
                backgroundColor:focused?'rgba(58, 134, 255, 0.4)':'transparent',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:20,
                paddingTop:5,
                paddingBottom:10
              }}>
                <FontAwesome5 name="clipboard-list" size={size} color={color} />
              </View>
          )
        }}
      />
      <Tab.Screen 
        name='CompletedScreen' 
        component={CompletedScreen} 
        options={{
          tabBarIcon: ({color,size,focused})=>(
              <View style={{
                width:size*3,
                height:size*1.5,
                backgroundColor:focused?'rgba(112, 224, 0, 0.3)':'transparent',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:20
              }}>
                <Octicons name="checklist" size={size} color={focused?'#70e000':color} />
              </View>
          )
        }}
      />
      <Tab.Screen 
        name='IncompleteScreen' 
        component={Incompletes} 
        options={{
          tabBarIcon: ({color,size,focused})=>(
            <View style={{
              width:size*3,
                height:size*1.5,
                backgroundColor:focused?'rgba(216, 0, 50, 0.2)':'transparent',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:20
            }}>
              <MaterialCommunityIcons name="progress-clock" size={size} color={focused?'#d80032':color} />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <MyTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})