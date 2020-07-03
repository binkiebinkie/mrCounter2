import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground
} from "react-native";
import Counter from "../components/Counter";
import Header from "../components/Header";
import { CountersContext } from "../state/CountersContext";
import { withTheme } from "react-native-elements";

//rsf
function CountersScreen({ route, theme }) {
  const { counters, numSelCounters } = useContext(CountersContext);
  return (
    <SafeAreaView style={styles.safeArea(theme)}>
      <ImageBackground
        source={require("../assets/AppBackground.png")}
        style={styles.appBg}
      >
        <Header />
        <View style={styles.container(theme)}>
          {numSelCounters.length >= 4 ? (
            <ScrollView style={styles.counterContainer}>
              {counters
                ? counters.map((counter, i) =>
                    counter.selected ? (
                      <Counter key={i} counter={counter} index={i} />
                    ) : null
                  )
                : null}
            </ScrollView>
          ) : (
            <View style={styles.counterContainer}>
              {counters
                ? counters.map((counter, i) =>
                    counter.selected ? (
                      <Counter key={i} counter={counter} index={i} />
                    ) : null
                  )
                : null}
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

//rnss
const styles = StyleSheet.create({
  appBg: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "repeat"
  },
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.Black,
    flexDirection: "column",
    padding: 5
  }),
  counterContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "column"
  },
  goButton: {
    justifyContent: "center",
    alignItems: "center"
  },
  safeArea: theme => ({
    backgroundColor: theme.colors.Black,
    flex: 1
  })
});

export default withTheme(CountersScreen);
