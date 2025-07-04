import { FlatList, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { fontFamily } from '../constants/fontFamily';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = ["Education","Personal","Work","Health","Finance","Travel"]

const AddTaskScreen = () => {

    const navigation = useNavigation()

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState(categories[0])

    const handleAddTask = async ()=> {
        if(!title || !description){
            return
        }

        const newTask = {
            id: uuid.v4(),
            title,
            description,
            category,
            createdAt: new Date().toISOString(),
            completed:false
        }
        const existingTasks = await AsyncStorage.getItem('TASKS')
        const updatedTasks = existingTasks?JSON.parse(existingTasks) : []
            
        updatedTasks.push(newTask)
        await AsyncStorage.setItem('TASKS',JSON.stringify(updatedTasks))
        navigation.navigate('HomeScreen')

    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={()=>navigation.navigate('HomeScreen')}>
                <MaterialIcons name="arrow-back-ios" size={24} color="#48e" />
            </TouchableOpacity>
            <Text style={styles.headertxt}>Add A Task 📝</Text>
        </View>
        <View style={styles.totalInputCon}>
            <Text style={styles.text}>Title</Text>
            <View style={styles.inputCon}>
                <TextInput 
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Title of the task'
                    placeholderTextColor={'#aaa'}
                    style={{fontFamily:fontFamily.light,color:'#fff'}}
                />
            </View>
            <Text style={styles.text}>Description</Text>
            <View style={styles.inputCon}>
                <TextInput 
                    value={description}
                    onChangeText={setDescription}
                    placeholder='Description for the task'
                    placeholderTextColor={'#aaa'}
                    style={{fontFamily:fontFamily.light,color:'#fff'}}
                />
            </View>
            <Text style={styles.text}>Category</Text>
            <FlatList 
                data={categories}
                renderItem={({item})=>(
                    <TouchableOpacity 
                        style={[styles.catCon,
                        {backgroundColor:category===item?'#48e':'rgba(58, 134, 255, 0.4)'}]}
                        onPress={()=>setCategory(item)}
                    >
                        <Text style={styles.cat}>{item}</Text>
                    </TouchableOpacity>
                )
                }
                horizontal
            />
            <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handleAddTask}>
                <Text style={styles.butTxt}>ADD TASK</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default AddTaskScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#0a0908'
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20
    },
    headerIcon:{
        marginVertical:10,
        marginHorizontal:10,
    },
    headertxt:{
        color:'#48e',
        marginLeft:50,
        fontFamily:fontFamily.bold,
        fontSize:24
    },
    totalInputCon:{
        paddingHorizontal:20
    },
    text:{
        fontFamily:fontFamily.bold,
        color:'#48e',
        fontSize:19,
        marginBottom:5

    },
    inputCon:{
        backgroundColor:'rgba(58, 134, 255, 0.1)',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:10,
        marginBottom:20
    },
    catCon:{
        backgroundColor:'rgba(58, 134, 255, 0.5)',
        paddingVertical:10,
        paddingHorizontal:15,
        margin:6,
        borderRadius:18
    },
    cat:{
        fontFamily:fontFamily.bold,
        color:'#fff',
        fontSize:11
    },
    button:{
        backgroundColor:'#48e',
        marginVertical:40,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        borderRadius:15
    },
    butTxt:{
        fontFamily:fontFamily.bold,
        color:'#fff'
    }
})