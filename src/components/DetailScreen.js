import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { getTranslated } from '../utils/apis'

const maxWidth = Dimensions.get('window').width;

export default class DetailScreen extends React.Component {
  state = {
    localPhoto: null,
    text: ""
  };

  componentWillReceiveProps(nextProps) {
    const { photo } = nextProps;
    if (photo) {
      this.setState({ localPhoto: photo });
      getTranslated(this.updateTranslateText, this.props.label)
    }
  }

  updateTranslateText = (text) => {
    this.setState({
      text:`“${text}”`
    })
  }

  onCloseEvent = (id) => {
    this.props.onClose(id)
    this.setState({
      text:""
    })
  }

  render() {
    const { onClose, openProgress, isAnimating } = this.props;
    const { localPhoto } = this.state;
    if (localPhoto) {
      return (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
          pointerEvents={isAnimating || this.props.photo ? 'auto' : 'none'}>
          
          <Animated.View
            style={[
              styles.body,
              {
                opacity: openProgress,
                backgroundColor: '#fff',
                transform: [
                  {
                    translateY: openProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0],
                    }),
                  },
                ],
              },
            ]}/>

          <Animated.Image
            ref={r => (this._openingImageRef = r)}
            source={localPhoto.source}
            style={{
              position: 'absolute',
              top: "25%",
              width: maxWidth,
              height: "50%",
              opacity: openProgress.interpolate({
                inputRange: [0, 0.99, 0.995],
                outputRange: [0, 0.7, 1],
              }),
            }}
          />
          <View style={{position: 'absolute', bottom: "10%", width: "100%"}}>
            <Text style={styles.description}>
              {this.state.text}
            </Text>
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              opacity: openProgress.interpolate({
                inputRange: [0, 0.99, 0.995],
                outputRange: [0, 0, 1],
              }),
            }}
            pointerEvents={isAnimating ? 'none' : 'auto'}>
            <TouchableOpacity
              onPress={() => this.onCloseEvent(localPhoto.id)}
              style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: 15 },
  closeText: { color: 'white', backgroundColor: 'transparent' },
  title: {
    position: 'absolute',
    bottom: "20%",
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    // fontFamily: 'Avenir Next',
    lineHeight: 50,
  },
  description: {
    fontStyle: 'italic',
    color: '#333',
    fontSize: 16,
    textAlign: "center"
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'white',
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});
