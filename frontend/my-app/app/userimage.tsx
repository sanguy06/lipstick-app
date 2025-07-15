import { View, TouchableOpacity, StyleSheet, Text, Image, Alert } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import * as ImagePicker from 'expo-image-picker'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from "react"
import TakePhoto from "./takePhoto"



export default function UserImage() {
    
    const productImage = useLocalSearchParams()
    
    const [userImage, setUserImage] = useState<string |null>(null)
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
            setUserImage(result.assets[0].uri)
        }
        
    }
    
    return(
        <View style={styles.container}>
            <Text style={[styles.text_container, {paddingTop: 80}]}>
                <Text>Upload image of yourself here</Text>
            </Text>
            <TouchableOpacity style={styles.box_container} onPress={pickImage}>     
                { !userImage ? 
                (<View style={{paddingTop: 100}}>
                    <Ionicons 
                        name="cloud-upload-outline" 
                        size={70}
                        color='#B76E79'
                    />
                </View>)
                :
                (<Image source={{uri: userImage}} style = {{width: '100%', height: '100%'}}/>)
                }
            </TouchableOpacity>    
          
            <Text style={[styles.text_container, {paddingTop: 30}]}>or</Text>
            <Text style={styles.text_container}>Take photo</Text>
            <TouchableOpacity onPress={()=>{router.push({pathname: '/takePhoto',  params:{productImage: productImage.productImage}})}}>
                <AntDesign name='camera' size={44} color='#B76E79'/>
            </TouchableOpacity>
            <View style={styles.button_container}>
                <TouchableOpacity style={styles.back_button} >
                    <Text style={{
                        fontFamily:"Cute Dino", 
                        color: '#2E2E2E'}}
                    >
                        Back
                    </Text>
                    <Ionicons 
                        name='arrow-back-outline' 
                        title ='Save' 
                        size={44} 
                        color='#B76E79'
                        onPress={()=>{router.push({pathname: '/productimage'})}}
                    />
                </TouchableOpacity>
            <TouchableOpacity style={styles.next_button} >
                <Text style={{
                    fontFamily:"Cute Dino", 
                    color: '#2E2E2E'}}
                >
                    Next
                </Text>
                <Ionicons 
                    name='arrow-forward-outline' 
                    title ='Save' 
                    size={44} 
                    color='#B76E79'
                    onPress={()=>{router.push({
                        pathname: '/loadImage', 
                        params:{
                            user_img: userImage, 
                            product_img: productImage.productImage}})
                        }}/>
            </TouchableOpacity>
            
            </View>
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
           
            fontFamily: "CuteDino", 
            fontSize: 30, 
            color: '#2E2E2E', 
            paddingBottom: 20, 
            textAlign:'center', 
            width: '80%'
            
        }, 
        box_container: { 
            alignItems: 'center',
            borderRadius: 10, 
            width: "70%", 
            height: "40%", 
            borderColor: '#B76E79', 
            borderWidth: 5, 
            backgroundColor: 'white'
        },
        button_container: {
           
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20, 
            paddingHorizontal: 40, 
            width: '100%'       
        }, 
        next_button: {
            alignItems: 'center',      
        },
        back_button: {        
            alignItems: 'center',
           
        }

})