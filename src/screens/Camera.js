import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Expo, FileSystem } from 'expo';
import { Camera } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions'
import Loader from './Loader';
import { getOCR } from '../utils/apis'
import styles from '../styles'
// import config from '../config';
// import axios from 'axios';

class rootCamera extends React.Component {
  constructor() {
    super();
    this.snap = this.snap.bind(this);
    this.state = {
      hasCameraPermission: null,
      loading: false
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    this.setState({ loading: true });
    const { navigate } = this.props.navigation;
    if (this.camera) {
      let photo = {base64:"null"};
      let textRecieved={};
      let translatedText;
      let picturePath;
      try {
        let { uri } = await this.camera.takePictureAsync();
        picturePath = uri;
        // console.log("picturePath", picturePath)
        photo = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 420 } }],
          { base64: true }
        );
        textRecieved = await getOCR(photo.base64);
        // translatedText = await this.getTranslatedText(textRecieved);
        // if (translatedText === 'undefined') {
        //   translatedText = 'Text not recognized';
        // }
        this.setState({ loading: false });
      } catch (err) {
        this.setState({ loading: false });
        console.log("err0", err);
      }

      /* save to local document
      // console.log("picturePath", picturePath);
      FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images/').then(
        ()=>{console.log("succeeded to make dir")}
      ).catch(err=>{
        console.log("failed to make dir, dir may exist")
        // console.log("failed to make dir", err)
      })
      let timeStamp = Date.now().toString();
      let saveImgPath = FileSystem.documentDirectory + "images/" + timeStamp + ".png";
      let saveJsonPath = FileSystem.documentDirectory + "images/" + timeStamp + ".json";
      await FileSystem.moveAsync({ from: picturePath, to: saveImgPath })
      // console.log("textRecieved",textRecieved);
      FileSystem.writeAsStringAsync(saveJsonPath, JSON.toString())
      .then(()=>{console.log("save json succeeded")})
      .cahtch(err=>{console.log("err", err)});
      */
      navigate('showPicture', { photoUri: picturePath, photo: photo.base64, recogRes: textRecieved});
      // navigate('rootText', { text: translatedText });
    }
  };

  // getTranslatedText = async parsedText => {
  //   let lang = await Expo.DangerZone.Localization.getCurrentLocaleAsync();
  //   let toLang = lang.slice(0, 2);
  //   let text = parsedText;
  //   const API_KEY = config.apiKey;
  //   let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  //   url += '&q=' + encodeURI(text);
  //   url += `&target=${toLang}`;

  //   return axios
  //     .post(url)
  //     .then(res => res.data)
  //     .then(response => response.data.translations[0].translatedText)
  //     .catch(error => {
  //       console.log('There was an error with the translation request: ', error);
  //     });
  // };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Loader loading={this.state.loading} />
          <Camera
            autoFocus={Camera.Constants.AutoFocus.on}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
            type={this.state.type}
            ref={ref => { this.camera = ref }}>
            <View style={{ margin: 20, padding: 20 }}>
              <TouchableOpacity style = {[styles.button, {}]} onPress={this.snap} >
                <Text style = {styles.buttonText}>Capture</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default rootCamera;
