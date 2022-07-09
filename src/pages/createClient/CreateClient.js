import { useContext, useState } from "react"
import Context from "../../global/Context"
import Eye from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { url } from "../../constants/url"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from "react-native"


const CreateClient = (props)=>{
    const { states, setters } = useContext(Context)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [servico, setServico] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [mesas, setMesas] = useState('')    




    const signUp = ()=>{
        const body={
            nome,
            email,
            senha,
            servico,
            mesas,
            responsavel
        }
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
                        placeholderTextColor='rgba(255, 255, 255, 0.4)'/>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="nome@email.com"
                        placeholderTextColor='rgba(255, 255, 255, 0.4)'/>

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
                    
                    <TextInput style={styles.input}
                        onChangeText={setConfSenha}
                        value={confSenha}
                        secureTextEntry={states.visivel2}
                        placeholder='Confirme sua senha'
                        placeholderTextColor='rgba(255, 255, 255, 0.4)'/>
                    <TouchableOpacity style={styles.eye2}
                        onPress={setters.visibilidade2}>
                        <Eye name={states.icone2} size={25} color='whitesmoke'/>
                    </TouchableOpacity>

                    <TextInput style={styles.input}
                        onChangeText={setServico}
                        value={servico}
                        placeholder="Serviço oferecido"
                        placeholderTextColor='rgba(255, 255, 255, 0.4)'/>

                    <TextInput style={styles.input}
                        onChangeText={setMesas}
                        value={mesas}
                        placeholder='Contingência'
                        placeholderTextColor='rgba(255, 255, 255, 0.4)'
                        keyboardType="numeric"/>

                    <TextInput style={styles.input}
                        onChangeText={setResponsavel}
                        value={responsavel}
                        placeholder="Nome do responsável"
                        placeholderTextColor='rgba(255, 255, 255, 0.4)'/>
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={signUp}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>Registrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>Limpar</Text>
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
        position: 'absolute',
        right: '8%',
        top: '29.5%'
    },
    eye2: {
        position: 'absolute',
        right: '8%',
        top: '42%'
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