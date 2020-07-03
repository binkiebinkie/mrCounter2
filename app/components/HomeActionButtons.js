import React, { useContext, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Easing,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { CountersContext } from "../state/CountersContext";
import { withTheme } from "react-native-elements";

const screenWidth = Math.floor(Dimensions.get("window").width);
const containerMargin = 8;
const delDimensions = 43;
const duration = 200;

function HomeScreen({ navigation, theme }) {
  const { numSelCounters, addCounter, removeCounters } = useContext(
    CountersContext
  );
  const numSel = numSelCounters.length;

  const goWidth = useRef(
    new Animated.Value(
      numSel > 0
        ? (screenWidth - containerMargin * 4 - delDimensions) * 0.7
        : 100
    )
  ).current;
  const newWidth = useRef(
    new Animated.Value(
      numSel > 0
        ? (screenWidth - containerMargin * 4 - delDimensions) * 0.3
        : screenWidth - containerMargin * 2
    )
  ).current;
  const goOpacity = useRef(new Animated.Value(numSel > 0 ? 1 : 0)).current;
  const delLeft = useRef(new Animated.Value(numSel > 0 ? 0 : -delDimensions))
    .current;

  const calcAnimated = firstLoad => {
    if (numSel === 0) {
      Animated.timing(goWidth, {
        toValue: 100,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();

      Animated.timing(newWidth, {
        toValue: screenWidth - containerMargin * 2,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();

      Animated.timing(goOpacity, {
        toValue: 0,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();

      Animated.timing(delLeft, {
        toValue: -delDimensions * 2,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();
    }
    if (numSel >= 1) {
      Animated.timing(goWidth, {
        toValue: (screenWidth - containerMargin * 4 - delDimensions) * 0.7,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();

      Animated.timing(newWidth, {
        toValue: (screenWidth - containerMargin * 4 - delDimensions) * 0.3,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();

      Animated.timing(goOpacity, {
        toValue: 1,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();

      Animated.timing(delLeft, {
        toValue: 0,
        useNativeDriver: false,
        duration,
        easing: Easing.inOut(Easing.linear)
      }).start();
    }
  };

  useEffect(() => calcAnimated(), [numSel]);
  return (
    <View style={styles.buttonContainer}>
      <Animated.View
        style={[
          styles.bottomButton,
          styles.delButton(theme),
          {
            opacity: goOpacity,
            left: delLeft,
            position: delLeft === 0 ? "relative" : "absolute",
            width: delLeft === 0 ? 0 : delDimensions
          }
        ]}
        disabled={numSel < 1 ? true : false}
      >
        <View
          style={[{ backgroundColor: theme.colors.Grey3 }, styles.actionButton]}
        >
          <Text style={styles.buttonText}>-</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonPress}
          onPress={() => removeCounters()}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bottomButton,
          styles.newButton(theme),
          {
            width: newWidth,
            marginLeft: numSel > 0 ? 8 + delDimensions : 0
          }
        ]}
      >
        <View
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.MidBlue }
          ]}
        >
          <Text style={styles.buttonText}>+</Text>
        </View>
        <Text style={styles.buttonText}>New</Text>
        <TouchableOpacity
          style={styles.buttonPress}
          onPress={() => addCounter()}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bottomButton,
          styles.goButton(theme),
          { width: goWidth, opacity: goOpacity }
        ]}
        disabled={numSel < 1 ? true : false}
      >
        <Text style={styles.buttonText}>Go Count</Text>
        <View
          style={[{ backgroundColor: theme.colors.Grey3 }, styles.actionButton]}
        >
          <Text style={styles.buttonText}>></Text>
        </View>
        <TouchableOpacity
          style={styles.buttonPress}
          onPress={() => navigation.navigate("Counters")}
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
    alignItems: "center",
    justifyContent: "center"
  },
  bottomButton: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    padding: 4
  },
  buttonContainer: {
    position: "absolute",
    left: containerMargin,
    right: containerMargin,
    bottom: "5%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonPress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  newButton: theme => ({
    paddingRight: 12,
    marginRight: 8,
    backgroundColor: theme.colors.Blue
  }),
  delButton: theme => ({
    backgroundColor: "red",
    height: delDimensions
  }),
  goButton: theme => ({
    backgroundColor: theme.colors.Grey1,
    paddingLeft: 12
  })
});

export default withTheme(HomeScreen);
