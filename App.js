import React from 'react';
import { createStackNavigator } from 'react-navigation';
import rootCameraContainer from './screens/Camera';
import rootText from './screens/Text';
import showPicture from './screens/Picture';
import gallery from './screens/Gallery'

const RootNavigator = createStackNavigator(
  {
    // gallery: { screen: gallery },
    showPicture: { screen:showPicture },
    rootCameraContainer: { screen: rootCameraContainer },
    rootText: { screen: rootText },
    gallery: { screen: gallery },
    // showPicture: { screen:showPicture },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default class App extends React.Component {
  static navigationOptions = {
    header: { visible: false }
  };
  render() {
    return <RootNavigator />;
  }
}

