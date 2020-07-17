import React, {useState, useContext} from 'react';
import {ShadowFlex} from 'react-native-neomorph-shadows';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {withTheme} from 'react-native-elements';
import {CountersContext} from '../state/CountersContext';
import {relativeTimeRounding} from 'moment';
const screenHeight = Math.floor(Dimensions.get('window').height);

//rsf
function Counter({counter, index, theme}) {
  const {counters, setCounters, numSelCounters, settings} = useContext(
    CountersContext,
  );

  const selLength = numSelCounters.length;

  const [compHeight, setCompHeight] = useState(0);
  const [compWidth, setCompWidth] = useState(0);
  const {title, count, selected, id, incrementAmount} = counter;

  const leftHanded = settings.find(setting => setting.id === 'leftHanded')
    .selected;

  const changeCount = increment =>
    setCounters(
      counters.map((counter, i) => {
        if (counter.id !== id) return counter;

        const newCounter = {...counter};
        newCounter.count = increment
          ? (counter.count += incrementAmount)
          : (counter.count -= incrementAmount);
        return newCounter;
      }),
    );

  const numString = 1.15 - count.toString().length * 0.11;

  return (
    <View
      style={[
        styles.container(theme),
        {
          paddingBottom: selLength === index ? 0 : 8,
          height: `${selLength >= 4 ? 25 : (100 - selLength) / selLength}%`,
          maxHeight: selLength >= 4 ? screenHeight * 0.22 : screenHeight,
          flexDirection:
            selLength === 1 ? 'column' : leftHanded ? 'row-reverse' : 'row',
        },
      ]}>
      <View
        style={[
          styles.count(theme),
          {
            marginBottom: selLength === 1 ? 12 : 0,
            height: selLength === 1 ? '50%' : '100%',
          },
        ]}
        onLayout={e => {
          const {height, width} = e.nativeEvent.layout;
          setCompHeight(height);
          setCompWidth(width);
        }}>
        <View style={styles.countInnerCont}>
          <View style={styles.countInnerContTop}>
            <View style={styles.countTitleContainer(theme)}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.countTitle(theme)}>
                {title}
              </Text>
            </View>
            <View style={styles.countSquare(theme)}></View>
          </View>
          <View style={styles.countInnerContBottom(theme)}>
            <ShadowFlex
              inner
              useArt
              style={styles.countTextShadow(theme)}></ShadowFlex>
            <View style={styles.countTextContainer}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[
                  styles.countText(theme),
                  {
                    fontSize: Math.floor(compHeight * numString),
                    // lineHeight: Math.floor(compHeight / 8),
                  },
                ]}>
                {count}
              </Text>
            </View>
            <View style={[styles.countTextCornerLeft(theme)]}></View>
            <View style={[styles.countTextCornerRight(theme)]}></View>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.buttons(theme),
          {
            flex: selLength === 1 ? 1 : 0,
            width: selLength === 1 ? '100%' : '30%',
            marginLeft: selLength === 1 ? 0 : leftHanded ? 0 : 8,
            marginRight: selLength === 1 ? 0 : leftHanded ? 8 : 0,
          },
        ]}>
        <View style={[styles.thButtonContainer(theme), {marginBottom: '2%'}]}>
          <View style={[styles.countTextCornerLeft(theme)]}></View>
          <Image
            source={require('../assets/Plus.png')}
            style={{width: 28, height: 28, zIndex: 1000}}
          />
          <TouchableHighlight
            style={[styles.thButton(theme)]}
            onPress={() => changeCount(true)}>
            <View></View>
          </TouchableHighlight>
        </View>
        <View style={styles.thButtonContainer(theme)}>
          <Image
            source={require('../assets/Minus.png')}
            style={{width: 28, height: 4, zIndex: 1000}}
          />
          <TouchableHighlight
            style={[styles.thButton(theme)]}
            onPress={() => changeCount(false)}>
            <View></View>
          </TouchableHighlight>
          <View style={[styles.countTextCornerRight(theme)]}></View>
        </View>
      </View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  buttons: theme => ({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: theme.colors.Grey2,
    flex: 1,
    borderRadius: 8,
    padding: 5,
  }),
  container: theme => ({
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  }),
  count: theme => ({
    backgroundColor: theme.colors.Grey2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 8,
  }),
  countInnerCont: {
    position: 'relative',
    flex: 1,
  },
  countInnerContTop: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 36,
    marginBottom: 5,
  },
  countInnerContBottom: theme => ({
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'stretch',
    minWidth: '100%',
    flex: 1,
    height: 36,
    width: '100%',
    maxWidth: '100%',
    borderRadius: 8,
    backgroundColor: theme.colors.ScreenGreen0,
  }),
  countSquare: theme => ({
    width: 36,
    height: 36,
    backgroundColor: theme.colors.ScreenGreen0,
    borderRadius: 4,
  }),
  countTitle: theme => ({
    fontSize: 20,
    zIndex: 100,
    backgroundColor: theme.colors.ScreenGreen0,
    flex: 1,
    textAlignVertical: 'center',
  }),
  countTitleContainer: theme => ({
    zIndex: 100,
    borderRadius: 4,
    backgroundColor: theme.colors.ScreenGreen0,
    marginRight: 5,
    flex: 1,
    textAlignVertical: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
    height: 36,
  }),
  countText: theme => ({
    textAlignVertical: 'center',
    textAlign: 'right',
    position: 'relative',
  }),
  countTextContainer: {
    maxWidth: '98%',
    borderRadius: 4,
  },
  countTextShadow: theme => ({
    position: 'absolute',
    // shadowOffset: {width: 0, height: 6},
    // shadowOpacity: 1,
    // shadowColor: theme.colors.Black,
    // shadowRadius: 12,
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 4,
    elevation: 1,
    backgroundColor: theme.colors.ScreenGreen0,
  }),
  countTextCornerLeft: theme => ({
    position: 'absolute',
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: theme.colors.Grey2,
    top: 0,
    left: 0,
    zIndex: 1009900,
  }),
  countTextCornerRight: theme => ({
    position: 'absolute',
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderRightColor: theme.colors.Grey2,
    bottom: 0,
    zIndex: 1009900,
    right: 0,
  }),
  incButton: theme => ({
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  }),
  thButton: theme => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 4,
    zIndex: 100000,
  }),
  thButtonContainer: theme => ({
    position: 'relative',
    width: '100%',
    height: '49%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: theme.colors.Darkest,
  }),
});

export default withTheme(Counter);
