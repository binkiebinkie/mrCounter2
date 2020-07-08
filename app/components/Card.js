import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  TextInput,
} from 'react-native';

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
  // let title, count, selected, id, selectedSlant, description;
  // if (counter) let { title, count, selected, id, selectedSlant } = counter;
  // if
  const {title, count, selected, id, selectedSlant, description} = counter
    ? counter
    : setting;

  const [titleValue, setTitleValue] = useState(title);
  const {toggleSelect, editCounter} = useContext(CountersContext);

  useEffect(() => {
    if (triggerSubmitTitle === id) {
      submitTitle();
      setTriggerSubmitTitle('');
    }
  }, [triggerSubmitTitle]);

  const toggleEditing = () => {
    setIsEditing(prevEditing =>
      prevEditing.length > 0 && prevEditing === id ? '' : id,
    );
    if (isEditing === id) titleInput.focus();
  };

  const submitTitle = () => {
    setIsEditing('');
    editCounter(id, 'title', titleValue);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container(theme),
        selected && styles.containerSelected,
        {
          transform: [
            {
              rotate: selected ? selectedSlant : '0deg',
            },
          ],
        },
      ]}
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
              onChangeText={text => setTitleValue(text)}
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
          <View
            style={[
              styles.rightContainer(theme),
              selected && styles.rightContainerSelected(theme),
            ]}>
            <Switch
              trackColor={{
                false: theme.colors.LightGrey,
                true: theme.colors.MidBlue,
              }}
              thumbColor={selected ? theme.colors.Blue : theme.colors.PureWhite}
              value={selected}
              onValueChange={() => toggleSelect(id, true)}
            />
            <Text numberOfLines={1} style={styles.countText}>
              {count}
            </Text>
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
              false: theme.colors.LightGrey,
              true: theme.colors.MidBlue,
            }}
            thumbColor={selected ? theme.colors.Blue : theme.colors.PureWhite}
            value={selected}
            onValueChange={() => toggleSelect(id, false)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.PureWhite,
    padding: 12,
    marginBottom: 4,
    marginRight: 8,
    marginLeft: 8,
  }),
  containerSelected: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
    borderRadius: 8,
  },
  countText: {fontSize: 24},
  descText: theme => ({fontSize: 18}),
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
  rightContainer: theme => ({
    width: '30%',
    borderRadius: 4,
    backgroundColor: theme.colors.LightGrey,
    margin: 0,
    padding: 8,
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.colors.Black,
  }),
  rightContainerSettings: {
    alignItems: 'flex-start',
  },
  rightContainerSelected: theme => ({
    backgroundColor: theme.colors.LightBlue,
  }),
  rowBack: {
    flex: 1,
  },
});

export default withTheme(HomeCounter);
