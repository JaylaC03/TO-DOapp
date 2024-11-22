//@ts-nocheck
import {useState} from 'react';
import { StyleSheet, Text,View, FlatList,Button,Modal} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals,setCourseGoals] = useState([]);
  const [modalIsVisible, SetModalIsVisible] = useState (false);

  function startAddGoalHandler(){
    SetModalIsVisible(true);
  }

  function endAddGoalHandler(){
    SetModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText){
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals, 
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id){
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal)=>goal.id !== id );
    });
  }

  return ( 
    <>
    <StatusBar/>
    <View style ={styles.container}>
      <Text style ={styles.titlestyle}>🌸TWO-DO+x+🌸</Text>
      <Button  title= 'Add New Goal' 
      color= 'hotpink' 
      onPress ={startAddGoalHandler}
      />
      <GoalInput visible ={modalIsVisible} onAddGoal={addGoalHandler} onCancel = {endAddGoalHandler}/>
      <View style = {styles.goalscontainers}>
        <FlatList 
          data ={courseGoals} 
          renderItem ={(itemData) => {
            return (
            <GoalItem 
            text ={itemData.item.text}
            id = {itemData.item.id}
             onDeleteItem = {deleteGoalHandler}/>
            );
          }}
          keyExtractor={(item,index) =>{
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
   </>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop:50,
    paddingHorizontal: 16,
    flex:1,
    backgroundColor: '#EFD5D9',
  },
 
  goalscontainers:{
    flex:5,

  },

  titlestyle:{
    textAlign:'center',
    color: 'hotpink',
    fontSize: 30,
  },
  containerss:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom:24,
    borderBottomWidth:1,
    borderBottomColor: 'hotpink',

  },
  Input:{
    borderWidth: 2,
    borderColor:'hotpink',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
});
