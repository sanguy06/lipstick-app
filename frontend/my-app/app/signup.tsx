import {Text, View, StyleSheet, TextInput, Button} from "react-native";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "expo-router"

import config from './config'

export default function Signup () {
    
    const host = config.HOST
    const router = useRouter()
    const[name, setName] = useState("")
    const[password, setPassword] = useState("")

    const styles = StyleSheet.create({
            inputBox: {
                height: 40, 
                borderColor: 'gray', 
                borderWidth: 1,
                width: 200, 
            }
    })

    function setUserInfo(name: string, password: string) {
        axios.post(`${host}/users/signup`, 
            {
            user_name: name, 
            passcode: password
            })
        .then( (res)=> {
            router.navigate('/login')
        })
    }
    
    return(
        <View
            style={{display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingTop: 200}}>
            <Text style={{fontFamily:"CuteDino", fontSize: 50, paddingBottom: 20}}>Sign Up!</Text>
            <Text style={{fontFamily:'CuteDino'}}>Username: </Text>
            <TextInput value = {name} onChangeText = {setName} style={styles.inputBox} />
            <Text style={{fontFamily:'CuteDino'}}>Password: </Text>
            <TextInput value = {password} onChangeText = {setPassword} style={styles.inputBox} />
            <Button title="Submit" onPress={()=>
                setUserInfo(name, password)           
            }></Button>
            </View>
    )
}