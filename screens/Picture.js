import { Constants } from 'expo'
import React from 'react'
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
import AniCard from '../components/Card'
import ScrollBar from '../components/ScrollBar'
import LabelBox from '../components/LabelBox'
import {uploadRes, getParsedImgSearchRes, parseImgSearchResp, getUrls} from '../components/apis'
import {parseOcrResponse, parseOcrResponse2, parseImgSearchResponse, mergeLabels} from '../components/utils'
import Styles, {PictureWidth, PictureOffset} from '../styles'
const {winHeight, winWidth} = Dimensions.get('screen');

import cesResults from '../assets/cesRes.json'
import ocr from '../assets/ocr.json'

class ShowPicture extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPosition: 0,
      toPosition: 0,
      debug: true,
      image: {},
      imageFile: '',
      labelByServerOriginal: {},
      labelByServer: [],
      searchResults: [],
      labelByUser: [],
      }
    this.scrollViewRef
  }

  componentWillMount(){
    ////fot debug
    let now = new Date()
    let stamp = now.getFullYear()
      + ('00' + (now.getMonth()+1)).slice(-2)
      + ('00' + now.getDate()).slice(-2)
      + ('00' + now.getSeconds()).slice(-2)
      + ('000' + now.getMilliseconds()).slice(-3)
      + "_wills"
    let labelByServerOriginal = ocr
    labelByServerOriginal.stamp = stamp
    labelByServerOriginal.responses_raw = labelByServerOriginal.responses
    let image = require('../assets/sample.png')
    let imageFile = ''
    ////
    if(!this.state.debug){
      image = {uri:this.props.navigation.state.params.photoUri || 'photo not recorded', isStatic:true}
      imageFile = this.props.navigation.state.params.photo
      labelByServerOriginal = this.props.navigation.state.params.recogRes
    }
    this.setState({
      image: image,
      imageFile: imageFile,
      labelByServerOriginal: labelByServerOriginal,
      labelByServerSanitized: parseOcrResponse2(labelByServerOriginal),
      labelByServer: parseOcrResponse2(labelByServerOriginal),
    })
    // console.log("labelByServerOriginal", Object.keys(labelByServerOriginal))
  }

  ////update scroll pictures when user picks a phrase
  addSearchResult = (mergedLabelPosition, searchResult) => {
    let phrasesScoped = this.state.labelByUser
    let searchResultsScoped = this.state.searchResults
    let k=0
    for(let i=0; i<phrasesScoped.length; i++){
      if(mergedLabelPosition.origin[0].number < phrasesScoped[i].origin[0].number){
        break
      }else{
        k++
      }
    }
    phrasesScoped.splice(k, 0, mergedLabelPosition)
    searchResultsScoped.splice(k, 0, searchResult)
    phrasesScoped.forEach( (phrase, i) => phrase.number = i )
    // console.log("phrasesScoped", phrasesScoped)
    // console.log("searchResultsScoped", searchResultsScoped)
    this.setState({
      labelByUser: phrasesScoped,
      searchResults: searchResultsScoped,
      toPosition: k*PictureWidth,
    })
  }

  getPhrases = () => {
    let phrasesWords = []
    this.state.labelByServer.forEach( (labelPosition) => {
      if (labelPosition.selected) {
        labelPosition.enable = false
        labelPosition.selected = false
        phrasesWords.push(labelPosition)
      }
    })
    // phrasesScoped.push( mergeLabels(phrasesWords, phrasesScoped.length) )
    this.setState({labelByServer:this.state.labelByServer.filter(item => item.enable)})
    //update images and  labelByUser
    getUrls(mergeLabels(phrasesWords), this.addSearchResult)
  }

  getCurrentPosition = (current) => {
    this.setState({ currentPosition: Math.round(current / PictureWidth) })
  }

  scrollToPosition = (position) => {
    // console.log("toposition", position)
    this.setState({toPosition:position})
  }

  setLabelByServer = (labelByServer) => {
    this.setState({ labelByServer: labelByServer })
  }

  pictureCandidates = (labels, imgSearchResults) => {
    // console.log("imgSearchResults", imgSearchResults[0])
    const { navigate } = this.props.navigation
    return imgSearchResults.map( (imgSearchResult, i) =>
      <AniCard positionMin={i*PictureWidth-1} positionMax={i*PictureWidth+PictureOffset}>
        <TouchableOpacity onPress={ ()=>navigate('gallery', {imgSearchResult}) }>
          <Image style={Styles.image} 
          // source={require('../assets/food1.png')}/>
          source={{uri:imgSearchResult[0]['source']}}/>
        </TouchableOpacity >
      </AniCard>
    )
  }

  render() {
    let { navigate } = this.props.navigation
    // console.log("winHeight",  Dimensions.get('screen').width )
    // console.log("statusH", Constants.statusBarHeight)
    // {this.state.debug&&<Image style={{width: '100%', height: '100%'}}
    //   source={require('../assets/sample.png')} />}
    // {(!this.state.debug)&&<Image style={{width: '100%', height: '100%'}}
    //   source={{uri: this.state.imageUri, isStatic:true}} />}
    return (
      <View>
        <Image style={Styles.image} source={this.state.image} />
         <LabelBox setLabelByServer={this.setLabelByServer.bind(this)}
          labelByServer={this.state.labelByServer}
          scrollToPosition={this.scrollToPosition.bind(this)}
          currentPosition={this.state.currentPosition} 
          labelByUser={this.state.labelByUser} />
        <TouchableOpacity style={[Styles.button, Styles.buttonPosition]}
          onPress={ () => { navigate('rootCameraContainer') } }>
          <Text style={Styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Styles.button, Styles.buttonPosition2]}
          onPress={ () => { uploadRes(
            {
              imageFile: this.state.imageFile,
              stamp: this.state.labelByServerOriginal.stamp,
              responses_raw: this.state.labelByServerOriginal.responses_raw,
              responses: this.state.labelByServerOriginal.responses,
              labelByServerSanitized: this.state.labelByServerSanitized,
              labelByUser: this.state.labelByUser
            }
          )}}
          // onPress={ () => this.getPhrases() }
          >
          <Text style={Styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Styles.button, Styles.buttonPosition3]}
          onPress={ () => this.getPhrases() }>
          <Text style={Styles.buttonText}>▽</Text>
        </TouchableOpacity>
        <View style={Styles.scrollbarPosition}>
          <ScrollBar
          getCurrentPosition={this.getCurrentPosition.bind(this)}
          toPosition={this.state.toPosition}>
            <AniCard emptyCard={false} positionMin={999} positionMax={0}>
              <View  style={Styles.image}></View >
            </AniCard>
            {this.pictureCandidates(this.state.labelByUser, this.state.searchResults)}
            <AniCard emptyCard={false} positionMin={999} positionMax={0}>
              <View style={Styles.image}></View>
            </AniCard>
          </ScrollBar>
        </View>
      </View>
    );
  }
}

export default ShowPicture;
