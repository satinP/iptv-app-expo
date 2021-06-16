import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (err) {
    throw new Error(err);
  }
};

export const retrieveData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    console.log({ returnedDAta: data });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
