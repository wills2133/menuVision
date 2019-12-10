import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {Expo} from 'expo';

export const rootText = props => {
  let { navigate } = props.navigation;
  let targetText = props.navigation.state.params.text || 'Text not recognized';
  Expo.Speech.speak(targetText);

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <TouchableOpacity style = {[styles.button, styles.buttonPosition]}
        onPress={() => {
          Expo.Speech.stop();
          navigate('rootCameraContainer');
        }}>
        <Text style={{ color: 'white' }}> Back to Camera </Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, margin: 20 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View stlye={{ flex: 1 }}>
            <Text style = {styles.buttonText}>{targetText}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderColor: 'white',
    padding:10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  buttonPosition: {
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default rootText;
