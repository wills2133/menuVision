import React, {StyleSheet} from 'react-native'

export const PictureWidth = 130
export const PictureOffset = 30
export const LabelColor = {
  serverPos: 'lightslategray',
  serverNeg: 'white',
  userPos: 'tomato',
  userNeg: 'gold'
}

export default StyleSheet.create({
  image: {width:'100%', height:'100%'},
  button: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderColor: 'white',
    padding:10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  // pictrue screen
  buttonPosition: {
    position: 'absolute', left: '4%', top: '3%', width: '20%',
  },
  buttonPosition2: {
    position: 'absolute', right: '4%', top: '3%', width: '20%',
  },
  buttonPosition3: {
    position: 'absolute', right: '44%', top: '3%', width: '12%',
  },
  scrollbarPosition: {
    position:"absolute", height:"30%", bottom:"0%"
  },
  // label box
  labelSelectNeg: {
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: 'white',
    opacity: 1
  },
  labelSelectPos: {
    borderRadius: 1,
    borderWidth: 2,
    borderColor: 'lightslategray',
    opacity: 1
  },
  labelActivateNeg: {
    borderRadius: 1,
    borderWidth: 2,
    borderColor: 'gold',
    opacity: 1
  },
  labelActivatePos: {
    borderRadius: 1,
    borderWidth: 2,
    borderColor: 'tomato',
    opacity: 1
  },
})