import { useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { url } from '../../constants/url'
import Context from "../../global/Context"
import axios from 'axios'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView
} from "react-native"



const Login = (props)=>{
    const { setters } = useContext(Context)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    
    useEffect(()=>{
        
        const persistir = async()=>{
            const token = await AsyncStorage.getItem('token')
            if(token !== null){
                props.navigation.navigate('Home')
            }
        }
        persistir()
                
    }, [])


    const login = ()=>{
        const body = {
            email,
            senha
        }
        axios.post(`${url}/client/login`, body).then(res=>{
            setters.getToken(res.data)
            props.navigation.navigate('Home')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const limpar = ()=>{
        setEmail('')
        setSenha('')
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholderTextColor='whitesmoke'
                        placeholder="nome@email.com"/>

                    <TextInput style={styles.input}
                        onChangeText={setSenha}
                        value={senha}
                        placeholderTextColor='whitesmoke'
                        secureTextEntry={true}
                        placeholder='Sua senha'/>
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={login}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Limpar
                            </Text>
                        </TouchableOpacity>                    
                    </View>
                    
                    <Text style={styles.txtStyle}>Ainda não tem cadastro? Clique
                        <Text style={{color:'blue', fontSize:20}}
                            onPress={()=> props.navigation.navigate('CreateClient')}> aqui</Text>
                    </Text>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 50
    },
    input: {
        borderWidth: 1,
        borderColor:'goldenrod',
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        margin: 20,
        width: 350,
        height: 50,
        color: 'whitesmoke'
    },
    txtStyle:{
        fontSize: 20,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#ae8625',
        width: 150,
        height: 40,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'goldenrod'
    }
})


export default Login