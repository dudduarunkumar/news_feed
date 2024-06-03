import { StyleSheet } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeButton from 'rn-swipe-button';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

interface SwipeAnimatonButtonProps {
  onSwipeSuccess: () => void;
  containerStyles?: object;
  height?: number;
  disabledRailBackgroundColor?: string;
  disabledThumbIconBackgroundColor?: string;
  railBackgroundColor?: string;
  railFillBackgroundColor?: string;
  railBorderColor?: string;
  railFillBorderColor?: string;
  thumbIconBackgroundColor?: string;
  thumbIconBorderColor?: string;
  titleStyles?: object;
  title?: string;
  swipeSuccessThreshold?: number;
  shouldResetAfterSuccess?: boolean;
}

const SwipeAnimatonButton: React.FC<SwipeAnimatonButtonProps> = ({
  onSwipeSuccess,
  containerStyles = { height: responsiveHeight(8), width: '98%' },
  height = responsiveHeight(8),
  disabledRailBackgroundColor = 'false',
  disabledThumbIconBackgroundColor = 'false',
  railBackgroundColor = '#fff',
  railFillBackgroundColor = '#75b9a2',
  railBorderColor = 'white',
  railFillBorderColor = 'white',
  thumbIconBackgroundColor = '#75b9a2',
  thumbIconBorderColor = 'white',
  titleStyles = {
    color: '#75b9a2',
    fontSize: responsiveFontSize(2.5),
    zIndex: 10,
  },
  title = 'Swipe to fetch',
  swipeSuccessThreshold = 95,
  shouldResetAfterSuccess = false,
}) => {
  return (
    <GestureHandlerRootView>
      <SwipeButton
        containerStyles={containerStyles}
        height={height}
        disabledRailBackgroundColor={disabledRailBackgroundColor}
        disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
        railBackgroundColor={railBackgroundColor}
        railFillBackgroundColor={railFillBackgroundColor}
        railBorderColor={railBorderColor}
        railFillBorderColor={railFillBorderColor}
        thumbIconBackgroundColor={thumbIconBackgroundColor}
        thumbIconBorderColor={thumbIconBorderColor}
        titleStyles={titleStyles}
        title={title}
        onSwipeSuccess={onSwipeSuccess}
        swipeSuccessThreshold={swipeSuccessThreshold}
        shouldResetAfterSuccess={shouldResetAfterSuccess}
      />
    </GestureHandlerRootView>
  );
};

export default SwipeAnimatonButton;

const styles = StyleSheet.create({});
