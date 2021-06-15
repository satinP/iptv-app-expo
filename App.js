import React from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import VideoList from "./src/components/VideoList";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <VideoList />
      <StatusBar />
    </SafeAreaView>
  );
}
// const windowHeigth =
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
});
