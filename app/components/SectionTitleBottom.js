import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CountersContext} from '../state/CountersContext';

import {withTheme} from 'react-native-elements';

function SectionTitleBottom({theme}) {
  return (
    <View style={styles.container(theme)}>
      <View style={styles.top(theme)}></View>
      <View style={styles.verticalLine(theme)}></View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: (theme) => ({
    position: 'absolute',
    minHeight: 1200,
    left: 8,
    right: 8,
    top: 0,
  }),
  top: (theme) => ({
    height: 18,
    width: '100%',
    borderColor: theme.colors.Grey3,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  }),
  verticalLine: (theme) => ({
    position: 'absolute',
    left: '50%',
    top: 18,
    backgroundColor: theme.colors.Grey3,
    height: '100%',
    width: 1,
  }),
});

export default withTheme(SectionTitleBottom);
