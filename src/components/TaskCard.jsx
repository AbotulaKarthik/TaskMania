import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontFamily } from '../constants/fontFamily'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

const TaskCard = ({item,onDelete,onComplete}) => {

    const renderLeftAction = ()=> (
        <View style={styles.leftAction}>
            <MaterialIcons name={'check'} size={25} color={'#fff'} />
        </View>
    )
    const renderRightActions = () => (
    <View style={styles.rightAction}>
            <MaterialIcons name="delete" size={24} color="#fff" />
        </View>
     );

  return (
    <Swipeable
        renderLeftActions={renderLeftAction}
        renderRightActions={renderRightActions}
        onSwipeableLeftOpen={()=>onComplete(item)}
        onSwipeableRightOpen={()=>onDelete(item)}
    >
        <TouchableOpacity style={styles.taskCon} activeOpacity={0.8} >
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.botCon}>
            <View style={styles.catCon}>
                <Text style={styles.bot}>🏷️ {item.category}</Text>
            </View>
            <View style={styles.catCon1}>
                <Text style={styles.bot}>⏳ {new Date(item.createdAt).toDateString()}</Text>
            </View>
        </View>
    </TouchableOpacity>
    </Swipeable>
  )
}

export default TaskCard

const styles = StyleSheet.create({
    taskCon:{
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:'rgba(58, 134, 255, 0.09)',
        marginVertical:5,
        borderRadius:15
    },
    title:{
        color:'#fff',
        fontFamily:fontFamily.bold,
        fontSize:17,
        marginVertical:10
    },
    description:{
        color:'#fff',
        fontFamily:fontFamily.light,
        fontSize:13,
        marginBottom:10
    },
    botCon:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10
    },
    bot:{
        color:'#eee',
        fontFamily:fontFamily.bold,
        fontSize:12
    },
    catCon:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(58, 134, 255, 0.7)',
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:15
    },
    catCon1:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(58, 134, 255, 0.3)',
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:15
    },
    leftAction:{
        backgroundColor:'#70e000',
        alignItems:'center',
        justifyContent:'center',
        width:100,
        borderRadius:14,
        marginVertical:8
    },
    rightAction:{
        backgroundColor:'#ef233c',
        alignItems:'center',
        justifyContent:'center',
        width:100,
        borderRadius:14,
        marginVertical:8
    }
})