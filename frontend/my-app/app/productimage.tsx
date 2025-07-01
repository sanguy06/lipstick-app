import { Text, View, StyleSheet, TouchableOpacity} from "react-native"
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
                <Text>Upload image</Text>
                <Text> here!</Text>
            </Text>
            <TouchableOpacity style={styles.box_container} onPress={pickImage}>      
                <Ionicons name="cloud-upload-outline" size={44}></Ionicons>
            </TouchableOpacity>    
            <TouchableOpacity style={styles.button_container}>
                <Ionicons 
                    name="arrow-forward-outline" 
                    size={44} 
                    onPress={()=>{router.push({pathname: '/takePhoto', params:{productImage: productImage}})}}
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
            position: "relative"
        }, 
        text_container: {
            paddingTop: 100,
            fontFamily: "CuteDino", 
            fontSize: 40
        }, 
        box_container: {
           
            alignItems: 'center',
            paddingTop: 100,
            borderRadius: 10, 
            width: "70%", 
            height: "40%", 
            borderColor: 'gray', 
            borderWidth: 5
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