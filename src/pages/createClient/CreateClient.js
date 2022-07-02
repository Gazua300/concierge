import { useContext, useState } from "react"
import Context from "../../global/Context"
import axios from 'axios'
import { url } from "../../constants/url"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"


const CreateClient = (props)=>{
    const { setters } = useContext(Context)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [servico, setServico] = useState('')
    const [responsavel, setResponsavel] = useState('')



    const signUp = ()=>{
        const body={
            nome,
            email,
            senha,
            servico,
            responsavel
        }
        if(senha !== confSenha){
            alert('As senhas não correspondem')
        }else{
            axios.post(`${url}/client`, body).then(res=>{
                setters.setToken(res.data)
                props.navigation.navigate('Home')
            }).catch(e=>{
                alert(e.response.data)
            })
        }
    }



    return(
        <View style={styles.container}>
            <View style={{marginTop:80}}/>
                <TextInput style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                    placeholder="Nome"/>
                <TextInput style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="nome@email.com"/>

                <TextInput style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry={true}
                    placeholder='Sua senha'/>
                
                <TextInput style={styles.input}
                    onChangeText={setConfSenha}
                    value={confSenha}
                    secureTextEntry={true}
                    placeholder='Confirme sua senha'/>

                <TextInput style={styles.input}
                    onChangeText={setServico}
                    value={servico}
                    placeholder="Serviço oferecido"/>

                <TextInput style={styles.input}
                    onChangeText={setResponsavel}
                    value={responsavel}
                    placeholder="Nome do responsável"/>
                
                <TouchableOpacity style={styles.button}
                    onPress={signUp}>
                    <Text style={{color:'whitesmoke'}}>Registrar</Text>
                </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        margin: 13,
        width: 300,
        height: 40
    },
    txtStyle:{
        fontSize: 20
    },
    button: {
        backgroundColor: 'blue',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 15
    }
})


export default CreateClient