import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GlobalState } from "./src/global/Context"
import Login from "./src/pages/login/Login"
import CreateClient from "./src/pages/createClient/CreateClient"
import Home from "./src/pages/home/Home"


const Stack = createNativeStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <GlobalState>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center'
          }}>

          <Stack.Screen
            name="Login"
            component={Login}/>

          <Stack.Screen
            name="CreateClient"
            component={CreateClient}
            options={{
              title: 'Registrar usuário'
            }}/>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Lista de pedidos'
            }}/>

        </Stack.Navigator>
      </GlobalState>
    </NavigationContainer>
  )
}
