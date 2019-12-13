import React from 'react';
import { View, FlatList, TouchableWithoutFeedback, Animated } from 'react-native';
import Transition from './Transition';
import DetailScreen from './DetailScreen';

import PropTypes from 'prop-types';

class PhotoGalleryPhoto extends React.Component {
  state = {
    opacity: 1,
  };

  static contextTypes = {
    onImageRef: PropTypes.func,
  };

  setOpacity = opacity => {
    this.setState({ opacity });
  };

  render() {
    const { style, photo } = this.props;
    const { opacity } = this.state;
    return (
      <Animated.Image
        ref={i => {
          this.context.onImageRef(photo, i, this.setOpacity);
        }}
        style={[
          style,
          {
            opacity,
          },
        ]}
        source={photo.source}
        key={photo.source}
      />
    );
  }
}

const renderRow = (onPhotoOpen, row) => {
  return(<View
    style={{
      flexDirection: 'row',
      marginBottom: 5,
      justifyContent: 'space-between'
    }}
  >
    {row.map(item =>
      <TouchableWithoutFeedback key={item.id} onPress={() => onPhotoOpen(item)}>
        <View>
          <PhotoGalleryPhoto
            photo={item}
            style={{
              width: item.width,
              height: item.height,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    )}
  </View>)
}

export default class PhotoGallery extends React.Component {
  state = {
    photo: null,
    openProgress: new Animated.Value(0),
    isAnimating: false,
  };

  _images = {};

  _imageOpacitySetters = {};

  static childContextTypes = {
    onImageRef: PropTypes.func,
  };

  getChildContext() {
    return { onImageRef: this._onImageRef };
  }

  _onImageRef = (photo, imageRef, setOpacity) => {
    this._images[photo.id] = imageRef;
    this._imageOpacitySetters[photo.id] = setOpacity;
  };

  open = photo => {
    this._imageOpacitySetters[photo.id](
      this.state.openProgress.interpolate({
        inputRange: [0.005, 0.01],
        outputRange: [1, 0],
      })
    );
    this.setState({ photo, isAnimating: true }, () => {
      Animated.timing(this.state.openProgress, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ isAnimating: false });
      });
    });
  };

  close = photoId => {
    this.setState({ photo: null, isAnimating: true }, () => {
      Animated.timing(this.state.openProgress, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        this._imageOpacitySetters[photoId](1);
        this.setState({ isAnimating: false });
      });
    });
  };

  render() {
    const { photo, openProgress, isAnimating } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.rows}
          renderItem={({item}) => renderRow(this.open, item)}
          keyExtractor={ (_row, i) => i.toString()}
        />
        <Transition
          openProgress={openProgress}
          photo={photo}
          sourceImageRefs={this._images}
          isAnimating={isAnimating}
        />
        <DetailScreen
          label={this.props.label}
          photo={photo}
          onClose={this.close}
          openProgress={openProgress}
          isAnimating={isAnimating}
        />
      </View>
    );
  }
}
