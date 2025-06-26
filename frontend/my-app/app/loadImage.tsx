import { View, Text} from "react-native"
import { useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import axios from "axios"
export default function LoadImage() {
    const {image_uri, product, brand} = useLocalSearchParams()

    function sendImageData () {
        axios.post("http://10.0.2.2:4000/product-info", {
            image_uri: image_uri, 
            product: product, 
            brand: brand
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