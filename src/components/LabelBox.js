import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import Styles, {LabelColor} from '../styles'

class LabelBox extends React.Component {
  constructor(){
    super()
  }

  styleLocation = (vertices, acitvated, normalStyle, activatedStyle) => {
    let imgW = 420, imgH = 746;
    let lbx = ((vertices[0].x * 100) / imgW - 0.2).toFixed(1) + '%';
    let lby = (((vertices[0].y) * 100) / imgH - 0.2).toFixed(1) + '%';
    let w = (((vertices[1].x - vertices[0].x) * 100) / imgW + 0.4 ).toFixed(1) + '%';
    let h = (((vertices[2].y - vertices[1].y) * 100) / imgH + 0.4 ).toFixed(1) + '%';
    
    return [acitvated ? activatedStyle : normalStyle,{
      position: 'absolute',
      left: lbx,
      top: lby,
      width: w,
      height: h,
    }]
  }

  select = (i) => {
    let labelByServerScoped = this.props.labelByServer
    labelByServerScoped[i].selected = !labelByServerScoped[i].selected
    this.props.setLabelByServer(labelByServerScoped)
  }

  labelBoxes = labelPositions => {
    // console.log("speated",labelPositions)
    let boxes = labelPositions
    let boxNum = labelPositions.length
    return boxes.map((box, i) => {
      if(box.enable){
        return <TouchableOpacity key={i.toString()}
          style={this.styleLocation(box.vertices, box.selected, Styles.labelSelectNeg, Styles.labelSelectPos)}
          onPress = { ()=>this.select(i) } />
      }else{
        return <TouchableOpacity />
      }
    })
  }

  labelBoxesMerged = labelPositions => {
    // console.log("merged",labelPositions)
    let boxes = labelPositions
    let boxNum = labelPositions.length
    return boxes.map((box, i) => {
      let realtedPosition = (130 * i).toFixed(0)
      return (
        <TouchableOpacity
        key={i.toString()}
        style={this.styleLocation(
          box.vertices,
          i == this.props.currentPosition,
          Styles.labelActivateNeg, Styles.labelActivatePos
          )}
        onPress = { ()=>this.props.scrollToPosition(realtedPosition) }
        />
      )
    })
  }

  render(){
    return(
      <View style={{position: "absolute", width: '100%', height: '100%',
          // borderRadius: 1, borderWidth: 3, borderColor: 'white',
          }}>
          {this.labelBoxes(this.props.labelByServer)}
          {this.labelBoxesMerged(this.props.labelByUser)}
      </View>
    )
  }

}

export default LabelBox

