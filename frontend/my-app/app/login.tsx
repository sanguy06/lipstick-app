import { Text, View, StyleSheet, Button, Pressable, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"; 
import axios from "axios";
import {useRouter} from 'expo-router';
import config from './config'

export default function Login() {

    const host = config.HOST
    const router = useRouter(); 
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [text, setText] = useState(true)

   
    function setUserInfo (name: string, password: string) {  

        axios.post(`${host}/users/login`, 
            {
            user_name: name, 
            passcode: password
            })
        .then( async (res)=> {
            console.log("data is", res.data)
            if(res.data === "No Match" || res.data === "Not Allowed")
            {
                console.log(text)
                setText(false)        
            }
                
             else {
                console.log(text)
                await AsyncStorage.setItem('accessToken', res.data.accessToken);
                router.navigate('/demo')   
                      
            }
        })  

    }
    const textComponent = text ? (
                <Text style={styles.text1}>Enter in username and password</Text> 
            ) : (
                <Text style={styles.text1}>Wrong username or password</Text>
            )
        
    return(
       
        <View style={styles.background}>   
        <View style ={styles.container}>
            <View>{textComponent}</View>
            <Text style={styles.text2}>
                Username: 
            </Text>
            <TextInput 
                value = {name} 
                onChangeText = {setName} 
                style={styles.inputBox} />
            <Text style={[styles.text2, {paddingTop: 10}]}>
                Password: 
            </Text>
            <TextInput 
                value = {password} 
                onChangeText = {setPassword} 
                style={styles.inputBox} 
            />
            <Text style={{
                paddingTop: 20, 
                fontSize: 15, 
                fontFamily:"CuteDino"}}>
                <Text>Dont have an account? </Text>
                <Pressable onPress={()=>router.navigate('/signup')} hitSlop={10}>
                    <Text style={{ fontFamily: "CuteDino", 
                        color: 'blue', 
                        textDecorationLine: 'underline' }}>
                        Sign up here
                    </Text>
                </Pressable>    
            </Text>
            <View style={{paddingTop: 20}}>
             <TouchableOpacity style={styles.button} onPress={()=>setUserInfo(name, password)}>
                <Text style={{fontFamily:"CuteDino", fontSize: 20, color: '#2E2E2E'}}>Login</Text>
            </TouchableOpacity>
            </View>
           
         </View>
        </View>
    )
}


 const styles = StyleSheet.create({
    background: {
        flex: 1,  
        backgroundColor: '#fab6c7',  
    },
    container: {
        flex: 1, top: -100, alignItems: 'center', justifyContent: 'center'
    },
    text1: {
        fontFamily:"CuteDino", 
        fontSize: 25, 
        paddingBottom: 20, 
        color: '#2E2E2E', 
        textAlign: 'center'
    },
    text2: {paddingTop: 10, 
                fontFamily:'CuteDino', 
                color: '#2E2E2E', 
                paddingBottom: 10, 
                fontSize: 20},
    inputBox: {
        height: 40, 
        borderColor: '#2E2E2E', 
        borderRadius: 10,
        borderWidth: 2,
        width: 200, 
        backgroundColor: 'white', 
    }, 
    button: {       
        backgroundColor: '#B76E79', 
        borderRadius: 10, 
        borderWidth: 2, 
        paddingVertical: 10,
        paddingHorizontal: 70, 
        borderColor: '#B76E79', 
        justifyContent: 'center'
    }
    

})