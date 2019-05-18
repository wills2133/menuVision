import { Constants } from 'expo';
import React from 'react';
import { Text, Image, View, Animated } from 'react-native';

class AniCard extends React.Component {
  state = {
    scale: new Animated.Value(1),  // Initial value for opacity: 0
    moveX: new Animated.Value(-0.9),
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
          toValue: 1.5, 
          duration:100,
        }),
        Animated.timing(this.state.moveX, {
          toValue: 0,
          duration: 100, 
        }),
        Animated.timing(this.state.moveY, {
          toValue: 1,
          duration: 100, 
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

  animeStyle = {
    width: Animated.multiply(this.state.scale, 120),
    height: Animated.multiply(this.state.scale, 120),
    bottom: Animated.multiply(this.state.moveX, 80),
    // left: Animated.multiply(this.state.moveY, 60),
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
          height:120,
          width:120,
          left:0,
          marginRight:10,
          borderWidth:0.5,
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