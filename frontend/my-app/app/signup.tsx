import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "expo-router"

import config from './config'

export default function Signup () {
    
    const host = config.HOST
    const router = useRouter()
    const[name, setName] = useState("")
    const[password, setPassword] = useState("")

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
       <View style={styles.background}>   
               <View style ={styles.container}>
                   <Text style={styles.text2}>
                        Enter in username and password
                    </Text>
                   <Text style={styles.text2}>
                       Username: 
                   </Text>
                   <TextInput 
                       value = {name} 
                       onChangeText = {setName} 
                       style={styles.inputBox} />
                   <Text style={
                        [styles.text2, 
                        {paddingTop: 10}]
                    }>
                       Password: 
                   </Text>
                   <TextInput 
                       value = {password} 
                       onChangeText = {setPassword} 
                       style={styles.inputBox} 
                   />
                   
                   <View style={{paddingTop: 20}}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={()=>setUserInfo(name, password)}>
                            <Text style={{
                                fontFamily:"CuteDino", 
                                fontSize: 20, 
                                color: '#2E2E2E'}}>
                            Sign Up
                            </Text>
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
    text2: {
        paddingTop: 10, 
        fontFamily:'CuteDino', 
        color: '#2E2E2E', 
        paddingBottom: 10, 
        fontSize: 20
    },
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
    }})
