import { View, Text} from "react-native"
import { useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import axios from "axios"
export default function LoadImage() {
    const {user_img, product_img} = useLocalSearchParams()
   
    console.log("user image is" + user_img)
    console.log("product image is " + product_img)
    function sendImageData () {

        axios.post("http://192.168.1.21:4000/load-image", {
            user_img: user_img, 
            product_img: product_img
        })
    }
    useEffect(()=>{
        sendImageData()
    }, [])
    return(
        <View>
            <Text>Loading Image</Text>
        </View>
    )
}