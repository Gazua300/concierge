import { useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Eye from 'react-native-vector-icons/Entypo'
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
    const { states, setters } = useContext(Context)
    const placeholderBackground = 'rgba(255, 255, 255, 0.4)'
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [visivel, setVisivel] = useState(true)
    const [icone, setIcone] = useState('eye-with-line')


    
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


    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(false)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(true)
            setIcone('eye-with-line')
        }
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
                <TextInput style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholderTextColor={placeholderBackground}
                    placeholder="nome@email.com"/>

                <TextInput style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    placeholderTextColor={placeholderBackground}
                    secureTextEntry={visivel}
                    placeholder='Sua senha'/>
                <TouchableOpacity style={styles.eye}
                    onPress={visibilidade}>
                    <Eye name={icone} size={25} color='whitesmoke'/>                    
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}}
                    onPress={()=> props.navigation.navigate('RedefinirSenha')}>
                    <Text style={{color:'blue', fontSize:18}}>
                        Esqueceu sua senha
                    </Text>
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={limpar}>
                        <Text style={{color:'whitesmoke', fontSize:20}}>
                            Limpar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={login}>
                        <Text style={{color:'whitesmoke', fontSize:20}}>
                            Entrar
                        </Text>
                    </TouchableOpacity>                    
                </View>
                
                <Text style={styles.txtStyle}>Ainda não tem cadastro? Clique
                    <Text style={{color:'blue', fontSize:20}}
                        onPress={()=> props.navigation.navigate('CreateClient')}> aqui</Text>
                </Text>
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
    eye: {
        position: 'absolute',
        left: '82%',
        top: '41%'
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