import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function CalculatorApp() {

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
    width: '20%',
    marginTop: 20,
    flexDirection:'row', 
    justifyContent: 'space-evenly',  

    },
  });
  
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

      </View>

      <FlatList
        data={data}
        renderItem={({item}) => 
            <Text>{item.key}</Text>}
      />

    </View>
  );
}

