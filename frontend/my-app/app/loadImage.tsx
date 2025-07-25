import { View, Text, Image, StyleSheet, ActivityIndicator, Pressable, Modal, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import https from "node:https"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import config from './config'
import axios from "axios"
export default function LoadImage() {

    const host = config.HOST
    const {user_img, product_img} = useLocalSearchParams()
    const router = useRouter()
    // Img URI can be string or array -> make it a single string 
    const userImgUri = getSingleParam(user_img)
    const prodImgUri = getSingleParam(product_img)
    const[ogImage, setOgImage] = useState("")
    const [finalImage, setFinalImage] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    // Get Image Type -> will be sent as mimetype in GET URL request
    const user_img_type = userImgUri?.split('.').pop()?.toLowerCase()
    const product_img_type = prodImgUri?.split('.').pop()?.toLowerCase()
    
    useEffect(()=>{
        getPresignedURL()
    }, [])

    function getSingleParam(param: string | string[] | undefined): string | undefined {
        if (Array.isArray(param)) return param[0];
        return param;
    }
    
    // Upload to S3
    async function getPresignedURL () {

        let userPresigned = ""
        let productPresigned = ""
        const accessToken = await AsyncStorage.getItem('accessToken'); 
       try {
        // Get Presigned URL for User Image
        await axios.get(`${host}/users/create-put-url`, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }, 
            params: {image_uri: user_img, mimetype: user_img_type}
        })         
        .then((res)=>{
            userPresigned = res.data
            
            console.log("User Presigned: " + userPresigned)
        })
       
        // Get Presigned URL for Product Image
         await axios.get(`${host}/users/create-put-url`, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }, 
            params: {image_uri: product_img, mimetype: product_img_type}
        })         
        .then((res)=>{
            productPresigned = res.data
            console.log("Product Presigned: " + productPresigned)
        })

    } catch (err) {
        console.log(err)
    }
        // Fetch Binary Data 
        let user_uri = null
        let product_uri = null
        let user_blob = null
        let product_blob = null

        if(userImgUri){
            user_uri = await fetch(userImgUri);
            user_blob = await user_uri.blob()
        }
        if(prodImgUri)
        {
            product_uri = await fetch(prodImgUri)
            product_blob = await product_uri.blob()
        }
     
        // Use Pre-Signed URL to Upload to S3
        try {
            await fetch(userPresigned, {
                method: 'PUT', 
                headers: {
                    'Content-Type': `image/${user_img_type}`
                }, 
                body: user_blob
            })

            await fetch(productPresigned, {
                method: 'PUT', 
                headers: {
                    'Content-Type': `image/${product_img_type}`
                }, 
                body: product_blob
            })
            console.log("Something should have happened")
        } catch(err) {
            console.log(err)
        }
        try {
            let image_id = ""
            let presignedURL = ""
            await axios.post(`${host}/users/load-image`, {
                user_img: userImgUri, 
                product_img: prodImgUri
            }, {        
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },    
            })
            .then((res) =>{
                image_id = res.data
                console.log(image_id)
            })
            await axios.get(`${host}/users/get-processed-image`, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }, 
                params: {image_id: image_id}
            }) 
            .then((res)=>{
                presignedURL = res.data
                console.log(presignedURL)
            })
            const res = await fetch(presignedURL)
            console.log("Finished image url: ", res.url)
            setFinalImage(res.url)
        } catch(err){
            console.log(err)
        }     
    }
   
    return(
        <View style={styles.container}>
            {finalImage? (   
                <View>         
                    <Text style={styles.text}>Results are in... 
                        <Pressable onPress={()=>setModalVisible(true)} hitSlop={10}>
                            <Text style={{ 
                                fontFamily: "CuteDino", 
                                color: 'blue', 
                                textDecorationLine: 'underline' }}>
                                Click here to view
                            </Text>
                        </Pressable>    
                    </Text> 
                    
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setModalVisible(false)}>
                        <View style={styles.image}>
                        <Image
                            source={{uri: finalImage}}
                            style={{borderRadius: 20, width: "80%", height: "70%"}}
                            resizeMode="contain"
                        />  
                        <TouchableOpacity
                            onPress={()=>setModalVisible(false)}
                        >
                            <MaterialCommunityIcons
                             name="close"
                                size={30}
                                color="black">
                            </MaterialCommunityIcons>
                        </TouchableOpacity>  
                        <TouchableOpacity></TouchableOpacity>  
                        </View>
                    </Modal>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={()=> router.navigate('/productimage')}
                    >
                        <Text style={{fontFamily: "CuteDino", fontSize: 30, color: '#2E2E2E'}}>Try more</Text>
                    </TouchableOpacity>
                </View> 
            ): (
                <ActivityIndicator size='large' color='white'/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems:'center', 
        backgroundColor: 'pink'
    },
    close_button: {

    }, 
    text: {
        fontFamily:'CuteDino', 
        fontSize: 20, 
        paddingBottom: 50, 
        color: '#2E2E2E', 
        lineHeight: 30
    }, 
    image: {
        flex: 1, 
        justifyContent: 'center',
        alignItems:'center', 
        alignContent: 'center'
    }, 
    button: {
        backgroundColor: '#B76E79', 
        borderRadius: 10, 
        borderWidth: 2, 
        paddingVertical: 10,
        paddingHorizontal: 50, 
        borderColor: '#B76E79', 
        justifyContent: 'center', 
        alignItems: 'center'
    }

    
})

