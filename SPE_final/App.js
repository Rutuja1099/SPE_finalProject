import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInput from "./screens/UserInput";


NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    
    <NavigationContainer>

     
      <Stack.Navigator initialRouteName="UserInput" >
      
        <Stack.Screen name="UserInput" component={UserInput} options={{headerShown: false,}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
