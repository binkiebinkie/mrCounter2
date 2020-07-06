import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Card from '../components/Card';
import HomeActionButtons from '../components/HomeActionButtons';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';

import {CountersContext} from '../state/CountersContext';
import {withTheme} from 'react-native-elements';

//rsf
function HomeScreen({navigation, theme}) {
  const {counters, numSelCounters} = useContext(CountersContext);

  return (
    <SafeAreaView style={styles.safeArea(theme)}>
      <ImageBackground
        source={require('../assets/AppBackground.png')}
        style={styles.appBg}>
        <Header navigation={navigation} />
        {/* { numSelCounters === 0 ? (
          <IntroScreen />
        ) : ( */}
        <ScrollView style={styles.container(theme)}>
          <View style={styles.containerView(theme)}>
            <SectionTitle sectionTitle={'Most recent'} />
            <View style={styles.counterContainer}>
              {counters
                ? counters.map((counter, i) => (
                    <Card key={i} counter={counter} index={i} />
                  ))
                : null}
              <View
                style={{
                  height: 70,
                  width: '100%',
                  opacity: 0,
                }}></View>
            </View>
          </View>
        </ScrollView>
        {/* )} */}
        <HomeActionButtons navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
}

//rnss
const styles = StyleSheet.create({
  appBg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'repeat',
  },
  container: theme => ({
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    padding: 8,
    paddingTop: 90,
  }),
  containerView: theme => ({
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 130,
    minHeight: '100%',
  }),
  counterContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  safeArea: theme => ({
    backgroundColor: theme.colors.Black,
    flex: 1,
  }),
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'red',
    right: 0,
  },
});

export default withTheme(HomeScreen);
