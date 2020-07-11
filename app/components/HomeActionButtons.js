import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Easing,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {CountersContext} from '../state/CountersContext';
import {withTheme} from 'react-native-elements';

const screenWidth = Math.floor(Dimensions.get('window').width);
const containerMargin = 8;
const delDimensions = 43;
const duration = 200;

function HomeActionButtons({navigation, theme, shouldDelete, setShouldDelete}) {
  const {numSelCounters, addCounter, removeCounters} = useContext(
    CountersContext,
  );
  const numSel = numSelCounters.length;

  const goWidth = useRef(
    new Animated.Value(
      numSel > 0
        ? (screenWidth - containerMargin * 4 - delDimensions) * 0.7
        : 100,
    ),
  ).current;
  const newWidth = useRef(
    new Animated.Value(
      numSel > 0
        ? (screenWidth - containerMargin * 4 - delDimensions) * 0.3
        : screenWidth - containerMargin * 2,
    ),
  ).current;
  const goOpacity = useRef(new Animated.Value(numSel > 0 ? 1 : 0)).current;
  const newOpacity = useRef(new Animated.Value(1)).current;
  const delLeft = useRef(new Animated.Value(numSel > 0 ? 0 : -delDimensions))
    .current;
  const delWidth = useRef(new Animated.Value(delDimensions)).current;

  if (numSel === 0) {
    Animated.timing(goWidth, {
      toValue: 100,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(newWidth, {
      toValue: screenWidth - containerMargin * 2,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(newOpacity, {
      toValue: 1,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(goOpacity, {
      toValue: 0,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(delLeft, {
      toValue: -delDimensions * 2,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
    Animated.timing(delWidth, {
      toValue: delDimensions,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }
  if (numSel >= 1) {
    Animated.timing(goWidth, {
      toValue: (screenWidth - containerMargin * 4 - delDimensions) * 0.7,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(newOpacity, {
      toValue: 1,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(newWidth, {
      toValue: (screenWidth - containerMargin * 4 - delDimensions) * 0.3,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(goOpacity, {
      toValue: 1,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();

    Animated.timing(delLeft, {
      toValue: containerMargin,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
    Animated.timing(delWidth, {
      toValue: delDimensions,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }
  if (shouldDelete) {
    Animated.timing(delLeft, {
      toValue: containerMargin,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
    Animated.timing(goOpacity, {
      toValue: 0,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
    Animated.timing(newWidth, {
      toValue: 100,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
    Animated.timing(goWidth, {
      toValue: 100,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
    Animated.timing(delWidth, {
      toValue: screenWidth - containerMargin * 2,
      useNativeDriver: false,
      duration,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }

  const shouldDeleteCounters = () => {
    if (shouldDelete) {
      removeCounters();
      setShouldDelete(false);
    } else {
      setShouldDelete(true);
    }
  };

  return (
    <View style={[styles.buttonContainer, {zIndex: shouldDelete ? 500000 : 0}]}>
      <BlurView blurType={'light'} style={[styles.blurView]}></BlurView>
      <Animated.View
        style={[
          styles.bottomButton,
          styles.delButton(theme),
          {
            opacity: shouldDelete ? 1 : goOpacity,
            left: delLeft,
            position: delLeft === containerMargin ? 'relative' : 'absolute',
            width: delWidth,
          },
        ]}
        disabled={numSel < 1 ? true : false}>
        <View
          style={[{backgroundColor: theme.colors.Grey3}, styles.actionButton]}>
          <Image
            source={require(`../assets/Trash.png`)}
            style={styles.buttonImg}
          />
        </View>
        <Text style={styles.buttonText}>
          {shouldDelete ? `Delete ${numSel} Counters` : ''}
        </Text>
        <TouchableOpacity
          style={[styles.buttonPress]}
          onPress={() => shouldDeleteCounters()}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bottomButton,
          styles.newButton(theme, numSel),
          {
            width: newWidth,
            marginLeft:
              numSel > 0 ? (shouldDelete ? screenWidth : 8 + delDimensions) : 0,
            opacity: newOpacity,
          },
        ]}>
        <View
          style={[styles.actionButton, {backgroundColor: theme.colors.Grey3}]}>
          <Image
            source={require(`../assets/Plus.png`)}
            style={styles.buttonImg}
          />
        </View>
        <Text style={styles.buttonText}>
          {numSel > 0 ? '' : 'Add New Counter'}
        </Text>
        <TouchableOpacity
          style={styles.buttonPress}
          onPress={() => addCounter()}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bottomButton,
          styles.goButton(theme),
          {width: goWidth, opacity: goOpacity},
        ]}
        disabled={numSel < 1 ? true : false}>
        <Text style={styles.buttonText}>Go Count</Text>
        <View
          style={[{backgroundColor: theme.colors.Grey3}, styles.actionButton]}>
          <Image
            source={require(`../assets/Forward.png`)}
            style={styles.buttonImg}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonPress}
          onPress={() => navigation.navigate('Counters')}
        />
      </Animated.View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  actionButton: {
    width: 35,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
  },
  buttonContainer: {
    position: 'absolute',
    padding: containerMargin,
    bottom: '5%',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  blurView: {
    padding: containerMargin,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  buttonPress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    opacity: 0.5,
    borderRadius: 8,
  },
  buttonImg: {
    height: 16,
    resizeMode: 'contain',
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
  },
  delButton: (theme) => ({
    backgroundColor: theme.colors.Grey1,
    height: delDimensions,
    paddingRight: 12,
    zIndex: 100,
    top: containerMargin,
  }),
  newButton: (theme, numSel) => ({
    paddingRight: 12,
    marginRight: 8,
    backgroundColor: numSel > 0 ? theme.colors.Grey1 : theme.colors.Black,
  }),
  goButton: (theme) => ({
    backgroundColor: theme.colors.Black,
    paddingLeft: 12,
  }),
});

export default withTheme(HomeActionButtons);
