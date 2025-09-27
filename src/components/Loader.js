import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => (
  <LottieView
    source={require('../assets/lottie/loader.json')}
    autoPlay
    loop
    style={{ width: 100, height: 100 }}
  />
);

export default Loader;
