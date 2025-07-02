import { Stack } from "expo-router";
import {useFonts} from 'expo-font';
import {useEffect} from "react";
import * as SplashScreen from 'expo-splash-screen'; 
import { LogBox } from 'react-native';
export default function RootLayout() {
  // Load in Font
  LogBox.ignoreLogs([
   /shadow.*/i,
  /pointerEvents/i,
]);
  const [loaded, error] = useFonts({
        'CuteDino': require('../assets/fonts/CuteDino.otf')
    })
    useEffect(()=>{
      if(loaded||error){
        SplashScreen.hideAsync()
      }
    }, [loaded,error])
    if(!loaded && !error){
      return null;
    }

  return <Stack />;
}
