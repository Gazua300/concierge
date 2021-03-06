import { useContext, useState } from "react"
import Context from "../../global/Context"
import Eye from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { url } from "../../constants/url"
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from "react-native"


const CreateClient = (props)=>{
    const { states, setters } = useContext(Context)
    const placeholderBackground = 'rgba(255, 255, 255, 0.4)'
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [email, setEmail] = useState('')
    const [contato, setContato] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [servico, setServico] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [mesas, setMesas] = useState('')
    const [visivel, setVisivel] = useState(true)
    const [icone, setIcone] = useState('eye-with-line')
    const [visivel2, setVisivel2] = useState(true)
    const [icone2, setIcone2] = useState('eye-with-line')
    
    
    
    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(false)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(true)
            setIcone('eye-with-line')
        }
    }

    const visibilidade2 = ()=>{
        if(icone2 === 'eye-with-line'){
            setVisivel2(false)
            setIcone2('eye')
        }else if(icone2 === 'eye'){
            setVisivel2(true)
            setIcone2('eye-with-line')
        }
    }



    const signUp = ()=>{
        const body={
            nome,
            endereco,
            email,
            senha,
            servico,
            mesas,
            responsavel,
            contato
        }
        console.log(body)
        if(senha !== confSenha){
            alert('As senhas não correspondem')
        }else{
            axios.post(`${url}/client`, body).then(res=>{
                setters.getToken(res.data)
                props.navigation.navigate('Home')
            }).catch(e=>{
                alert(e.response.data)
            })
        }
    }


    const limpar = ()=>{
        setConfSenha('')
        setEmail('')
        setNome('')
        setResponsavel('')
        setSenha('')
        setServico('')
        setMesas('')
        setContato('')
        setEndereco('')
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
                        placeholderTextColor={placeholderBackground}/>
                    <TextInput style={styles.input}
                        onChangeText={setEndereco}
                        value={endereco}
                        placeholder="Rua / Av"
                        placeholderTextColor={placeholderBackground}/>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="nome@email.com"
                        placeholderTextColor={placeholderBackground}/>
                    <TextInput style={styles.input}
                        onChangeText={setContato}
                        value={contato}
                        keyboardType='numeric'
                        placeholder="Telefone"
                        placeholderTextColor={placeholderBackground}/>

                    <TextInput style={styles.input}
                        onChangeText={setSenha}
                        value={senha}
                        secureTextEntry={visivel}
                        placeholder='Sua senha'
                        placeholderTextColor={placeholderBackground}/>
                    <TouchableOpacity style={styles.eye}
                        onPress={visibilidade}>
                        <Eye name={icone} size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                    
                    <TextInput style={styles.input}
                        onChangeText={setConfSenha}
                        value={confSenha}
                        secureTextEntry={visivel2}
                        placeholder='Confirme sua senha'
                        placeholderTextColor={placeholderBackground}/>
                    <TouchableOpacity style={styles.eye2}
                        onPress={visibilidade2}>
                        <Eye name={icone2} size={25} color='whitesmoke'/>
                    </TouchableOpacity>

                    <TextInput style={styles.input}
                        onChangeText={setServico}
                        value={servico}
                        placeholder="Serviço oferecido"
                        placeholderTextColor={placeholderBackground}/>

                    <TextInput style={styles.input}
                        onChangeText={setMesas}
                        value={mesas}
                        placeholder='Contingência'
                        placeholderTextColor={placeholderBackground}
                        keyboardType="numeric"/>

                    <TextInput style={styles.input}
                        onChangeText={setResponsavel}
                        value={responsavel}
                        placeholder="Nome do responsável"
                        placeholderTextColor={placeholderBackground}/>
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Limpar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={signUp}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Registrar
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ae8625',
        paddingLeft: 15,
        fontSize: 20,
        margin: 13,
        width: 350,
        height: 50,
        color: 'whitesmoke'
    },
    eye: {
        position: 'relative',
        left: '85%',
        bottom: '6%'
    },
    eye2: {
        position: 'relative',
        left: '85%',
        bottom: '6%'
    },
    btnContainer: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    }
})


export default CreateClient