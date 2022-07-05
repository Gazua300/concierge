import { useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import axios from "axios"
import { url } from "../../constants/url"



const Produtos = (props)=>{
    const [nome, setNome] = useState('')
    const [ingrediente, setIngrediente] = useState('')
    const { states, requests } = useContext(Context)
    const itens = states.itens

  
    useEffect(()=>{
        requests.produtos()
    }, [])
    

    const inserirProduto = ()=>{
        const body = {
            nome,
            ingredientes: ingrediente
        }
        axios.post(`${url}/cardapio/${states.token}`, body).then(res=>{
            alert(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    

    const limpar = ()=>{
        setNome('')
        setIngrediente('')
    }
    
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>                
                    <Text style={styles.title}>Inserir Produto</Text>
                    <View style={styles.inputContainer}>
                
                    <TextInput style={styles.input}
                        onChangeText={setNome}
                        value={nome}
                        placeholder='Produto'
                        placeholderTextColor='whitesmoke'/>            
                    <TextInput style={styles.textarea}
                        onChangeText={setIngrediente}
                        value={ingrediente}
                        multiline={true}
                        placeholder='Ingredientes, variedades ou marcas'
                        placeholderTextColor='whitesmoke'/>
                    
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={inserirProduto}>
                            <Text style={{color:'whitesmoke'}}>Registrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke'}}>Limpar</Text>
                        </TouchableOpacity>
                    </View>

                    </View>

                    <Text style={{
                        fontSize: 25,
                        textAlign: 'center',
                        margin: 10,
                        color: 'whitesmoke'
                    }}>Lista</Text>
                    <View style={{borderWidth:1, marginHorizontal:5, borderColor:'#ae8625'}}/>
                    
                    {itens && itens.map(item=>{
                        return(
                            <View key={item.id}
                                style={styles.card}>
                                <Text style={styles.txtStyle}>{item.nome}</Text>
                                <Text style={{fontSize:15, color:'whitesmoke'}}>{item.ingredientes}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        margin: 20,
        color:'whitesmoke'
    },
    inputContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    input: {
        color: 'whitesmoke',
        borderWidth: 1,
        borderColor: '#ae8625',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        width: 350,
        height: 50,
        marginBottom: 10
    },
    textarea: {
        color: 'whitesmoke',
        borderWidth: 1,
        borderColor: '#ae8625',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        width: 350,
        height: 90,
        marginBottom: 20
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        margin: 15,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ae8625'
    },
    txtStyle: {
        fontSize: 20,
        marginBottom: 10,
        color: 'whitesmoke'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ae8625',
        borderWidth: 1,
        borderColor: 'goldenrod',
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginStart: 70,
        marginEnd: 70,
        alignItems: 'center'
    }
})

export default Produtos