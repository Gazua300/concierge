import { useContext, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/url'
import { View,
    Text,
    ImageBackground,
    StyleSheet,
    Alert,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native'



const EditProfile = (props)=>{
    const { states, requests } = useContext(Context)
    const place = states.place
    const [nome, setNome] = useState(place.nome)
    const [email, setEmail] = useState(place.email)
    const [servico, setServico] = useState(place.servico)
    const [responsavel, setResponsavel] = useState(place.responsavel)
    const [mesas, setMesas] = useState(String(place.mesas))
    const [endereco, setEndereco] = useState(place.endereco)
    const [contato, setContato] = useState(String(place.contato))



    const atualizar = async()=>{
        const id = await AsyncStorage.getItem('token')
        const body = {
            nome,
            email,
            servico,
            responsavel,
            mesas,
            endereco,
            contato
        }
        axios.put(`${url}/client/${id}`, body).then(res=>{
            requests.getPlace()
            props.navigation.navigate('Profile')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const confirmar = ()=>{
        Alert.alert(
            'Alerta',
            'Tem certeza que deseja alterar seus dados?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> atualizar()
                }
            ]
        )
    }


    const limpar = ()=>{
        setEndereco('')
        setEmail('')
        setNome('')
        setResponsavel('')
        setContato('')
        setServico('')
        setMesas('')
    }


    const logout = async()=>{
        try{
            await AsyncStorage.clear()
        }catch(e){
            alert(e)
        }
    }

    const delAccount = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.delete(`${url}/client/${id}`).then(res=>{
            alert(res.data)
            logout()
            props.navigation.navigate('Login')
        })
    }

    const confirmDel = ()=>{
        Alert.alert(
            'Atenção!',
            'Esta operação também irá apagar todos os registros relacionados à sua conta. Deseja continuar?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> delAccount()
                }
            ]
        )
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <TextInput style={styles.input}
                        onChangeText={setNome}
                        value={nome}
                        placeholder="Nome"
                        placeholderTextColor='whitesmoke'/>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="nome@email.com"
                        placeholderTextColor='whitesmoke'/>
                    <TextInput style={styles.input}
                        onChangeText={setEndereco}
                        value={endereco}
                        placeholder="Rua/Av Nº, Bairro-Cidade"
                        placeholderTextColor='whitesmoke'/>
                    <TextInput style={styles.input}
                        onChangeText={setContato}
                        value={contato}
                        placeholder="DDD e Telefone"
                        placeholderTextColor='whitesmoke'/>
                    <TextInput style={styles.input}
                        onChangeText={setServico}
                        value={servico}
                        placeholder="Serviço oferecido"
                        placeholderTextColor='whitesmoke'/>
                    <TextInput style={styles.input}
                        onChangeText={setMesas}
                        value={mesas}
                        placeholder='Contingência'
                        placeholderTextColor='whitesmoke'
                        keyboardType="numeric"/>
                    <TextInput style={styles.input}
                        onChangeText={setResponsavel}
                        value={responsavel}
                        placeholder="Nome do responsável"
                        placeholderTextColor='whitesmoke'/>                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={confirmar}>
                            <Text style={{color:'whitesmoke', fontSize:18}}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:18}}>Limpar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnDel}
                        onPress={confirmDel}>
                        <Text style={{color:'whitesmoke', fontSize:18}}>
                            Deletar conta
                        </Text>
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
        paddingTop: 50
    },
    input: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ae8625',
        paddingLeft: 15,
        fontSize: 20,
        margin: 13,
        width: 350,
        height: 50,
        color: 'whitesmoke'
    },
    btnContainer: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        backgroundColor: '#ae8625',
        borderWidth: 1,
        borderColor: 'goldenrod',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 15
    },
    btnDel: {
        backgroundColor: '#ae8625',
        borderWidth: 1,
        borderColor: 'goldenrod',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 15
    }
})

export default EditProfile