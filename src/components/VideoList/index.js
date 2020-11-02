import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, ScrollView, Button } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Video } from 'expo-av';

import styles from './styles';

const Separator = () => (
  <View style={styles.separator} />
);

export default function VideoList() {
  const [ filteredChannel, setFilteredChannels ] = useState();
  const [ channelList, setChannelList ] = useState();
  const [ selectedChannel, setSelectedChannel ] = useState('');

  useEffect(() => {
    if (filteredChannel) {
      setFilteredChannels(null);
    }

    fetch('https://iptv-org.github.io/iptv/channels.json')
      .then(res => res.json())
      .then(responseJson => {

        setChannelList(responseJson);

        filterChannel();
      })
      .catch(error =>{
        console.log(error);
      });

    
  },[]);

  /**
   * Filter the channel list
   * @param field   Determines which field will be filtered
   * @param input   Determines the string that will be filtered
   */
  function filterChannel(field, input) {
    const filteredChannelList = channelList.filter(channel => {
      return channel.country.name == 'Brazil';
      // return channel.category == 'Documentary';
    });

    setFilteredChannels(filteredChannelList);
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
        {filteredChannel && filteredChannel.map(channel => {
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

      </ScrollView>
      <View style={styles.video}>
          <Video
            source={{ uri: selectedChannel ? selectedChannel : 
                          'http://bcsecurelivehls-i.akamaihd.net/hls/live/265320/5043843989001/140130JTDX/index_600.m3u8', 
                      overrideFileExtensionAndroid: 'm3u8',
                    }}
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
    </View>
  );
}