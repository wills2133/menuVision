const TARGET_HEIGHT = 200;
const BORDER_OFFSET = 5;

function makeSmaller(image, amount) {
  amount = amount || 1;
  const newHeight = image.height - amount;
  image.width = image.width * (newHeight / image.height);
  image.height = newHeight;

  return image;
}

function getCumulativeWidth(images) {
  let width = 0;

  for (let i = 0; i < images.length; i++) {
    width += images[i].width;
  }

  width += (images.length - 1) * BORDER_OFFSET;

  return width;
}

function fitImagesInRow(images, maxWidth) {
  while (getCumulativeWidth(images) > maxWidth) {
    for (var i = 0; i < images.length; i++) {
      images[i] = makeSmaller(images[i]);
    }
  }
  return images;
}

export function processImages(photos) {
  return photos.map(photo => {
    const aspectRatio = photo.width / photo.height;
    photo.width = TARGET_HEIGHT * aspectRatio;
    photo.height = TARGET_HEIGHT;
    return photo;
  });
}

export function buildRows(processedImages, maxWidth) {
  let currentRow = 0;
  let currentWidth = 0;
  let rows = [];
  processedImages.forEach(image => {
    if (currentWidth >= maxWidth) {
      currentRow++;
      currentWidth = 0;
    }

    if (!rows[currentRow]) {
      rows[currentRow] = [];
    }

    rows[currentRow].push(image);
    currentWidth += image.width;
  });
  return rows;
}

export function normalizeRows(rows, maxWidth) {
  for (let i = 0; i < rows.length; i++) {
    rows[i] = fitImagesInRow(rows[i], maxWidth);

    const difference = maxWidth - getCumulativeWidth(rows[i]);
    const amountOfImages = rows[i].length;

    if (amountOfImages > 1 && difference < 10) {
      const addToEach = difference / amountOfImages;
      for (let n = 0; n < rows[i].length; n++) {
        rows[i][n].width += addToEach;
      }
      rows[i][rows[i].length - 1].width +=
        maxWidth - getCumulativeWidth(rows[i]);
    }
  }
  return rows;
}

export function parseOcrResponse(ocrResponse){
  let labelPositions = []
  if ( !!ocrResponse.responses 
  && ocrResponse.responses.length>0 
  && !!ocrResponse.responses[0].textAnnotations 
  && ocrResponse.responses[0].textAnnotations.length>0 )
  {
    ocrResponse.responses[0].textAnnotations.slice(1).forEach( (labelPos, i) => {
      let item = {}
      item[labelPos.description] =  labelPos.boundingPoly.vertices
      labelPositions.push(item)
    })
  }else{
    console.log(ocrResponse.responses.length)
    console.log(ocrResponse.responses[0].textAnnotations.length)
    console.log(ocrResponse.response!= undefined)
  }
  return labelPositions
}

export function parseOcrResponse2(ocrResponse){
  let labelPositions = []
  // console.log(ocrResponse.responses)
  if ( !!ocrResponse.responses 
  && ocrResponse.responses.length>0 
  && !!ocrResponse.responses[0].textAnnotations 
  && ocrResponse.responses[0].textAnnotations.length>0 )
  {
    ocrResponse.responses[0].textAnnotations.slice(1).forEach( (labelPos, i) => {
      let item = {}
      item.number = i
      item.word = labelPos.description
      item.selected = false
      item.enable = true
      item['vertices'] = labelPos.boundingPoly.vertices
      labelPositions.push(item)
    })
  }
  return labelPositions
}

export function parseImgSearchResponse(label, imgSearchResponse) {
  let searchResults = {}
    let item = []
    let item2 = {}
    imgSearchResponse.items.forEach( (cesResult, j) => {
      item2 = {}
      item2['thumbnail'] = cesResult['pagemap']['cse_thumbnail'][0]['src']
      item2['source'] = cesResult['pagemap']['cse_image'][0]['src']
      item.push(item2)
    })
    searchResults[label] = item
    // console.log("searchResults", searchResults)
    return item
}

export function mergeLabels(labelPositions) {
  let orderedwords = []
  let yTop= 0;
  let yBottom = 0;
  let xLeft = 0;
  let xRight = 0;
  if (labelPositions.length > 0){
    yTop = labelPositions[0].vertices[0].y;
    yBottom = labelPositions[0].vertices[2].y;
    xLeft = labelPositions[0].vertices[0].x;
    xRight = labelPositions[0].vertices[2].x;
  }
  //get merged box vertices
  for(let i=0; i<labelPositions.length; i++){
      if(xLeft > labelPositions[i].vertices[0].x){
          xLeft = labelPositions[i].vertices[0].x
      }
      if(yTop > labelPositions[i].vertices[0].y){
          yTop = labelPositions[i].vertices[0].y
      }
      if(xRight < labelPositions[i].vertices[2].x){
          xRight = labelPositions[i].vertices[2].x
      }
      if(yBottom < labelPositions[i].vertices[2].y){
          yBottom = labelPositions[i].vertices[2].y
      }
  }
  // order word sequence
  labelPositions.forEach( (labelPosition) => {
    let k=0
    for(let i=0; i<orderedwords.length; i++){
      if(labelPosition.vertices[0].x < orderedwords[i].vertices[0].x){
        break
      }else{
        k++
      }
    }
    orderedwords.splice(k, 0, labelPosition)
  })
  let mergedLabelPosition = {}
  mergedLabelPosition.number = 0
  mergedLabelPosition.word = orderedwords.map(word=>word.word).join('-')
  mergedLabelPosition.selected = false
  mergedLabelPosition.enable = true
  mergedLabelPosition.origin = orderedwords
  mergedLabelPosition['vertices'] = [
    {'y':yTop, 'x':xLeft}, 
    {'y':yTop, 'x':xRight}, 
    {'y':yBottom, 'x':xRight}, 
    {'y':yBottom, 'x':xLeft}
  ]
  // console.log("mergedLabelPosition", mergedLabelPosition)
  return mergedLabelPosition
}
