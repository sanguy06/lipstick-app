import { Text, View, StyleSheet, Button, TextInput} from "react-native";
import {useState} from "react"; 
import axios from "axios";
import {useRouter} from 'expo-router';
export default function Login() {
    const router = useRouter(); 
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const styles = StyleSheet.create({
        inputBox: {
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            width: 200, 
        }
    })

    function setUserInfo (name: string, password: string) {
      
        console.log(name)
        console.log(password)
        axios.post("http://10.0.2.2:4000/users/login", 
            {
            user_name: name, 
            passcode: password
            })
        .then( (res)=> {
            if(res.data !== "Not allowed")
            {
                router.navigate('/takePhoto')
            } else {
                router.navigate('/failedlogin')
            }
        })
        
    }
    return(
        <View
            style={{display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingTop: 200}}>
            <Text style={{fontFamily:"CuteDino", fontSize: 50, paddingBottom: 20}}>Login!</Text>
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