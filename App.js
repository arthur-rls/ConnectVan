import {NavigationContainer} from '@react-navigation/native'
import Stack from './src/screens/index'
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function App() {
  const [loaded] = useFonts({
    AileronH: require('./assets/font/Aileron-Heavy.otf'),
    AileronR: require('./assets/font/Aileron-Regular.otf'),
  });
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(()=>{
    video.current.playAsync()
  }, [])
  
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require('../../../assets/SplashScreen.mp4')}
        useNativeControls = {false}
        resizeMode={ResizeMode.CONTAIN}
        videoStyle={styles.video}
      />
       
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingTop: 25,
    flex:1
  
  },

   video: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#000000',
  },
});