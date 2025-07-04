import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import { fontFamily } from '../constants/fontFamily'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const navigation = useNavigation()

  const [tasks,setTasks] = useState([])

  useEffect(()=>{
      loadTasks()
  },[navigation])

  const loadTasks = async ()=> {
    try {
      const data = await AsyncStorage.getItem('TASKS')
      if(data){
        setTasks(JSON.parse(data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  //// delete task =============================
  const deletetask = async (taskToDelete) => {
    const filtered = tasks.filter(t => t.id !== taskToDelete.id)
    setTasks(filtered)
    await AsyncStorage.setItem('TASKS',JSON.stringify(filtered))
  }
  /// complete task ==============================
  const completeTask = async (taskToComplete) =>{
    const remaining = tasks.filter(t=> t.id !== taskToComplete.id)
    setTasks(remaining)
    await AsyncStorage.setItem('TASKS', JSON.stringify(remaining))

    const completed = await AsyncStorage.getItem('completedTasks')
    const completedTasks = completed ? JSON.parse(completed) : []
    completedTasks.push(taskToComplete)
    await AsyncStorage.setItem('completedTasks',JSON.stringify(completedTasks))
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.headingCon}>
        <Text style={styles.heading}>You Got This</Text>
        <Entypo name="rocket" size={24} color="#3a86ff" />
      </View>
      {
        tasks.length === 0 ? (
            <Text style={styles.emptyTasks}>
              ADD A TASK
            </Text>
        ) : (
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={tasks}
            keyExtractor={(item)=> item.id}
            renderItem={({item})=>(<TaskCard item={item} onDelete={deletetask} onComplete={completeTask} />
            )}
      />
        )
      }
      <TouchableOpacity style={styles.addIcon} activeOpacity={0.3} onPress={()=>navigation.navigate('AddTaskScreen')}>
        <MaterialCommunityIcons name={'plus'} color={'#fff'} size={29} />
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'#0a0908',
    position:'relative'
  },
  headingCon:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:15,
    marginBottom:20
  },
  heading:{
    color:'#4895ef',
    fontSize:22,
    fontFamily:fontFamily.bold,
  },
  addIcon:{
    width:55,
    height:55,
    backgroundColor:'#4895ef',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
    shadowColor:'#000',
    shadowOffset:{
      width:5,
      height:5
    },
    shadowOpacity:0.95,
    elevation:40,
    position:'absolute',
    right:40,
    bottom:40,
    zIndex:10
  },
  plus:{
    fontSize:50,
    color:'#fff',
  },
  emptyTasks:{
    color:'#dd2d4a',
    textAlign:'center',
    fontFamily:fontFamily.bold,
    fontSize:32,
    marginTop:70
  }
})