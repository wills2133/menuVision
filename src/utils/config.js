const config = {
  googleCloudVision: {
    api: 'https://vision.googleapis.com/v1/images:annotate?key=',
    key: 'AIzaSyDEZwOzRv8P1ck-wSjlbExEIJwsImLtHRk'
  },
  googleTranslate: {
    baseUrl: 'https://translation.googleapis.com/language/translate/v2',
    params:{
      target:'zh-CN',
      key:'AIzaSyBBEhmR6aqN8XLyOFKzpZPBBbOQ2vuqW-g',
      q:'default'
    } 
  },
  googleCSE: {
    baseUrl: 'https://www.googleapis.com/customsearch/v1',
    params: {
      q: '',
      cx: "001848459722732377703:bqrqfxulxua",
      searchType: 'image',
      key: 'AIzaSyDEZwOzRv8P1ck-wSjlbExEIJwsImLtHRk'
    }
  },
  nlpServer: {
    ocrApi: `http://18.217.27.172:5000/ocr`,
    uploadApi: `http://18.217.27.172:5000/receive`,
    imgaeUrlApi: `http://18.217.27.172:5000/imageurls`
  }
};

module.exports = config;

