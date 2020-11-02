import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import VideoList from './src/components/VideoList';


export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <VideoList style={styles.test}/>
      <StatusBar style="auto" />
    </SafeAreaView>
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
