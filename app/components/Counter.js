import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { withTheme } from "react-native-elements";
// import { TouchableHighlight } from "react-native-gesture-handler";
import { CountersContext } from "../state/CountersContext";
const screenHeight = Math.floor(Dimensions.get("window").height);
// const windowHeight = Dimensions.get("window").height;

//rsf
function Counter({ counter, index, theme }) {
  const { counters, setCounters, numSelCounters } = useContext(CountersContext);

  const selLength = numSelCounters.length;
  // console.log(counter);
  const [compHeight, setCompHeight] = useState(0);
  const [compWidth, setCompWidth] = useState(0);
  const { title, count, selected, id, incrementAmount } = counter;

  const changeCount = increment =>
    setCounters(
      counters.map((counter, i) => {
        if (counter.id !== id) return counter;

        const newCounter = { ...counter };
        newCounter.count = increment
          ? (counter.count += incrementAmount)
          : (counter.count -= incrementAmount);
        return newCounter;
      })
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
          flexDirection: selLength === 1 ? "column" : "row"
        }
      ]}
    >
      <View
        style={[
          styles.count(theme),
          {
            marginBottom: selLength === 1 ? 12 : 0,
            height: selLength === 1 ? "50%" : "100%"

            // flexDirection: selLength === 1 ? "column" : "row"
          }
        ]}
        onLayout={e => {
          const { height, width } = e.nativeEvent.layout;
          setCompHeight(height);
          setCompWidth(width);
        }}
      >
        <View style={styles.countInnerCont}>
          <View style={styles.countInnerContTop}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.countTitle(theme)}
            >
              {title}
            </Text>
            <View style={styles.countSquare(theme)}></View>
          </View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              styles.countText(theme),
              {
                // fontSize: compWidth / count.toString().length
                fontSize: Math.floor(compHeight * numString)
                // lineHeight: compHeight * numString
              }
            ]}
          >
            {count}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.buttons(theme),
          {
            flex: selLength === 1 ? 1 : 0,

            width: selLength === 1 ? "100%" : "30%",
            marginLeft: selLength === 1 ? 0 : 8
          }
        ]}
      >
        <View style={[styles.thButtonContainer(theme), { marginBottom: "2%" }]}>
          <Image
            source={require("../assets/Plus.png")}
            style={{ width: 28, height: 28, zIndex: 1000 }}
          />
          <TouchableHighlight
            style={[styles.thButton(theme)]}
            onPress={() => changeCount(true)}
          >
            <View></View>
          </TouchableHighlight>
        </View>
        <View style={styles.thButtonContainer(theme)}>
          <Image
            source={require("../assets/Minus.png")}
            style={{ width: 28, height: 4, zIndex: 1000 }}
          />
          {/* <View style={[styles.thButton(theme)]}> */}
          <TouchableHighlight
            style={[styles.thButton(theme)]}
            onPress={() => changeCount(false)}
          >
            <View></View>
          </TouchableHighlight>
          {/* </View> */}
        </View>
      </View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  buttons: theme => ({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: theme.colors.Grey2,
    flex: 1,
    borderRadius: 8,
    padding: 5
  }),
  container: theme => ({
    justifyContent: "space-between",
    alignItems: "stretch",
    flex: 1
  }),
  count: theme => ({
    backgroundColor: theme.colors.Grey2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    padding: 5,
    alignSelf: "stretch",
    borderRadius: 8
  }),
  countInnerCont: { flex: 1, justifyContent: "flex-end" },
  countInnerContTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 5
  },
  countSquare: theme => ({
    width: 36,
    height: 36,
    backgroundColor: theme.colors.LightGrey,
    borderRadius: 4,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1
  }),
  countTitle: theme => ({
    fontSize: 20,
    zIndex: 100,
    backgroundColor: theme.colors.LightGrey,
    borderRadius: 4,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1,
    marginRight: 5,
    flex: 1,
    textAlignVertical: "center",
    paddingLeft: 8
  }),
  countText: theme => ({
    flex: 1,
    flexWrap: "wrap",
    textAlignVertical: "center",
    backgroundColor: theme.colors.LightGrey,
    borderRadius: 4,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1,
    paddingRight: 12,
    textAlign: "right"
  }),
  incButton: theme => ({
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1
  }),
  thButton: theme => ({
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 4,
    // backgroundColor: theme.colors.Darkest,
    zIndex: 100000
  }),
  thButtonContainer: theme => ({
    position: "relative",
    width: "100%",
    height: "49%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: theme.colors.Darkest
  })
});

export default withTheme(Counter);
