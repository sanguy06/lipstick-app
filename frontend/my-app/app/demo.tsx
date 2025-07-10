import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { AntDesign, Ionicons } from '@expo/vector-icons'
export default function Demo() {
    const router = useRouter(); 
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>For best results 
                    please upload image of lipstick 
                    with a solid white background like shown below</Text>

                <Image 
                    style={styles.image}
                    source={require('../assets/images/lipstick2.webp')}>
                </Image>           
                  <TouchableOpacity style={styles.button}>
                    <Ionicons 
                        name="arrow-forward-outline" 
                        size={50} 
                        onPress={()=> 
                            router.push('/productimage')}
                    >
                </Ionicons>
            </TouchableOpacity>               
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
        alignItems: 'center', 
        alignContent: 'center', 
        height: '100%', 
        position: 'absolute'
    },
    text: {
        paddingTop: 50,
        fontFamily:'CuteDino', 
        fontSize: 20, 
        paddingBottom: 50, 
        color: '#2E2E2E', 
        lineHeight: 30
        
    }, 
    image: {     
        width: '100%', 
        height: '50%', 
        borderRadius: 10
    },
    button: {
        paddingTop: 50,
        color: 'black',
        
       
    }
})