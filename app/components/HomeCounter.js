import React, { useContext, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  TextInput
} from "react-native";
import { withTheme } from "react-native-elements";
import { CountersContext } from "../state/CountersContext";

function HomeCounter({ theme, counter }) {
  const { title, count, selected, id, selectedSlant } = counter;

  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const { toggleSelect, editCounter } = useContext(CountersContext);

  const toggleEditing = () => {
    setIsEditing(prevEditing => (prevEditing ? false : true));
    if (isEditing) titleInput.focus();
  };

  const submitTitle = () => {
    setIsEditing(false);
    editCounter(id, "title", titleValue);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container(theme),
          selected && styles.containerSelected,
          {
            transform: [
              {
                rotate: selected ? selectedSlant : "0deg"
              }
            ]
          }
        ]}
        onPress={() => toggleSelect(id)}
      >
        <TouchableWithoutFeedback style={styles.titles} onPress={toggleEditing}>
          {isEditing ? (
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
        <View
          style={[
            styles.rightContainer(theme),
            selected && styles.rightContainerSelected(theme)
          ]}
        >
          <Switch
            trackColor={{
              false: theme.colors.LightGrey,
              true: theme.colors.MidBlue
            }}
            thumbColor={selected ? theme.colors.Blue : theme.colors.PureWhite}
            value={selected}
            onValueChange={() => toggleSelect(id)}
          />
          <Text style={styles.countText}>{count}</Text>
        </View>
        {isEditing && (
          <TouchableWithoutFeedback onPress={() => submitTitle()}>
            <View style={styles.titleTextWrapper}></View>
          </TouchableWithoutFeedback>
        )}
      </TouchableOpacity>
    </>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: theme.colors.PureWhite,
    marginBottom: 4,
    padding: 8
  }),
  containerSelected: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 8
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
    borderRadius: 8
  },
  countText: { fontSize: 24 },
  titles: {
    flexDirection: "column",
    backgroundColor: "red",
    marginRight: "2%"
  },
  titleText: {
    fontSize: 24,
    width: "68%",
    zIndex: 1000000
  },
  titleTextWrapper: {
    zIndex: 100000,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  rightContainer: theme => ({
    width: "30%",
    borderRadius: 4,
    backgroundColor: theme.colors.LightGrey,
    margin: 0,
    padding: 8,
    display: "flex",
    alignItems: "flex-end",
    color: theme.colors.Black
  }),
  rightContainerSelected: theme => ({
    backgroundColor: theme.colors.LightBlue
  })
});

export default withTheme(HomeCounter);
