import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Ionicons } from '@expo/vector-icons'


export default function ProductInfo() {
    const [productName, setProductName] = useState("")
    const [shadeName, setShadeName] = useState("")
    const [brandName, setBrandName] = useState("")
    const { image_uri } = useLocalSearchParams();
    const router = useRouter();
    function handleSubmit () {
        router.push({pathname:'/loadImage', 
            params:{image_uri: image_uri, brand: brandName, product: productName, shade: shadeName}})
    }

    return(
        <View style={{
            flex: 1, alignItems: 'center'}}>
            <View style={styles.text_container}>
                <Text style={{fontFamily: 'CuteDino'}}>Enter in brand name</Text>
                <TextInput value= {brandName} onChangeText={setBrandName} style={styles.inputBox}></TextInput>
                <Text style={{fontFamily: 'CuteDino'}}>Enter in product name</Text>
                <TextInput value= {productName} onChangeText={setProductName} style={styles.inputBox}></TextInput>
                <Text style={{fontFamily: 'CuteDino'}}>Enter in shade name</Text>
                <TextInput value= {shadeName} onChangeText={setShadeName} style={styles.inputBox}></TextInput>
                
                
           </View>
           <View style={styles.button_container}>
                <TouchableOpacity>
                    <Ionicons name="arrow-forward-outline" size={44} onPress={() => handleSubmit()}></Ionicons>
                </TouchableOpacity>
           </View>
           
        </View> 
    )
}

const styles = StyleSheet.create({
    inputBox: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        width: 200 },
    text_container: {
        paddingTop: 100,
        alignContent: 'center',
        justifyContent: 'center'
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
