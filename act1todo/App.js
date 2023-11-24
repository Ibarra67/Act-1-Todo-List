import { Button, FlatList, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React, { useState } from "react";


export default function App() {
  const[todo, setTodo] = useState("");
  const[todolist, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

// Adding Function
  const handleAddTodo = () => {
    if(todo == ""){
      return;
    }

    setTodoList([...todolist, {id: Date.now().toString(),title: todo}]);
    setTodo("");

  };

// Delete Functions
const handleDeleteTodo = (id) => {
  const updateTodoList = todolist.filter((todo) =>todo.id !==id);

  setTodoList(updateTodoList);
};

// Edit Functions
const handleEditTodo = (todo) => {
  setEditedTodo(todo);
  setTodo(todo.title);
};

// Update Functions
const handleUpdateTodo = () => {
  const updatedTodos = todolist.map((item)=>{

    if(item.id == editedTodo.id){
      return { ...item, title: todo};
    }
    return item

  });
  setTodoList(updatedTodos)
  setEditedTodo(null)
  setTodo("");
}

// Buttons
  const renderTodos = ({item}) => {
    return (
      <View style={{
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        flex: 10,
        flexDirection: "row-reverse",
        alignItems: 'flex-end',
      }}>

        <Button title='edit'
        onPress={() => handleEditTodo(item)}/>

        <Button title='delete' 
        onPress = { () => handleDeleteTodo(item.id)}/>
        
        <Text style={{
          color: 'white',
          fontSize: 20,
          marginLeft: 5,
          flex: 2,
        }}>{item.title}</Text>
      </View>
    )
  }

  return (
    // Title and INPUT TEXT
    <SafeAreaView style={{ marginHorizontal: 16}}>
      <Text style={{
        marginTop: 50, padding: 20, 
        fontSize: 30, backgroundColor: "skyblue", 
        justifyContent: "flex-end",
        borderRadius: 10}}>TODO LIST</Text>
        
      <TextInput
      style={{
        borderWidth: 2,
        borderBlockColor: 'black',
        borderRadius: 5,
        paddingVertical: 6,
        marginTop: 5,
        padding: 10,
        }}
        placeholder='Add Task'
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
        />

      {editedTodo ? (
        <TouchableOpacity 
        style={{ 
          backgroundColor: 'blue',
          borderRadius: 6,
          paddingVertical: 12,
          marginTop: 20,
          }}

          onPress={() => handleUpdateTodo()}
          >
          <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
          }}> Save </ Text>  
        </TouchableOpacity>
        ):(

        <TouchableOpacity 
        style={{ 
          backgroundColor: 'blue',
          borderRadius: 6,
          paddingVertical: 12,
          marginTop: 20,
          }}

          onPress={() => handleAddTodo()}
          >
          <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
          }}> ADD </ Text>  
        </TouchableOpacity>
      )
      }
      <FlatList data={todolist} renderItem={renderTodos}/>
        
    </SafeAreaView>

  );
}


