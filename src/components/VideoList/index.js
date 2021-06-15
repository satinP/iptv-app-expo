import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Video } from "expo-av";

import styles from "./styles";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from "react-native-elements";

import { filter as lodashFilter } from "lodash";

const Separator = () => <View style={styles.separator} />;

export default function VideoList() {
  const [filteredChannel, setFilteredChannels] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://iptv-org.github.io/iptv/channels.json")
      .then((response) => response.json())
      .then((responseJson) => {
        setChannelList(responseJson);
        // setFilteredChannels(responseJson);
        filterChannel(responseJson, "Brazil");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**
   * Filter the channel list
   * @param field   Determines which field will be filtered
   * @param input   Determines the string that will be filtered
   */
  function filterChannel(field, input) {
    const filteredChannelList =
      field && lodashFilter(field, { countries: [{ name: input }] });

    setFilteredChannels(() => filteredChannelList);
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = channelList.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredChannels(newData);
      setSearch(text);
    } else {
      setFilteredChannels(channelList);
      setSearch(text);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.scrollView}>
        <BorderlessButton
          style={styles.button}
          onPress={() => setSelectedChannel(item.url)}
        >
          <Text>{item.name}</Text>
        </BorderlessButton>
      </View>
    );
  };

  return (
    <View>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(_) => searchFilterFunction("")}
        placeholder="Procure o canal aqui..."
        value={search}
      />

      <FlatList
        contentContainerStyle={styles.container}
        style={styles.scrollView}
        data={filteredChannel}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.video}>
        <Video
          source={{
            uri: selectedChannel
              ? selectedChannel
              : "http://bcsecurelivehls-i.akamaihd.net/hls/live/265320/5043843989001/140130JTDX/index_600.m3u8",
            overrideFileExtensionAndroid: "m3u8",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={true}
          useNativeControls={true}
          isLooping
          style={{ width: Dimensions.get("window").width, height: 300 }}
        />
      </View>
    </View>
  );
}
