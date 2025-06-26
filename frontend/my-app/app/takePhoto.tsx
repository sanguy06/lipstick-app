import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, Image } from "react-native"
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useRef, useState, useEffect } from 'react';
import { useRouter } from "expo-router"
import * as MediaLibrary from 'expo-media-library'

export default function TakePhoto() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [perm, requestPerm] = useCameraPermissions(); 
    const [photo, setPhoto] = useState<any>(null);
    const cameraRef = useRef<CameraView | null>(null);
    const router = useRouter();

    useEffect(()=>{
      (async()=>{
        MediaLibrary.requestPermissionsAsync();
      })();
    }, [])
    
    if(!perm){
        return <View />;
    }
    if(!perm.granted){
        return(
            <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPerm} title="grant permission" />
      </View>
        )
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
      try{
        if(cameraRef.current) {
          console.log("accessed")
          const options = {
            quality: 1, 
            base64: true, 
            exif: false,
          }
          const takenPhoto = await cameraRef.current.takePictureAsync(options);
          console.log(takenPhoto.uri)
          setPhoto(takenPhoto);
          
  
      }} catch(err) {
        console.log(err)
       }
      }
    

    return(
        <View style={{flex:1}}>
          {!photo ?
            <View style={styles.container}>
              <CameraView style={styles.camera} facing={facing} ref={cameraRef}></CameraView>
              <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>      
                        <AntDesign name='retweet' size={44} color='black'/>
                      </TouchableOpacity>
                      <TouchableOpacity style = {styles.button} onPress = {handleTakePhoto}>
                          <AntDesign name='camera' size={44} color='black'/>
                      </TouchableOpacity>
                    
                </View>
            </View>
            :    
            <View style={styles.container}>       
              <Image source={{uri: photo.uri}} style={styles.camera}/>          
              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={()=> setPhoto(null)}>
                    <AntDesign name='retweet' title="Re-take" size={44} color='white'/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} >
                    <Ionicons name='arrow-forward-outline' title ='Save' size={44} color='white' 
                      onPress={()=>{router.push({pathname: '/productinfo', params:{image_uri: photo.uri}})}}/>
                  </TouchableOpacity>
                  
              </View>
            </View>
          } 
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position:'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%', 
    bottom: 30
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }},
     modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

 
})