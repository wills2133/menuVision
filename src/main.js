import React from 'react';
import { createStackNavigator } from 'react-navigation';
import rootCameraContainer from './screens/Camera';
import showPicture from './screens/Picture';
import gallery from './screens/Gallery'

const RootNavigator = createStackNavigator(
  {
    // gallery: { screen: gallery },
    // showPicture: { screen:showPicture },
    rootCameraContainer: { screen: rootCameraContainer },
    gallery: { screen: gallery },
    showPicture: { screen:showPicture },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default class Main extends React.Component {
  static navigationOptions = {
    header: { visible: false }
  };
  render() {
    return <RootNavigator />;
  }
}

