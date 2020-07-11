import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from '../components/Card';
import HomeActionButtons from '../components/HomeActionButtons';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import {BlurView} from '@react-native-community/blur';

import {CountersContext} from '../state/CountersContext';
import {withTheme} from 'react-native-elements';

//rsf
function HomeScreen({navigation, theme}) {
  const {counters, numSelCounters, settings} = useContext(CountersContext);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [isEditing, setIsEditing] = useState('');
  const [triggerSubmitTitle, setTriggerSubmitTitle] = useState('');

  const openCloseButton = () => {
    setShouldDelete(false);
    setTriggerSubmitTitle(isEditing);
    setIsEditing('');
  };
  const darkMode = settings.find((setting) => setting.id === 'darkMode');

  return (
    <SafeAreaView style={styles.safeArea(theme)}>
      <ImageBackground
        source={
          darkMode && darkMode.selected
            ? require('../assets/AppBackground.png')
            : require('../assets/AppBackgroundBeige.png')
        }
        style={styles.appBg}>
        <Header navigation={navigation} />
        {/* { numSelCounters === 0 ? (
          <IntroScreen />
        ) : ( */}
        <ScrollView style={styles.container(theme)}>
          <View style={styles.containerView(theme)}>
            <SectionTitle sectionTitle={'Most recent'} />
            <View style={styles.counterContainer}>
              {counters
                ? counters.map((counter, i) => (
                    <Card
                      key={i}
                      counter={counter}
                      index={i}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      triggerSubmitTitle={triggerSubmitTitle}
                      setTriggerSubmitTitle={setTriggerSubmitTitle}
                    />
                  ))
                : null}
              <View
                style={{
                  height: 80,
                  width: '100%',
                  opacity: 0,
                }}></View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.blurViewContainer}>
          <BlurView blurType={'light'} style={[styles.blurView]}></BlurView>
        </View>
        {/* )} */}
        <HomeActionButtons
          navigation={navigation}
          setShouldDelete={setShouldDelete}
          shouldDelete={shouldDelete}
        />
        {(shouldDelete || isEditing.length > 0) && (
          <TouchableWithoutFeedback onPress={() => openCloseButton()}>
            <View style={[styles.closeButton]}></View>
          </TouchableWithoutFeedback>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

//rnss
const styles = StyleSheet.create({
  appBg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'repeat',
  },
  blurViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,

    overflow: 'hidden',
    height: 90,
  },
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    minHeight: '100%',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  container: (theme) => ({
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 100,
  }),
  containerView: (theme) => ({
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 125,
    minHeight: '100%',
  }),
  counterContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  safeArea: (theme) => ({
    backgroundColor: theme.colors.Black,
    flex: 1,
  }),
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

export default withTheme(HomeScreen);
