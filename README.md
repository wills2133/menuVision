# menuVision
a mobile app interpret restaurant menu text to pictures

# setup
```javascript
const config = {
  googleCloudVision: {
    api: 'https://vision.googleapis.com/v1/images:annotate?key=',
    key: 'your_googlevision_api_key'
  },
  googleTranslate: {
    api: 'https://translation.googleapis.com/language/translate/v2'
  },
  googleCSE: {
    api: `https://www.googleapis.com/customsearch/v1`,
    params: {
      q: '',
      cx: 'your_google_cx',
      searchType: 'image',
      key: 'your_google_cse_key'
    }
  },
  nlpServer: {
    ocrApi: `http://18.217.27.172:5000/ocr`,
    uploadApi: `http://18.217.27.172:5000/receive`,
    imgaeUrlApi: `http://18.217.27.172:5000/imageurls`
  }
}
```
<br/>
<img src="https://github.com/wills2133/menuVision/blob/master/readme/IMG_4113.JPG" width="320">
<img src="https://github.com/wills2133/menuVision/blob/master/readme/IMG_4114.JPG" width="320">
<br/>

# run

this is a expo porject
https://docs.expo.io/versions/latest/
