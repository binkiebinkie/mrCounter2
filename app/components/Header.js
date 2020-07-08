import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
  Easing,
  StatusBar,
} from 'react-native';
import {CountersContext} from '../state/CountersContext';
import {withTheme} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import {TouchableOpacity} from 'react-native-gesture-handler';

const screenWidth = Math.floor(Dimensions.get('window').width);
// const eyeWidth = 32;

function Header({navigation, theme}) {
  const {numSelCounters} = useContext(CountersContext);
  const numSel = numSelCounters.length;

  const eyePos = useRef(new Animated.Value(50)).current;
  const eyeLidPos = useRef(new Animated.Value(1)).current;
  const eyeWidth = useRef(new Animated.Value(0)).current;
  const eyeRingSizeOp1 = useRef(new Animated.Value(0)).current;
  const eyeRingSizeOp2 = useRef(new Animated.Value(0)).current;
  const eyeRingSizeOp3 = useRef(new Animated.Value(0)).current;
  const eyeRingSize1 = useRef(new Animated.Value(32)).current;
  const eyeRingSize2 = useRef(new Animated.Value(32)).current;
  const eyeRingSize3 = useRef(new Animated.Value(32)).current;
  const eyeRingSize4 = useRef(new Animated.Value(32)).current;
  const eyeRingSize5 = useRef(new Animated.Value(32)).current;
  const eyeRingSize6 = useRef(new Animated.Value(32)).current;
  const settingsSpin = useRef(new Animated.Value(0)).current;
  const eyeballWidth = useRef(new Animated.Value(4)).current;
  const outlineHeight = useRef(new Animated.Value(15)).current;
  const blurViewTop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (numSel === 0) {
      Animated.timing(eyePos, {
        toValue: 50,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeballWidth, {
        toValue: 4,
        useNativeDriver: false,
        duration: 300,
        delay: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      // Eyelid moving down
      Animated.timing(eyeLidPos, {
        toValue: 1,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      // Eyelid bg closing (whites of eyes)
      Animated.timing(eyeWidth, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.linear,
      }).start();

      Animated.timing(outlineHeight, {
        toValue: 15,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(blurViewTop, {
        toValue: -300,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp1, {
        toValue: 0,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp2, {
        toValue: 0,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp3, {
        toValue: 0,
        useNativeDriver: false,
        duration: 400,
        easing: Easing.inOut(Easing.linear),
      }).start();

      // make eye rings retract
      Animated.timing(eyeRingSize1, {
        toValue: 32,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize2, {
        toValue: 32,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();
      Animated.timing(eyeRingSize3, {
        toValue: 32,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize4, {
        toValue: 32,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize5, {
        toValue: 32,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize6, {
        toValue: 32,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(settingsSpin, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
    if (numSel >= 1) {
      // Eyeball moving up
      Animated.timing(eyePos, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeballWidth, {
        toValue: 12,
        useNativeDriver: false,
        delay: 100,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      // Eyelid moving up
      Animated.timing(eyeLidPos, {
        toValue: -1,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      // EyeBg opening
      Animated.timing(eyeWidth, {
        toValue: 12,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.linear,
      }).start();

      Animated.timing(outlineHeight, {
        toValue: 40,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(blurViewTop, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp1, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp2, {
        toValue: 0,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp3, {
        toValue: 0,
        useNativeDriver: false,
        duration: 400,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize1, {
        toValue: 12,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize2, {
        toValue: 16,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize3, {
        toValue: 12,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize4, {
        toValue: 12,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize5, {
        toValue: 12,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize6, {
        toValue: 12,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(settingsSpin, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }

    if (numSel >= 2) {
      Animated.timing(eyeWidth, {
        toValue: 20,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.linear,
      }).start();

      Animated.timing(eyeRingSizeOp1, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp2, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSizeOp3, {
        toValue: 0,
        useNativeDriver: false,
        duration: 400,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize1, {
        toValue: 20,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize2, {
        toValue: 24,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize3, {
        toValue: 28,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize4, {
        toValue: 32,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize5, {
        toValue: 20,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize6, {
        toValue: 20,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();
    }

    if (numSel === 3) {
      Animated.timing(eyeWidth, {
        toValue: 24,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.linear,
      }).start();

      Animated.timing(eyeRingSizeOp1, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();
      Animated.timing(eyeRingSizeOp2, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();
      Animated.timing(eyeRingSizeOp3, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize1, {
        toValue: 24,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize2, {
        toValue: 28,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize3, {
        toValue: 32,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize4, {
        toValue: 36,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize5, {
        toValue: 24,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize6, {
        toValue: 24,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();
    }
    if (numSel >= 4) {
      Animated.timing(eyeWidth, {
        toValue: 32,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.linear,
      }).start();

      Animated.timing(eyeRingSizeOp1, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();
      Animated.timing(eyeRingSizeOp2, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();
      Animated.timing(eyeRingSizeOp3, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize1, {
        toValue: 32,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize2, {
        toValue: 36,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize3, {
        toValue: 40,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize4, {
        toValue: 44,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize5, {
        toValue: 48,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();

      Animated.timing(eyeRingSize6, {
        toValue: 52,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.inOut(Easing.linear),
      }).start();
    }
  }, [numSel]);

  const spin = settingsSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  let eyeImg = (
    <Image source={require(`../assets/Pupil2.png`)} style={styles.eyeBallImg} />
  );

  if (numSel === 3) {
    eyeImg = (
      <Image
        source={require(`../assets/Pupil3.png`)}
        style={styles.eyeBallImg}
      />
    );
  }
  if (numSel >= 4) {
    eyeImg = (
      <Image
        source={require(`../assets/Pupil4.png`)}
        style={styles.eyeBallImg}
      />
    );
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.contentContainer}>
        <View style={[styles.eyeSizer, {left: '14%'}]}>
          <Animated.View
            style={[
              styles.eyeContainer(theme),
              {
                width: eyeWidth,
                height: eyeWidth,
              },
            ]}>
            {/* Hide these components when outside of eye */}
            <View style={styles.eyeContainerHidden}>
              {/* eyeball and pupil */}
              <Animated.View style={[styles.eyeBallCenter]}>
                {numSel > 1 ? (
                  eyeImg
                ) : (
                  <Animated.View
                    style={[
                      styles.eyeBall(theme),
                      numSel > 0 && styles.eyeBallAwake,
                      {
                        width: eyeballWidth,
                        height: eyeballWidth,
                      },
                    ]}>
                    <View
                      style={[
                        styles.eyeBallPupil(theme),
                        {
                          backgroundColor:
                            numSel > 0
                              ? theme.colors.Black
                              : theme.colors.DarkBeige,
                        },
                      ]}></View>
                  </Animated.View>
                )}
              </Animated.View>
            </View>
            {/* Eye Rings - Outside of Hidden container */}
            <View style={styles.eyeRingCenter}>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize1,
                    height: eyeRingSize1,
                    opacity: eyeRingSizeOp1,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize2,
                    height: eyeRingSize2,
                    opacity: eyeRingSizeOp1,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize3,
                    height: eyeRingSize3,
                    opacity: eyeRingSizeOp2,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize4,
                    height: eyeRingSize4,
                    opacity: eyeRingSizeOp2,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize5,
                    height: eyeRingSize5,
                    opacity: eyeRingSizeOp3,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize6,
                    height: eyeRingSize6,
                    opacity: eyeRingSizeOp3,
                  },
                ]}></Animated.View>
            </View>
          </Animated.View>
        </View>

        <View style={styles.mrCounterContainer}>
          {numSel > 0 ? (
            <Image
              source={require('../assets/MrCounter2.png')}
              style={styles.mrCounter2}
            />
          ) : (
            <Image
              source={require('../assets/MrCounter1.png')}
              style={styles.mrCounter}
            />
          )}
        </View>
        <View style={[styles.eyeSizer, {right: '14%'}]}>
          <Animated.View
            style={[
              styles.eyeContainer(theme),
              {
                width: eyeWidth,
                height: eyeWidth,
              },
            ]}>
            {/* Hide these components when outside of eye */}
            <View style={styles.eyeContainerHidden}>
              {/* eyeball and pupil */}
              <Animated.View style={[styles.eyeBallCenter]}>
                {numSel > 1 ? (
                  eyeImg
                ) : (
                  <Animated.View
                    style={[
                      styles.eyeBall(theme),
                      numSel > 0 && styles.eyeBallAwake,
                      {
                        width: eyeballWidth,
                        height: eyeballWidth,
                      },
                    ]}>
                    <View
                      style={[
                        styles.eyeBallPupil(theme),
                        {
                          backgroundColor:
                            numSel > 0
                              ? theme.colors.Black
                              : theme.colors.DarkBeige,
                        },
                      ]}></View>
                  </Animated.View>
                )}
              </Animated.View>
            </View>
            {/* Eye Rings - Outside of Hidden container */}
            <View style={styles.eyeRingCenter}>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize1,
                    height: eyeRingSize1,
                    opacity: eyeRingSizeOp1,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize2,
                    height: eyeRingSize2,
                    opacity: eyeRingSizeOp1,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize3,
                    height: eyeRingSize3,
                    opacity: eyeRingSizeOp2,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize4,
                    height: eyeRingSize4,
                    opacity: eyeRingSizeOp2,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize5,
                    height: eyeRingSize5,
                    opacity: eyeRingSizeOp3,
                  },
                ]}></Animated.View>
              <Animated.View
                style={[
                  styles.eyeAwakeRing(theme),
                  {
                    width: eyeRingSize6,
                    height: eyeRingSize6,
                    opacity: eyeRingSizeOp3,
                  },
                ]}></Animated.View>
            </View>
          </Animated.View>
        </View>
        <Animated.View
          style={[
            styles.contentContainerOutline(theme),
            {
              height: outlineHeight,
              borderColor: numSel > 0 ? theme.colors.Grey2 : theme.colors.Grey3,
            },
          ]}>
          <View style={styles.contentContainerDingus(theme)}></View>
        </Animated.View>
        <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={styles.settingsTouch}
            onPress={() => navigation.navigate('Settings')}>
            <Animated.Image
              source={require('../assets/Settings.png')}
              style={[styles.settings, {transform: [{rotate: spin}]}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[styles.blurViewContainer, {top: blurViewTop}]}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0,0,0,0)'}
          barStyle="light-content"
        />

        <BlurView
          blurType={'light'}
          // blurType={numSel > 0 ? 'light' : 'dark'}
          // intensity={50}
          style={[styles.blurView]}></BlurView>
      </Animated.View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    maxHeight: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  blurViewContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 5,
    overflow: 'hidden',
    maxHeight: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
    zIndex: 5,
  },
  contentContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingTop: 20,
    paddingBottom: 10,
    minHeight: 68,
    // backgroundColor: 'blue',
  },
  contentContainerOutline: theme => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderColor: theme.colors.Grey3,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 15,
    borderBottomLeftRadius: 5,
    zIndex: 500000,
    borderBottomRightRadius: 5,
  }),
  contentContainerDingus: theme => ({
    position: 'absolute',
    bottom: -4,
    left: '50%',
    // right: 0,
    height: 4,
    zIndex: 500000,
    width: 1,
    backgroundColor: theme.colors.Grey3,
  }),
  eyeBall: theme => ({
    width: 14,
    height: 14,
    backgroundColor: theme.colors.ScreenGreen3,
    borderWidth: 1,
    borderColor: theme.colors.Grey2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    borderRadius: 50,
  }),
  eyeBallImg: {
    maxWidth: 16,
    resizeMode: 'contain',
    zIndex: 500,
  },
  eyeBallCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeBallPupil: theme => ({
    width: 4,
    height: 4,
    borderRadius: 50,
  }),
  eyeBg: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
    borderRadius: 50,
  },
  eyeContainer: theme => ({
    position: 'relative',

    borderRadius: 50,
    backgroundColor: theme.colors.PureWhite,
    zIndex: 500000,
  }),
  eyeContainerHidden: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    overflow: 'hidden',
  },
  eyeContainerAwake: {backgroundColor: '#FFFFFF'},
  eyeAwakeRing: theme => ({
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.DarkBeige,
    zIndex: 0,
  }),

  eyeRingCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500000,
  },
  eyeLid: theme => ({
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: theme.colors.DarkBeige,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 16,
  }),
  eyeSizer: {
    position: 'absolute',
    top: '40%',
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    paddingTop: 40,
    paddingBottom: 0,
  },
  mrCounterContainer: {
    position: 'relative',
    maxWidth: 116,
    height: '100%',
    flex: 1,
    maxHeight: 20,
    marginLeft: 50,
    marginRight: 50,
    zIndex: 10000,
  },
  mrCounter: {
    position: 'absolute',
    top: -12,
    left: 0,
    // bottom: 0,
    right: 0,
    resizeMode: 'contain',
    width: '100%',
  },
  mrCounter2: {
    position: 'absolute',
    top: -36,
    left: -13,
    bottom: 0,
    right: 0,
    resizeMode: 'contain',
    width: '100%',
    minWidth: '122%',
  },
  settings: {
    width: screenWidth * 0.064,
    height: screenWidth * 0.064,
    resizeMode: 'contain',
    zIndex: 500000,
  },
  settingsContainer: {
    position: 'absolute',
    right: 0,
    // top: 0,
    bottom: 0,
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
    zIndex: 500000,
    alignItems: 'center',
  },
});

export default withTheme(Header);
