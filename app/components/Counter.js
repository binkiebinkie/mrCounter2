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
// import { TouchableHighlight } from "react-native-gesture-handler";
import {CountersContext} from '../state/CountersContext';
const screenHeight = Math.floor(Dimensions.get('window').height);
// const windowHeight = Dimensions.get("window").height;

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
          maxHeight: selLength >= 4 ? screenHeight * 0.21 : screenHeight,
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

            // flexDirection: selLength === 1 ? "column" : "row"
          },
        ]}
        onLayout={e => {
          const {height, width} = e.nativeEvent.layout;
          setCompHeight(height);
          setCompWidth(width);
        }}>
        <View style={styles.countInnerCont}>
          <View style={styles.countInnerContTop}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.countTitle(theme)}>
              {title}
            </Text>
            <View style={styles.countSquare(theme)}></View>
          </View>
          <ShadowFlex inner useArt style={styles.countTextShadow(theme)}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                styles.countText(theme),
                {fontSize: Math.floor(compHeight * numString)},
              ]}>
              {count}
            </Text>
            <View style={[styles.countTextCornerLeft(theme)]}></View>
            <View style={[styles.countTextCornerRight(theme)]}></View>
          </ShadowFlex>
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
    textAlignVertical: 'center',
    padding: 5,
    alignSelf: 'stretch',
    borderRadius: 8,
  }),
  countInnerCont: {flex: 1, justifyContent: 'flex-end'},
  countInnerContTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 5,
  },
  countSquare: theme => ({
    width: 36,
    height: 36,
    backgroundColor: theme.colors.ScreenGreen0,
    borderRadius: 4,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 1,
  }),
  countTitle: theme => ({
    fontSize: 20,
    zIndex: 100,
    backgroundColor: theme.colors.ScreenGreen0,
    borderRadius: 4,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 1,
    marginRight: 5,
    flex: 1,
    textAlignVertical: 'center',
    paddingLeft: 8,
  }),
  countText: theme => ({
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    backgroundColor: theme.colors.ScreenGreen0,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 1,
    paddingRight: 12,
    textAlign: 'right',
    borderRadius: 4,
    position: 'relative',
  }),
  countTextShadow: theme => ({
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowColor: theme.colors.Grey4,
    shadowRadius: 12,
    flex: 1,
    borderRadius: 4,
    elevation: 1,
    backgroundColor: theme.colors.ScreenGreen0,
  }),
  countTextCornerLeft: theme => ({
    position: 'absolute',
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: theme.colors.Grey2,
    top: 0,
    left: 0,
  }),
  countTextCornerRight: theme => ({
    position: 'absolute',
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderRightColor: theme.colors.Grey2,
    bottom: 0,
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
