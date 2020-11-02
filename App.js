import React from 'react';
import { StyleSheet, View, StatusBar  } from 'react-native';
import VideoList from './src/components/VideoList';


export default function App() {
  return (
    <View contentContainerStyle={styles.container}>
      <VideoList style={styles.test}/>
      <StatusBar style="auto" />
    </View>
  );
}
// const windowHeigth = 
const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    height: 400
  }
});
