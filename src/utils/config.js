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
    ocrApi: `https://uploader.w2133.net/ocr`,
    uploadLabel: `https://uploader.w2133.net/label`,
    uploadImg: `https://uploader.w2133.net/imageocr`,
    imageUrlApi: `https://uploader.w2133.net/imageurls`
    // ocrApi: `http://192.168.1.91:5000/ocr`,
    // uploadLabel: `http://192.168.1.91:5000/label`,
    // uploadImg: `http://192.168.1.91:5000/imageocr`,
    // imageUrlApi: `http://192.168.1.91:5000/imageurls`
  }
};

module.exports = config;

