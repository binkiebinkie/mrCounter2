import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
  Easing,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {CountersContext} from '../state/CountersContext';
import {withTheme} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import {TouchableOpacity} from 'react-native-gesture-handler';

const screenWidth = Math.floor(Dimensions.get('window').width);

function HeaderPlain({navigation: {goBack}, theme, showSettings}) {
  const {numSelCounters} = useContext(CountersContext);
  const numSel = numSelCounters.length;

  return (
    <View style={styles.container(theme)}>
      <TouchableWithoutFeedback onPress={() => goBack()}>
        <Image
          source={require('../assets/Back.png')}
          style={styles.backButton}
        />
      </TouchableWithoutFeedback>
      {showSettings && (
        <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={styles.settingsTouch}
            onPress={() => navigation.navigate('Settings')}>
            <Image
              source={require('../assets/Settings.png')}
              style={[styles.settings]}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: 'relative',
    justifyContent: 'space-between',
    padding: 8,
    paddingTop: 20,
    paddingBottom: 0,
  }),
  backButton: {width: 10, resizeMode: 'contain'},
  settings: {
    width: screenWidth * 0.064,
    height: screenWidth * 0.064,
    resizeMode: 'contain',
  },
  settingsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: screenWidth * 0.064,
    paddingBottom: 15,
    paddingRight: 25,
    zIndex: 500000,
  },
  settingsTouch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(HeaderPlain);
