import config from './config';
import axios from 'axios';

const parseImgSearchResp = function(imgSearchResponse) {
    let searchResults = []
    let item2 = {}
    // console.log('imgSearchResponse', imgSearchResponse[0])
    imgSearchResponse.items.forEach( (cesResult, j) => {
      item2 = {}
      item2['thumbnail'] = cesResult['image']['thumbnailLink']
      item2['source'] = cesResult['link']
      searchResults.push(item2)
    })
    // console.log("searchResults", searchResults)
    return searchResults
}

export function getUrls (mergedLabelPosition, addSearchResult){
  config.googleCSE.params.q = mergedLabelPosition.word + ' food'
  axios.get( config.googleCSE.baseUrl, {params:config.googleCSE.params} )
  .then( res => {
    // console.log("res", Object.keys(res))
    let searchResult = parseImgSearchResp(res.data)
    addSearchResult(mergedLabelPosition, searchResult)
  })
  .catch(error => {
    console.log("getUrls error", error)
  });
}

//  //get ces results via nlpServer
// export function getUrls (mergedLabelPosition, addSearchResult){
//   let keyWord = mergedLabelPosition.word
//   console.log("keyWord1", keyWord)
//   let url = config.nlpServer.imageUrlApi
//   axios.get(url, {params:{keyWord: keyWord}})
//   .then( res => {
//     let searchResult = parseImgSearchResp(res.data)
//     addSearchResult(mergedLabelPosition, searchResult)
//   })
//   .catch(error => {
//     console.log("error", error)
//   });
// }

export function getOCR(image) { 
  let now = new Date()
  let stamp = "wills_" + now.getFullYear()
    + ('00' + (now.getMonth()+1)).slice(-2)
    + ('00' + now.getDate()).slice(-2)
    + ('00' + now.getSeconds()).slice(-2)
    + ('000' + now.getMilliseconds()).slice(-3)
  return axios
    .post(config.googleCloudVision.api + config.googleCloudVision.key, {
      requests: [{
          image: { content: image },
          features: [ { type: 'TEXT_DETECTION', maxResults: 1 } ]
        }]
    })
    .then(response => {
      // console.log("response.data", response.data)
      response.data['stamp'] = stamp
      return response.data
      // console.log(config.nlpServer.ocrApi, Object.keys(response.data))
    })
    .catch(err => {console.log("getOCR error", err)});
}

export function getNLP(raw) {
  return axios.post(config.nlpServer.ocrApi, raw, {timeout: 1000})
    .then(response => {
      // console.log("response", response.data);
      return response.data
    })
    .catch(err => {
      console.log("getNLP error", err)
      return raw
    })
}

export function getUrls2 (labelPosition, i, addResult){
    let params = config.googleCSE.params
    params.q = Object.keys(labelPosition)[0]
    // console.log("params", params)
    let paramsStr = ( Object.entries(params).map( pair => pair[0] + '=' + pair[1] ) ).join('&')
    // console.log("paramsStr", config.googleCSE.api + '?' + paramsStr)
    axios.get( config.googleCSE.api + '?' + paramsStr )
    .then( res => {
      let searchResult = parseImgSearchResp(res.data)
      addResult( labelPosition, i, searchResult )
    })
    .catch(error => {
      console.log("error", error)
    });
  }

export function getTranslated (update, origText, targetLang) {
  config.googleTranslate.params.q = origText
  // config.googleTranslate.params.target = targetLang
  // console.log("origText", origText)
  axios.get( config.googleTranslate.baseUrl, {params:config.googleTranslate.params})
  .then(response=>{
    update(response['data']['data']['translations'][0]['translatedText']) 
  })
  .catch( error => { 
    console.log("translation error", error)
    update("")
  })
}

export function uploadRes(payload) {
  axios.post(config.nlpServer.uploadLabel, payload, {headers: { "Content-Type": "application/json" }} )
  .then( res => { console.log("uploadRes successed", res.data) } )
  .catch( error => { console.log("uploadRes error", error) } );
}

export function uploadOcrImg(payload) {
  axios.post(config.nlpServer.uploadImg, payload, {headers: { "Content-Type": "application/json" }} )
  .then( res => { console.log("uploadOcrImg successed", res.data) } )
  .catch( error => { console.log("uploadOcrImg error", error) } );
}