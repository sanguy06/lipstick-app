import { Text, View, StyleSheet, Button, LogBox, TouchableOpacity} from "react-native";
import {useRouter} from 'expo-router';

  LogBox.ignoreLogs([
   /shadow.*/i,
  /pointerEvents/i,
]);
// Acts As Welcome Screen
export default function Index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      
      <View style={{paddingTop: 150}}> 
        <TouchableOpacity style = {styles.button} onPress={()=> router.navigate('/login')}>
          <Text style={{fontFamily: "CuteDino", fontSize: 30, color: '#2E2E2E'}}>Get Started</Text>
        </TouchableOpacity>
        
      </View>
      
    
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fab6c7', 
    alignItems: 'center',
    justifyContent:'center'
    
  }, 
  text: {
    color: '#2E2E2E',
    fontFamily:'CuteDino', 
    fontSize: 50
  }, 
  button: {
    backgroundColor: '#B76E79', 
    borderRadius: 10, 
    borderWidth: 2, 
    paddingVertical: 10,
    paddingHorizontal: 50, 
    borderColor: '#B76E79', 
    justifyContent: 'center'
  }
})
