import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import { NavigationContainer} from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
      
    },

    text: {
      paddingBottom: 20,
      paddingTop: 200,

    },

    input: {
      width: '20%',
      width:80, 
      borderColor:'purple', 
      borderWidth:2,
      color: 'purple',
      justifyContent: 'space-evenly', 
      
    }, 
    operators: {
    width: '40%',
    marginTop: 20,
    flexDirection:'row', 
    justifyContent: 'space-evenly',  

    },
  });

  const Stack = createNativeStackNavigator();

  function Home({ navigation }){
  
  const [count, setCount] = useState('');
  const [count2, setCount2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);


  const subtraction= () =>{
    let result = Number(count) - Number(count2); 
    setResult(result);
    const historyItem = `${count} - ${count2} = ${result}`;
    setData([...data, {key: historyItem}]);
    setCount('')
    setCount2('')
  }

  const addition= () =>{
    let result = Number(count) + Number(count2); 
    setResult(result);
    const historyItem = `${count} + ${count2} = ${result}`;
    setData([...data, {key: historyItem}]);
    setCount('')
    setCount2('')
  }


  return (
    
    <View style={styles.container}>
      <Text style={styles.text} color="purple" >Result: {result}  </Text>
      <TextInput style={styles.input}
        keyboardType= 'number-pad'
        onChangeText={text=> setCount(text)}
        value={count}/>
      <TextInput style={styles.input}
        keyboardType= 'number-pad'
        onChangeText={text=> setCount2(text)}
        value={count2}/>
      <View  style={styles.operators}>
        <Button  onPress={addition} title="+" color="purple" /> 
        <Button onPress={subtraction} title="-" color="purple"/> 

        <Button
      onPress={()=>navigation.navigate('History', {data})}
      title="History" color="purple"   />

      </View>
    </View>
  );
}

function History({ route, navigation }){
  const { data } = route.params;
  return (
    <View style={styles.container}>

<FlatList
data={data}
renderItem={({item}) => 
    <Text>{item.key}</Text>}
/>

</View>
  )
}

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );			
}
