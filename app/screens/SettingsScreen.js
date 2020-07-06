import React, {useContext} from 'react';
import {StyleSheet, View, SafeAreaView, ImageBackground} from 'react-native';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import HeaderPlain from '../components/HeaderPlain';
import {CountersContext} from '../state/CountersContext';
import {withTheme} from 'react-native-elements';
// const backgroundImage = { uri:  };

//rsf
function SettingsScreen({route, theme, navigation}) {
  const {settings} = useContext(CountersContext);
  return (
    <SafeAreaView style={styles.safeArea(theme)}>
      <ImageBackground
        source={require('../assets/AppBackground.png')}
        style={styles.appBg}>
        <HeaderPlain navigation={navigation} showSettings={false} />
        <View style={styles.container(theme)}>
          <SectionTitle sectionTitle={'Settings'} />
          <View style={styles.counterContainer}>
            {settings
              ? settings.map((setting, i) =>
                  setting ? <Card key={i} setting={setting} index={i} /> : null,
                )
              : null}
          </View>
        </View>
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
    flex: 1,
    // backgroundColor: theme.colors.Black,
    padding: 8,
    paddingTop: 12,
    flexDirection: 'column',
  }),
  counterContainer: {
    flexDirection: 'column',
  },
  goButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: theme => ({
    // backgroundColor: theme.colors.Black,
    flex: 1,
  }),
});

export default withTheme(SettingsScreen);
