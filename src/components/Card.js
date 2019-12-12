// import { Constants } from 'expo';
import React from 'react';
import { Animated } from 'react-native';

const baseWidth = 120
const baseHeight = 120
const baseX = 80
const baseY = 60

class AniCard extends React.Component {
  state = {
    scale: new Animated.Value(1),  // Initial value for opacity: 0
    moveX: new Animated.Value(-0.9), // -1 -> 0px to bottom
    moveY: new Animated.Value(0),
  }
  componentWillReceiveProps(nextProps) {
    // console.log("current", nextProps.current);
    // console.log("positionMin", nextProps.positionMin);
    // console.log("positionMax", nextProps.positionMax);
    if(nextProps.current > this.props.positionMin
      && nextProps.current < this.props.positionMax){
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 1.3, 
          duration:200,
        }),
        Animated.timing(this.state.moveX, {
          toValue: -0.45,
          duration: 200, 
        }),
        Animated.timing(this.state.moveY, {
          toValue: 1,
          duration: 200, 
        }),
      ]).start();
    }else{
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 1,
          duration:200,
        }),
        Animated.timing(this.state.moveX, {
          toValue: -0.9,
          duration: 200, 
        }),
        Animated.timing(this.state.moveY, {
          toValue: -1,
          duration: 200, 
        }),
      ]).start();
    }
  }

  //style varies according to Animate state
  animeStyle = {
    width: Animated.multiply(this.state.scale, baseWidth),
    height: Animated.multiply(this.state.scale, baseHeight),
    bottom: Animated.multiply(this.state.moveX, baseX),
    // left: Animated.multiply(this.state.moveY, baseY),
  }

  setStyle = () => {
    if (this.props.emptyCard){
      return(
        {
          height:120,
          width:120,
          // backgroundColor: 'powderblue'
        }
      )
    }
    else{
      return(
        {
          height:baseWidth,
          width:baseHeight,
          left:0,
          marginRight:10,
          borderWidth:0,
          borderColor:"#dddddd",
          // position:"aboulute",
          // backgroundColor: 'powderblue'
          ...this.animeStyle,
        }
      )
    }
  }

  render() {
    return (
      <Animated.View
        style={this.setStyle()}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default AniCard;