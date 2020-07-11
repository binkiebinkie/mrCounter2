import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  Animated,
  TextInput,
  Easing,
} from 'react-native';
import {ShadowFlex} from 'react-native-neomorph-shadows';
import {withTheme} from 'react-native-elements';
import {CountersContext} from '../state/CountersContext';

function HomeCounter({
  theme,
  counter,
  setting,
  navigation,
  isEditing,
  setIsEditing,
  triggerSubmitTitle,
  setTriggerSubmitTitle,
}) {
  const {
    title,
    count,
    selected,
    id,
    selectedSlant,
    description,
    newCounter,
  } = counter ? counter : setting;

  const [titleValue, setTitleValue] = useState(title);
  const {toggleSelect, editCounter} = useContext(CountersContext);
  // const heightAnimation = useRef(new Animated.Value(newCounter ? 0 : 300))
  // .current;

  // useEffect(() => {
  // Animated.timing(heightAnimation, {
  //   toValue: 300,
  //   useNativeDriver: false,
  //   duration: 2000,
  //   easing: Easing.inOut(Easing.linear),
  // }).start();
  // }, []);

  useEffect(() => {
    if (triggerSubmitTitle === id) {
      submitTitle();
      setTriggerSubmitTitle('');
    }
  }, [triggerSubmitTitle]);

  const toggleEditing = () => {
    setIsEditing((prevEditing) =>
      prevEditing.length > 0 && prevEditing === id ? '' : id,
    );
    if (isEditing === id) titleInput.focus();
  };

  const submitTitle = () => {
    setIsEditing('');
    editCounter(id, 'title', titleValue);
  };
  return (
    <View
      style={[
        styles.container(theme, selected, selectedSlant),
        selected && styles.containerSelected(selectedSlant),
      ]}>
      <TouchableOpacity
        style={styles.containerTouch}
        onPress={() => toggleSelect(id, counter ? true : false)}>
        {counter ? (
          <TouchableWithoutFeedback
            style={([styles.titles], {width: '68%'})}
            onPress={toggleEditing}>
            {isEditing === id ? (
              <TextInput
                autoFocus={true}
                value={titleValue}
                style={styles.titleText}
                onChangeText={(text) => setTitleValue(text)}
                onSubmitEditing={() => submitTitle()}
                numberOfLines={1}
              />
            ) : (
              <Text numberOfLines={2} style={styles.titleText}>
                {title}
              </Text>
            )}
          </TouchableWithoutFeedback>
        ) : (
          <View style={([styles.titles], {width: '85%'})}>
            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.descText}>
              {description}
            </Text>
          </View>
        )}
        {counter ? (
          <>
            <View style={[styles.rightContainer(theme)]}>
              <ShadowFlex
                inner
                useArt={false}
                style={styles.rightContainerShadow(theme)}>
                <Switch
                  trackColor={{
                    false: theme.colors.Grey4,
                    true: theme.colors.Grey3,
                  }}
                  thumbColor={
                    selected ? theme.colors.Black : theme.colors.PureWhite
                  }
                  value={selected}
                  onValueChange={() => toggleSelect(id, true)}
                />
                <Text numberOfLines={1} style={styles.countText(theme)}>
                  {count}
                </Text>
                <ShadowFlex
                  useArt={false}
                  outer
                  style={styles.rightContainerCorner(theme)}></ShadowFlex>
              </ShadowFlex>
            </View>

            {isEditing === id && (
              <TouchableWithoutFeedback onPress={() => submitTitle()}>
                <View style={styles.titleTextWrapper}></View>
              </TouchableWithoutFeedback>
            )}
          </>
        ) : (
          <View style={[styles.rightContainerSettings]}>
            <Switch
              trackColor={{
                false: theme.colors.Grey4,
                true: theme.colors.Grey3,
              }}
              thumbColor={
                selected ? theme.colors.Black : theme.colors.PureWhite
              }
              value={selected}
              onValueChange={() => toggleSelect(id, false)}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: (theme, selected, selectedSlant) => ({
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.PureWhite,
    borderWidth: 1,
    borderColor: theme.colors.LightGrey,
    padding: 12,
    marginBottom: 4,
    marginRight: 8,
    marginLeft: 8,
  }),
  containerSelected: (selectedSlant) => ({
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
    borderRadius: 8,
    transform: [
      {
        rotate: selectedSlant,
      },
    ],
  }),
  containerTouch: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    flex: 1,
  },
  countText: (theme) => ({fontSize: 24, color: theme.colors.Black}),
  descText: (theme) => ({fontSize: 18}),
  titles: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: '2%',
  },
  titleText: {
    fontSize: 24,
    zIndex: 1000000,
    maxWidth: '65%',
    padding: 0,
    margin: 0,
  },
  titleTextWrapper: {
    zIndex: 100000,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  rightContainer: (theme) => ({
    width: '30%',
    borderRadius: 4,
    backgroundColor: theme.colors.ScreenGreen0,
    margin: 0,
    color: theme.colors.Black,
    justifyContent: 'flex-end',
  }),
  rightContainerCorner: (theme) => ({
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowColor: theme.colors.Grey4,
    shadowRadius: 12,
    flex: 1,
    elevation: 1,
    borderTopWidth: 0,
    borderBottomWidth: 6,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: theme.colors.PureWhite,
    position: 'absolute',
    top: 0,
    left: 0,
  }),
  rightContainerSettings: {
    alignItems: 'flex-start',
  },
  rightContainerShadow: (theme) => ({
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowColor: theme.colors.Grey4,
    shadowRadius: 2,
    flex: 1,
    elevation: 1,
    // height: '100%',
    borderRadius: 4,
    padding: 8,
    // width: '100%',
    alignItems: 'flex-end',
  }),
  rowBack: {
    flex: 1,
  },
});

export default withTheme(HomeCounter);
