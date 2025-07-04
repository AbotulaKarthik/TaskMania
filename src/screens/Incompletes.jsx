import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontFamily } from '../constants/fontFamily'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskCard from '../components/TaskCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Incompletes = () => {

  const [oldTasks,setOldTasks] = useState([])

  useEffect(()=> {
    const fetchOldTasks = async ()=> {
      const data = await AsyncStorage.getItem('TASKS')
      const tasks = data ? JSON.parse(data) : []

      const fourDaysAgo = Date.now() - 4*24*60*60*1000

      const filtered = tasks.filter(task => {
        const createdAt = new Date(task.createdAt).getTime()
        return createdAt <= fourDaysAgo
      })

      setOldTasks(filtered)
    }

    fetchOldTasks()
  },[])

    const deleteIncompleteTask = async (taskToDelete) => {
      const updated = incompletes.filter(t => t.id !== taskToDelete.id);
      setIncompletes(updated);
      await AsyncStorage.setItem('TASKS', JSON.stringify(updated));
    };

    const completeIncompleteTask = async (taskToComplete) => {
      const remaining = incompletes.filter(t => t.id !== taskToComplete.id);
      setIncompletes(remaining);
      await AsyncStorage.setItem('TASKS', JSON.stringify(remaining));

      const completed = await AsyncStorage.getItem('completedTasks');
      const completedTasks = completed ? JSON.parse(completed) : [];
      completedTasks.push(taskToComplete);
      await AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    };

  return (
    <View style={styles.container}>
      <View style={styles.headingCon}>
        <Text style={styles.heading}>Incompletes</Text>
        <MaterialCommunityIcons name="calendar-alert" size={24} color="#d80032" />
      </View>
      {
        oldTasks.length === 0 ? (
          <Text style={styles.empty}>Tasks which are not completed from 4 days will appear here</Text>
        ) : (
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={oldTasks}
            keyExtractor={(item)=> item.id}
            renderItem={({item})=> <TaskCard item={item} onDelete={deleteIncompleteTask} onComplete={completeIncompleteTask}/>}
        />
        )
      }
    </View>
  )
}

export default Incompletes

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'#0a0908'
  },
  headingCon:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10,
    marginBottom:15
  },
  heading:{
      fontFamily:fontFamily.bold,
      color:'#d80032',
      fontSize:23,
      textAlign:'center',
  },
  empty:{
    color:'#d80032',
    textAlign:'center',
    fontFamily:fontFamily.bold,
    marginTop:50
  }
})