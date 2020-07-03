import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CountersContext} from '../state/CountersContext';

import {withTheme} from 'react-native-elements';

function SectionTitle({sectionTitle, theme}) {
  const {counters, settings} = useContext(CountersContext);

  return (
    <View style={styles.container(theme)}>
      <Text style={styles.title(theme)}>{sectionTitle}</Text>
      {/* <LinearGradient
        colors={["#AAA191", "transparent"]}
        style={styles.gradient}
      ></LinearGradient> */}
      <Text style={styles.count(theme)}>
        {sectionTitle === 'Settings'
          ? settings.length
          : counters
          ? counters.length
          : null}
      </Text>
      <View style={styles.containerDingus(theme)}></View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: 'relative',
    flexDirection: 'row',
    borderColor: theme.colors.Grey2,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginBottom: 8,
  }),
  count: theme => ({
    fontWeight: 'bold',
    paddingRight: 4,
    marginRight: 2,
    height: '100%',
    borderColor: theme.colors.Grey2,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    color: theme.colors.Grey4,
  }),
  containerDingus: theme => ({
    position: 'absolute',
    left: '50%',
    top: -4,
    backgroundColor: theme.colors.Grey2,
    height: 4,
    width: 1,
  }),
  title: theme => ({
    paddingLeft: 12,
    paddingRight: 12,
    color: theme.colors.Grey4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRightWidth: 1,
    borderColor: theme.colors.Grey2,
    borderTopWidth: 0,
  }),
});

export default withTheme(SectionTitle);
