import { Text, View, StyleSheet, TouchableOpacity, Alert, Image} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import * as ImagePicker from 'expo-image-picker'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from "react"

import axios from "axios"

export default function ProductImage() {
    const [productImage, setProductImage] = useState<string |null>(null)
    let img = ""
    const router = useRouter()
    useEffect(()=>{

    })
    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        })
        if(!result.canceled) {
            setProductImage(result.assets[0].uri)
        }
        
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.text_container}>
                <Text>Upload image of your lipstick here</Text>
            </Text>
            <TouchableOpacity style={styles.box_container} onPress={pickImage}>     
                { !productImage ? 
                (<View style={{paddingTop: 100}}><Ionicons name="cloud-upload-outline" size={70}></Ionicons></View>)
                :
                (<Image source={{uri: productImage}} style = {{width: '100%', height: '100%'}}/>)
                }
            </TouchableOpacity>    
            <TouchableOpacity style={styles.button_container}>
                <Ionicons 
                    name="arrow-forward-outline" 
                    size={44} 
                    onPress={()=> productImage ? (
                        router.push({
                        pathname: '/takePhoto',
                        params: { productImage },
                        }))
                    :
                       ( Alert.alert('Please select an image first') )                    
                    }
                >
                </Ionicons>
            </TouchableOpacity>
        </View>
        
    )

}

 const styles = StyleSheet.create({
        container:{
            flex: 1, 
            flexDirection: "column", 
            alignItems: "center",
            position: "relative", 
            backgroundColor: '#fab6c7', 
           
        }, 
        text_container: {
            paddingTop: 100,
            fontFamily: "CuteDino", 
            fontSize: 30, 
            color: '#2E2E2E', 
            paddingBottom: 20, 
            textAlign:'center'
            
        }, 
        box_container: { 
            alignItems: 'center',
            borderRadius: 10, 
            width: "70%", 
            height: "40%", 
            borderColor: '#2E2E2E', 
            borderWidth: 5, 
            backgroundColor: 'white'
        },
        button_container: {
            position:'absolute',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            width: '100%', 
            bottom: 30,
            paddingHorizontal: 20,
            justifyContent: 'center'
        }
    })