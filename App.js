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
      let response = await fetch("https://apitestenv.vnforapps.com/api.security/v1/security", requestOptions);
      let token = await response.text();
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  const pay = async () => {
    const token = getNiubizToken();
    const data = {
      'name': 'Kevin',
      'lastname': 'Sandon',
      'email': 'sandon13496@gmail.com',
      'token': token,
      'merchant': '522591303',
      'purchase': '202107052033',
      'endpoint': 'https://apitestenv.vnforapps.com/',
      'pin': 'w+9oxEkAQVM2aZGzmUYiTP2L2VA0JnxqIvH2e/HPhV0='
    };
    try {
      const response = await NiubizModule.openNiubizForm(data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title = "Pagar"
        color="#841584"
        onPress={pay}
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
