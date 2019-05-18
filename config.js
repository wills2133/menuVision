const config = {
  googleCloudVision: {
    api: 'https://vision.googleapis.com/v1/images:annotate?key=',
    key: ''
  },
  googleTranslate: {
    api: 'https://translation.googleapis.com/language/translate/v2'
  },
  googleCSE: {
    api: `https://www.googleapis.com/customsearch/v1`,
    params: {
      q: '',
      cx: '001848459722732377703%3Abqrqfxulxua',
      searchType: 'image',
      key: ''
    }
  },
  nlpServer: {
    ocrApi: `http://18.217.27.172:5000/ocr`,
    uploadApi: `http://18.217.27.172:5000/receive`,
    imgaeUrlApi: `http://18.217.27.172:5000/imageurls`
  }
};

module.exports = config;

