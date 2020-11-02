import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Video } from 'expo-av';


const Separator = () => (
  <View style={styles.separator} />
);

export default function VideoList() {
  const [ channels, setChannels ] = useState();
  const [ selectedChannel, setSelectedChannel ] = useState('');

  useEffect(() => {
    fetch('https://iptv-org.github.io/iptv/channels.json')
      .then(res => res.json())
      .then(responseJson => {
        const filteredChannelList = responseJson.filter(channel => {
          return channel.country.name == 'Brazil';
        });
        setChannels(filteredChannelList);
      })
      .catch(error =>{
        console.log(error);
      });

    
  },[]);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {channels && channels.map(channel => {
          return (
            <View key={channel.name} style={styles.test}>
              <BorderlessButton style={styles.button}
                onPress={() => setSelectedChannel(channel.url)} >
                  <Text>
                    {channel.name}
                  </Text>
              </BorderlessButton>

              <Separator />
            </View>
          )
        })}

        <View style={styles.video}>
          <Video
            source={{ uri: (selectedChannel ? selectedChannel : 'http://bcsecurelivehls-i.akamaihd.net/hls/live/265320/5043843989001/140130JTDX/index_600.m3u8'), overrideFileExtensionAndroid: 'm3u8' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={true}
            useNativeControls={true}
            isLooping
            style={{ width: Dimensions.get('window').width, height: 300 }}
          />
        </View>
          
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    backgroundColor: '#fafafa',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  test: {}
});
