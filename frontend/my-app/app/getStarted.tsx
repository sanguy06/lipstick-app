import { Text, View, StyleSheet } from "react-native"

export default function GetStarted(){
    return(
        <View style={styles.container}>
            <Text style={{fontFamily: 'CuteDino', fontSize: 20}}>Enter in username and password</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#fab6c7', 
        textAlign: 'center', 
        alignItems:'center'
    }
    
})