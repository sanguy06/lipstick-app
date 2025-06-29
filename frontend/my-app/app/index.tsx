import { Text, View, StyleSheet, Button} from "react-native";
import {useRouter} from 'expo-router';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([]); // reset ignored logs
LogBox.ignoreAllLogs(false); // show all warnings

// Acts As Welcome Screen
export default function Index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Text style={styles.text}>to</Text>
      <Text style={styles.text}>Lipify!</Text>
      <Button title = "Login" onPress={()=> router.navigate('/login')}></Button>
      <Button title="Signup" onPress={()=> router.navigate('/signup')}></Button>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white', 
    alignItems: 'center',
    paddingTop: 100
 
  }, 
  text: {
    color: 'pink',
    fontFamily:'CuteDino', 
    fontSize: 50
  }
})
