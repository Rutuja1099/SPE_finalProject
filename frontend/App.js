import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInput from "./screens/userInput";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import VehicleCountsScreen from './screens/VehicleCountsScreen'; 



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login" >
      
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UserInput" component={UserInput} options={{headerShown: false,}}/>
        <Stack.Screen name="VehicleCountsScreen" component={VehicleCountsScreen} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
