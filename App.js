import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GlobalState } from "./src/global/Context"
import Perfil from 'react-native-vector-icons/Ionicons'
import Logout from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity, View } from 'react-native'
import Login from "./src/pages/login/Login"
import CreateClient from "./src/pages/createClient/CreateClient"
import Home from "./src/pages/home/Home"
import Demandas from "./src/pages/demandas/Demandas"
import Profile from './src/pages/profile/Profile'




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
            component={Login}
            options={{
              title: 'Concierge'
            }}/>

          <Stack.Screen
            name="CreateClient"
            component={CreateClient}
            options={{
              title: 'Registrar usuário'
            }}/>

          <Stack.Screen
            name="Home"
            component={Home}
            options={({navigation})=>({
              headerLeft: ()=>(
                <View/>
              ),
              headerRight: ()=> (
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                  <Perfil name='person' size={30}/>
                </TouchableOpacity>
              )
            })}
            />

        <Stack.Screen
            name="Demandas"
            component={Demandas}
            options={({navigation})=>({
              title: 'Lista de pedidos',
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                  <Perfil name="person" size={30}/>
                </TouchableOpacity>
              )
            })}/>

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={({navigation})=> ({
            title: 'Seu perfil',
            headerRight: ()=>(
              <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Logout name='logout' size={30}/>
              </TouchableOpacity>
            )
          })}/>

        </Stack.Navigator>
      </GlobalState>
    </NavigationContainer>
  )
}
