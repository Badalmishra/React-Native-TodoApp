import React from 'react';
import { StyleSheet, Text, View, ScrollView, ToastAndroid, Vibration } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todos:[],
      newTodo:'',
    }
  }
  toast(msg){
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }
  addNewTodo(){
    const newTodo = {msg:this.state.newTodo,status:true}
    if (newTodo.msg == '') {
      this.toast('Please write a todo first')
      Vibration.vibrate(100);
    } else{
      this.setState({
        todos:[...this.state.todos,newTodo],
        newTodo:''
      },()=>{
        this.toast('Todo Added')
      })
    }
  }
  markComplete(i){
    let todos = this.state.todos
    todos[i].status = todos[i].status?false:true
    const status = todos[i].status?'active':'completed'
    this.setState({todos},()=>{
      this.toast('Todo Marked : '+status)
    })
  }
  removeTodo(i){
    let todos = this.state.todos
    todos.splice(i,1)
    this.setState({todos},()=>{
      this.toast('Todo Removed')
      Vibration.vibrate(100);
    })
  }
  render(){
    return(
    <View style={styles.container}>
       <Text 
        style={{
          fontSize:25,
          padding:10,
          borderBottomColor:"grey",
          borderBottomWidth:3,
          backgroundColor:"yellowgreen",
          marginBottom:5,
          width:"100%"}}>
         TodoApp
       </Text>
       <View style={styles.console}>
        <TextInput
          style={styles.input}
          onChangeText={(newTodo) => this.setState({newTodo})}
          label="Enter New Todo"
          value={this.state.newTodo}
        />
        <Button icon="send" mode="contained" style={styles.button} onPress={this.addNewTodo.bind(this)}>
          
        </Button>
      </View>
      <View style={styles.todoBox}>
        <ScrollView >
          {this.state.todos.length <1 ? 
          <Text 
              style={{
                fontSize:25,
                padding:10,
                borderBottomColor:"grey",
                borderBottomWidth:3,
                marginBottom:5,
                width:"100%"}}>
              No Todos...
            </Text>
            :null
          }
          {this.state.todos.map((todo,i)=>(
            <View 
              key={i} 
              style={[styles.todos,{backgroundColor:todo.status?"white":"darkgrey"}]}
              >
              <Text 
                onPress={()=>this.markComplete(i)}
                onLongPress={()=>this.removeTodo(i)} 
                style={[styles.msg]}>
                 {todo.msg} 
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 30,
  },
  todoBox:{
    flexDirection:"row",
    flex:8,
    padding:10
  },
  todos:{
    padding:8,
    marginBottom:3,
    borderColor:"black",
    borderWidth:1,
    borderRadius:10
  },
  msg:{
    fontSize:20,
    color:"grey"
  },
  console:{
    flexDirection:"row",
    flex:1,
    paddingBottom:10
  },
  input:{
    flex:1
  },
  button:{
    alignContent:'center',
    justifyContent:'center'
  }
});
