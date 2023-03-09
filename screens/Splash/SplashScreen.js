import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../constants/theme';
import {icons} from '../../constants/';

class Splashscreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 7000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={icons.launcher_image}
          style={styles.image}
          imageStyle={{
            resizeMode: 'stretch', // works only here!
          }}>
          <Text style={styles.text}>UXCam Demo</Text>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#161E35',
  },
  image: {
    flex: 8,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    ...FONTS.body1,
  },
});
export default Splashscreen;
