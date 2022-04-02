import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, FlatList, Image } from 'react-native';


export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const getMeals = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`);
      const data = await response.json();
      setMeals(data.meals);
      console.log(data.meals);
    }
    catch (error) {
      Alert.alert('Error', error);
      console.error(error);
    };
  }

  useEffect(() => {
    getMeals();
  }, [])


  const mealsList = meals.map((meal) => {
    return ({
      name: meal.strMeal,
      photo: meal.strMealThumb
    })
  });


  //Attempt 1 to show the list only, if it contains one or more meals.
  /* 
    const mealsList = () => {
    if (meals > 0) {
    meals.map((meal) => {
     return({
       name: meal.strMeal,
       photo: meal.strMealThumb
       }
     )})
      } else {
       return (
         Alert.alert('No meals with this ingredient')
       )
     }
  }; 
  */

  //Attempt 2 to show the list only, if it contains one or more meals.
  //If used, change in Flatlist data={showMeals}
  /*  
  const showMeals = () => {
      if (meals > 0) {
        { mealsList }
      } else {
        return (
          Alert.alert('No meals with this ingredient')
        )
      }
    };
    */

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '80%',
          backgroundColor: '#CED0CE',
          marginLeft: '10%',
          marginBottom: 10,
          marginTop: 10
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder='Ingredient'
        onChangeText={text => setKeyword(text)} />
      <View style={styles.row}>
        <View style={styles.button}>
          <Button onPress={getMeals} title='Find' />
        </View>
      </View>

      <FlatList
        //keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.name}</Text>
            <Image style={{ height: 100, width: 150 }} source={{ uri: item.photo }} />
          </View>}
        data={mealsList}
        ItemSeparatorComponent={listSeparator} />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 70
  },

  input: {
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    padding: 8,
    fontSize: 18,
    textAlign: 'center'
  },

  button: {
    width: '50 %',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center'
  }

});
