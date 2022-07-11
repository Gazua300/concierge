import { useContext, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Eye from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { url } from '../../constants/url'
import { View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ScrollView
} from 'react-native'



const Auth = (props)=>{
    const { states, setters }  = useContext(Context)
    const [senha, setSenha] = useState('')


    const auth = async()=>{
        const id = await AsyncStorage.getItem('token')
        const body = {
            senha
        }
        axios.post(`${url}/clientauth/${id}`, body).then(res=>{
            props.navigation.navigate('EditProfile')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.txtStyle}>Autenticação necessária</Text>
                <TextInput style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry={states.visivel}
                    placeholder='Sua senha'
                    placeholderTextColor='rgba(255, 255, 255, 0.4)'/>
                <TouchableOpacity style={styles.eye}
                    onPress={setters.visibilidade}>
                    <Eye name={states.icone} size={25} color='whitesmoke'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={auth}>
                    <Text style={{color:'whitesmoke', fontSize:18}}>Verificar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
    }, 
    txtStyle: {
        color: 'whitesmoke',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50
    },
    input: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ae8625',
        paddingLeft: 15,
        fontSize: 20,
        width: 350,
        height: 50,
        color: 'whitesmoke',
        marginTop: 20
    },
    eye: {
        position: 'absolute',
        right: '4%',
        top: '53.5%'
    },
    button: {
        backgroundColor: '#ae8625',
        marginTop: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
})


export default Auth