import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import PHOTOS from '../../assets/data';
import { processImages, buildRows, normalizeRows } from '../utils/util';
import PhotoGallery from '../components/PhotoGallery';

const maxWidth = Dimensions.get('window').width;

const debug = false

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
    };
  }
  componentDidMount() {
    
    let { navigate } = this.props.navigation
    
    // console.log("PHOTOS", PHOTOS[0])
    let PhotoSource
    if (!debug) {
      let imgUris = this.props.navigation.state.params.imgSearchResult
      PhotoSource = imgUris.map( (imgUri, i) => {
      let photo = {'id':i, 'width':128,'height':159 }
      let source = { 'uri': imgUri.source, cache:"force-cache" }
      photo['source'] = source
      return photo
      })
    }
    else {
      PhotoSource = PHOTOS
    }
    // console.log("PHOTOS2", PHOTOS2[0])
    const processedImages = processImages(PhotoSource);
    // console.log('processedImages', processedImages[0])
    processedImages.forEach( (processedImage, i) =>{
      processedImage.source
    })
    let rows = buildRows(processedImages, maxWidth);
    rows = normalizeRows(rows, maxWidth);
    
    this.setState({
      dataSource: rows,
    })
  }

  renderRow = (onPhotoOpen, row) => {
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
            <PhotoGallery.Photo
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
    

  render() {
    // console.log("this.state.dataSource", this.state.dataSource)
    return (
      <PhotoGallery
        renderContent={({ onPhotoOpen }) =>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => this.renderRow(onPhotoOpen, item)}
            keyExtractor={ (row, i) => i.toString()}
          />}
      />
    );
  }
}