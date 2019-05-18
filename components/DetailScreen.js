import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

const maxWidth = Dimensions.get('window').width;

export default class DetailScreen extends React.Component {
  state = {
    localPhoto: null,
  };

  componentWillReceiveProps(nextProps) {
    const { photo } = nextProps;
    if (photo) {
      this.setState({ localPhoto: photo });
    }
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
              onPress={() => onClose(localPhoto.id)}
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
