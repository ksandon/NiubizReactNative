import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import NiubizModule from './NiubizModule';

export default function App() {

  const getNiubizToken = async () => {
    try {
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': 'Basic aW50ZWdyYWNpb25lcy52aXNhbmV0QG5lY29tcGx1cy5jb206ZDVlN25rJE0='
        },
        redirect: 'follow'
      };
      fetch("https://apitestenv.vnforapps.com/api.security/v1/security", requestOptions)
    .then(response => response.text())
    .then(result => pay(result))
    } catch (error) {
      console.log("Error Niubiz token");
      console.error(error);
    }
  }

  const pay = async (token) => {
    console.log(`Niubiz token: ${token}`);
    const data = {
      'name': 'Kevin',
      'lastname': 'Sandon',
      'email': 'sandon13496@gmail.com',
      'amount': '20.50',
      'token': token,
      'merchant': '522591303',
      'purchase': '202107052033',
      'endpoint': 'https://apitestenv.vnforapps.com/',
      'pin': 'w+9oxEkAQVM2aZGzmUYiTP2L2VA0JnxqIvH2e/HPhV0='
    };
    console.log("Open Niubiz form");
    try {
      const response = await NiubizModule.openNiubizForm(data);
      console.log(`Niubiz response: ${response}`);
    } catch (e) {
      console.log("Error open Niubiz form");
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title = "Pagar"
        color="#841584"
        onPress={getNiubizToken}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
