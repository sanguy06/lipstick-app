import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { AntDesign, Ionicons } from '@expo/vector-icons'
export default function Demo() {
    const router = useRouter(); 
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    Please upload an image of the desired lipstick with a solid background
                </Text>
                <View style={styles.image_wrapper}>
                    <Image 
                        style={styles.image}
                        source={require('../assets/images/lipstick2.webp')}>
                    </Image>  
                    <View style={styles.next_button}>
                        <TouchableOpacity >
                            <Text style={{
                                fontFamily:"Cute Dino", 
                                color: '#2E2E2E'}}
                            >
                                Next
                            </Text>
                            <Ionicons 
                                name='arrow-forward-outline' 
                                title ='Save' 
                                size={44} 
                                color='#B76E79'
                                onPress={()=>{router.push({
                                pathname: '/productimage'})}}/>
                        </TouchableOpacity>          
                    </View>                  
                </View>                                 
            </View>               
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fab6c7', 
        alignItems: 'center', 
        alignContent: 'center', 
       
    },
    wrapper: {
        flex: 1,
        textAlign: 'center', 
        width: '80%', 
        alignContent: 'center', 
        height: '100%', 
        position: 'absolute'
    },
    text: {
        paddingTop: 50,
        fontFamily:'CuteDino', 
        fontSize: 20, 
        paddingBottom: 20, 
        color: '#2E2E2E', 
        lineHeight: 30
        
    }, 
    text_container: {
        flex: 1, 
        alignContent: 'center', 
        alignItems: 'center',
        width: '30%', 
        height: '30%', 
    },
    image_wrapper: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    }, 
    image: {     
        width: '80%', 
        height: '50%', 
        borderRadius: 10, 
    },
    button: {
        paddingTop: 50,
        color: 'black',  
    }, 
    next_button: {
        marginRight: 10, 
        alignSelf:'flex-end'
    }
   
    
    
})