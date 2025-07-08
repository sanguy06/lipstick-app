import { View, Text} from "react-native"
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import https from "node:https"
import AsyncStorage from "@react-native-async-storage/async-storage"
import config from './config'
import axios from "axios"
export default function LoadImage() {

    const host = config.HOST
    const {user_img, product_img} = useLocalSearchParams()

    // Img URI can be string or array -> make it a single string 
    const userImgUri = getSingleParam(user_img)
    const prodImgUri = getSingleParam(product_img)

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
            await axios.post(`${host}/users/load-image`, {
                user_img: userImgUri, 
                product_img: prodImgUri
            }, {        
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },    
            })
        } catch(err){
            console.log(err)
        }
        try {
            /**
             * Needs to get most recent image id from postgres
             * Request presigned URL from backend with the image id
             * use presigned URL
             */
            let presignedURL = ""
            const image_id = await axios.get(`${host}/users/get-image`,  {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }})
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
            console.log(res)

        } catch (err) {
            console.log(err)
        }
    }
   
    return(
        <View>
            <Text>Loading Image</Text>
        </View>
    )
}