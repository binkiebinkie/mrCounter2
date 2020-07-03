import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "storage";
export const storeData = async appState => {
  try {
    const jsonAppState = JSON.stringify(appState);
    // console.log("appState", appState);

    await AsyncStorage.setItem(STORAGE_KEY, jsonAppState).catch(err =>
      console.log(err)
    );
  } catch (e) {
    console.log("DANGIT! There was an error saving: ", e);
    // saving error
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY).catch(err =>
      console.log(err)
    );
    console.log("getData jsonValue");
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.log("DANGIT! There was an error getting data: ", e);

    // error reading value
  }
};
