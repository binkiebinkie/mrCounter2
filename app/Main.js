import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CountersContext} from './state/CountersContext';
import {guidGenerator} from './helpers';
import {ThemeProvider} from 'react-native-elements';
import {withTheme} from 'react-native-elements';
import {storeData, getData} from './storage';
import KeepAwake from 'react-native-keep-awake';
import moment from 'moment';

import HomeScreen from './screens/HomeScreen';
import CountersScreen from './screens/CountersScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

const darkModeColors = {
  primary: '#EAE6E1',
  Beige1: '#EAE6E1',

  Grey1: '#4D4D4D',
  Grey2: '#69696C',
  Grey3: '#979797',
  Grey4: '#DCDCDB',
  LightGrey: '#F2F3F3',
  Black: '#2B2C2E',
  Darkest: '#211E1E',
  White: '#F9F7F8',
  PureWhite: '#FFFFFF',

  DeepBeige: '#897A5E',
  DarkBeige: '#AAA191',

  Green: '#3AC34F',

  Blue: '#1681FF',
  MidBlue: '#88BFFF',
  LightBlue: '#E8F2FF',
};

//rsf
function Main(props) {
  const [counters, setCounters] = useState([]);
  const [numSelCounters, setNumSelCounters] = useState([]);
  const [settings, setSettings] = useState([]);
  const [stayAwake, setStayAwake] = useState(false);

  let theme = {
    colors: {
      primary: '#EAE6E1',
      Beige1: '#EAE6E1',

      Grey1: '#4D4D4D',
      Grey2: '#69696C',
      Grey3: '#979797',
      Grey4: '#DCDCDB',
      LightGrey: '#F2F3F3',
      Black: '#2B2C2E',
      Darkest: '#211E1E',
      White: '#F9F7F8',
      PureWhite: '#FFFFFF',

      DeepBeige: '#897A5E',
      DarkBeige: '#AAA191',
      Beige1: '#EAE6E1', //BGBeige
      Beige4: '#4B3F29',

      ScreenGreen: '#DFE5E0',
      ScreenGreen0: '#EDF2EE',
      ScreenGreen2: '#C8D7C7',
      ScreenGreen3: '#C5E0CE',
      ScreenGreen5: '#66B59D',

      Blue: '#1681FF',
      MidBlue: '#88BFFF',
      LightBlue: '#E8F2FF',

      Green: '#3AC34F',
      Yellow: '#FCD24C',
      Orange: '#FF7426',
      Red: '#EE1C1C',
      Red2: '#FFACAC',
    },
  };

  useEffect(() => {
    async function fetchData() {
      const storageState = await getData().catch(err => console.log(err));
      const {numSelCounters, counters, settings} = storageState;

      setCounters(counters);
      setNumSelCounters(numSelCounters);
      setSettings(
        Object.keys(settings).length > 0
          ? settings
          : [
              {
                id: 'darkMode',
                title: 'Dark Mode',
                selected: false,
                description: 'Makes the UI dark.',

                selectedSlant: Math.random() > 0.5 ? '-1deg' : '1deg',
              },
              {
                id: 'keepScreenOn',
                title: 'Keep Screen On',
                selected: false,
                description: 'For dabbling counters.',
                selectedSlant: Math.random() > 0.5 ? '-1deg' : '1deg',
              },
              {
                id: 'leftHanded',
                title: 'Left Handed',
                selected: false,
                description: 'Moves buttons to the left.',
                selectedSlant: Math.random() > 0.5 ? '-1deg' : '1deg',
              },
              {
                id: 'flirting',
                title: 'Flirting',
                selected: false,
                description: "Don't you dare turn me on.",
                selectedSlant: Math.random() > 0.5 ? '-1deg' : '1deg',
              },
            ],
      );
    }
    fetchData();
  }, []);

  useEffect(() => countSelectedThenSet(), [counters]);
  useEffect(() => {
    async function saveStorage() {
      saveToStorage();
    }

    const keepScreenOn = settings.find(
      setting => setting.id === 'keepScreenOn',
    );
    if (keepScreenOn) setStayAwake(keepScreenOn.selected);

    const darkMode = settings.find(setting => setting.id === 'darkMode');
    if (darkMode && darkMode.selected) {
      theme.colors = {...darkModeColors};
    }

    saveStorage();
  }, [settings]);

  const saveToStorage = async () =>
    await storeData({
      counters,
      numSelCounters,
      settings,
    });

  // ensure number of selected state is accurate
  const countSelectedThenSet = () => {
    let numSelected = [];

    counters.forEach(counter =>
      counter.selected === true ? numSelected.push(counter.id) : null,
    );
    setNumSelCounters(numSelected);
    saveToStorage();
  };

  // add a new counter with a title
  const addCounter = (title, count) => {
    const newCounter = {
      title: title
        ? title
        : `${moment().format('MMMM Do, YYYY')} ${counters.length}`,
      count: count >= 0 ? count : 0,
      id: guidGenerator(),
      selected: false,
      incrementAmount: 1,
      selectedSlant: Math.random() > 0.5 ? '-1deg' : '1deg',
      newCounter: true,
    };

    setCounters([newCounter, ...counters]);
  };

  // find counter by id remove
  const removeCounters = () => {
    const newCounters = [...counters];

    const removeSelectedArray = newCounters.filter(
      counter => !counter.selected,
    );

    setCounters(removeSelectedArray);
  };

  // find counter or setting by id then toggle selected state
  const toggleSelect = (id, isCounter) => {
    const arrToMap = isCounter ? counters : settings;
    const newArr = arrToMap.map((obj, i) => {
      if (obj.id !== id) return obj;
      const newObj = {...obj};
      newObj.selected = !obj.selected;
      return newObj;
    });
    if (isCounter) {
      setCounters(newArr);
    } else {
      setSettings(newArr);
    }
  };

  // edit counter by id
  const editCounter = (id, key, value) => {
    const newCounters = [...counters];
    const indexOfCounter = newCounters.findIndex(counter => counter.id === id);
    const newCounter = {...counters[indexOfCounter]};
    newCounter[key] = value;

    newCounters[indexOfCounter] = newCounter;

    setCounters(newCounters);
  };
  console.log(stayAwake, 'stayAwake');

  return (
    <ThemeProvider theme={theme}>
      <CountersContext.Provider
        value={{
          counters,
          setCounters,
          numSelCounters,
          countSelectedThenSet,
          addCounter,
          removeCounters,
          toggleSelect,
          editCounter,
          settings,
          setSettings,
        }}>
        <NavigationContainer>
          <SafeAreaView style={styles.container(theme)}>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Counters"
                component={CountersScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
        {stayAwake && <KeepAwake />}
      </CountersContext.Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.Black,
  }),
});

export default withTheme(Main);
