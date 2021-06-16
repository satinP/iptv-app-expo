import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Video } from "expo-av";

import styles from "./styles";
import { SearchBar } from "react-native-elements";

import { filter as lodashFilter } from "lodash";
import { retrieveData, storeData } from "./storage";

const Separator = () => <View style={styles.separator} />;

export default function VideoList() {
  const [filteredChannel, setFilteredChannels] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [search, setSearch] = useState("");

  const checkSelectedChannel = async () => {
    try {
      const channel = await retrieveData("SELECTED_CHANNEL");
      if (channel !== null) {
        setSelectedChannel(channel);
      }
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    checkSelectedChannel();

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

  const handleChannelPress = (url) => {
    storeData("SELECTED_CHANNEL", url);
    setSelectedChannel(() => url);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.scrollView}>
        <BorderlessButton
          style={styles.button}
          onPress={() => handleChannelPress(item.url)}
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
        onClear={() => searchFilterFunction("")}
        placeholder="Procure o canal aqui..."
        value={search}
      />

      <FlatList
        contentContainerStyle={styles.flatListContainer}
        style={styles.scrollView}
        data={filteredChannel}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />

      <View style={styles.video}>
        <Video
          source={{
            uri: selectedChannel,
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
