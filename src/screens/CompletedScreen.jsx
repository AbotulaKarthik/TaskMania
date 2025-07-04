import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import { FlatList, View, Text,StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';
import { fontFamily } from '../constants/fontFamily';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CompletedScreen = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const loadCompletedTasks = async () => {
    const data = await AsyncStorage.getItem('completedTasks');
    setCompletedTasks(data ? JSON.parse(data) : []);
  };

  useFocusEffect(
    useCallback(() => {
      loadCompletedTasks();
    }, [])
  );

  const deleteCompletedTask = async (taskToDelete) => {
    const updated = completedTasks.filter(t => t.id !== taskToDelete.id);
    setCompletedTasks(updated);
    await AsyncStorage.setItem('completedTasks', JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingCon}>
        <Text style={styles.heading}>Completed Tasks</Text>
        <FontAwesome5 name="check-circle" size={24} color="#70e000" />
      </View>
      {
        completedTasks.length === 0 ? (
            <Text style={styles.empty}>Complete a Task To View</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={completedTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskCard item={item} onDelete={deleteCompletedTask} onComplete={()=>{}}/>}
      />
        )
      }
    </View>
  );
};

export default CompletedScreen;

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
    color:'#70e000',
    fontSize:23,
    textAlign:'center',
  },
  empty:{
    color:'#70e000',
    textAlign:'center',
    fontFamily:fontFamily.bold,
    marginTop:50
  }
})
