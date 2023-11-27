import {NavigationContainer} from '@react-navigation/native'
import Stack from './src/screens/index'
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native';

export default function App() {
  const [loaded] = useFonts({
    AileronH: require('./assets/font/Aileron-Heavy.otf'),
    AileronR: require('./assets/font/Aileron-Regular.otf'),
  });
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
}
