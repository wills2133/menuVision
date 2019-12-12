import { Constants } from 'expo';
import React from 'react';
import { ScrollView } from 'react-native';
import Styles, {PictureWidth, PictureOffset} from '../styles'

class ScrollBar extends React.Component {
  constructor() {
    super();
    this.state = {scrollOffset:0, currentCard:0, currentPosition:0};
    this.scrollViewRef;
  }

  onAnimationEnd(scrollView) {
      // calculate offset
      var offSetX = scrollView.nativeEvent.contentOffset.x
      this.props.getCurrentPosition(offSetX)
      this.setState({scrollOffset:offSetX})
      // console.log("offSetX2", this.state.scrollOffset);
      // calculate current offset
      var currentPage = Math.floor((offSetX / PictureWidth));
    }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentPosition != nextProps.toPosition){
      // console.log("nextProps.toPosition", nextProps.toPosition)
      this.autoScroll(nextProps.toPosition)
      this.setState({currentPosition:nextProps.toPosition})
    }
  }

  autoScroll = (toPosition) => {
      var scrollView = this.scrollViewRef;
      scrollView.scrollResponderScrollTo({x: toPosition, y: -0, animated: true});
    }

  renderChildren = () => {
    const { children } = this.props;
    return (
      React.Children.map(children, child =>
      React.cloneElement(child, { current: this.state.scrollOffset })
      )
    )
  }

  render() {
    return (
      <ScrollView scrollEventThrottle={150} horizontal={true} 
      snapToInterval={PictureWidth} snapToAlignment={'center'} decelerationRate={'fast'}
      alwaysBounceHorizontal = {true} overScrollMode={'never'}
      showsHorizontalScrollIndicator={true} pagingEnabled={false}
      onScroll={(scrollView)=>this.onAnimationEnd(scrollView)}
      ref = {(elem) => this.scrollViewRef = elem}>
        {this.renderChildren()}
      </ScrollView>
    );
  }
}

export default ScrollBar;