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
                Upload image of your lipstick here
            </Text>
            <TouchableOpacity style={styles.box_container} onPress={pickImage}>     
                { !productImage ? 
                (
                <View>
                    <Ionicons
                        style={{paddingTop: 100}}
                        name="cloud-upload-outline" 
                        size={70}
                        color='#B76E79'
                    />
                </View>)
                :
                (<Image source={{uri: productImage}} style = {{width: '100%', height: '100%'}}/>)
                }
            </TouchableOpacity>  
            <View style={styles.button_container}>
                <TouchableOpacity style={styles.back_button}>
                    <Text style={{fontFamily:"Cute Dino"}}>Back</Text>
                    <Ionicons
                        name="arrow-back-outline"
                        size={44}
                        color='#B76E79'
                        onPress={()=>router.push('/demo')}
                    />

                </TouchableOpacity>
                <TouchableOpacity style={styles.next_button}>
                    <Text style={{fontFamily:"CuteDino"}}>Next</Text>
                    <Ionicons 
                        name="arrow-forward-outline" 
                        size={44} 
                        color="#B76E79"
                        onPress={()=> productImage ? (
                            router.push({
                            pathname: '/userimage',
                            params: { productImage },
                            }))
                        :
                        ( Alert.alert('Please select an image first') )                    
                        }
                    >
                    </Ionicons>
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
            justifyContent: 'space-between'
           
        },
        text_container: {
            paddingTop: 100,
            fontFamily: "CuteDino", 
            fontSize: 30, 
            color: '#2E2E2E', 
            textAlign:'center'
            
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
            marginBottom: 50, 
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