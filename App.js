import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GlobalState } from "./src/global/Context"
import Perfil from 'react-native-vector-icons/Ionicons'
import Logout from 'react-native-vector-icons/AntDesign'
import List from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity, StatusBar } from 'react-native'
import Login from "./src/pages/login/Login"
import CreateClient from "./src/pages/createClient/CreateClient"
import Home from "./src/pages/home/Home"
import Produtos from "./src/pages/produtos/Produtos"
import Profile from './src/pages/profile/Profile'




const Stack = createNativeStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='rgba(0, 0, 0, 0.9)'/>
      <GlobalState>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: '#ae8625',                                  
            },
            headerTintColor: 'whitesmoke',
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
              title: 'Clientes e pedidos',
              headerLeft: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Produtos')}>
                  <List name="list-alt" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              ),
              headerRight: ()=> (
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                  <Perfil name='person' size={30} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}
            />

        <Stack.Screen
            name="Produtos"
            component={Produtos}
            options={({navigation})=>({
              title: 'Produtos',
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                  <Perfil name="person" size={30} color='whitesmoke'/>
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
                <Logout name='logout' size={30} color='whitesmoke'/>
              </TouchableOpacity>
            )
          })}/>

        </Stack.Navigator>
      </GlobalState>
    </NavigationContainer>
  )
}
