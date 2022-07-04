import { useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import axios from "axios"
import { url } from "../../constants/url"



const Produtos = (props)=>{
    const [nome, setNome] = useState('')
    const [ingrediente, setIngrediente] = useState('')
    const { states, requests } = useContext(Context)
    const itens = states.itens

  console.log('kd o token:', states.token)  
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
            // requests.produto()
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    

    const limpar = ()=>{
        setNome('')
        setIngrediente('')
    }
    
    return(
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.title}>Inserir Produto</Text>
            
            <TextInput style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder='Produto'/>            
            <TextInput style={styles.textarea}
                onChangeText={setIngrediente}
                value={ingrediente}
                multiline={true}
                placeholder='Ingredientes, variedades ou marcas'/>
            
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

            <Text style={{
                fontSize: 25,
                textAlign: 'center',
                margin: 10
            }}>Lista</Text>
            <View style={{borderWidth:1, marginHorizontal:5}}/>
            
            {itens && itens.map(item=>{
                return(
                    <View key={item.id}
                        style={styles.card}>
                        <Text style={styles.txtStyle}>{item.nome}</Text>
                        <Text style={{fontSize:15}}>{item.ingredientes}</Text>
                    </View>
                )
            })}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        margin: 30
    },
    input: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        marginLeft: 20,
        width: 300,
        height: 40
    },
    textarea: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        margin: 20,
        width: 300,
        height: 80
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        margin: 15,
        padding: 10,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 20,
        marginBottom: 10
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    button: {
        backgroundColor: 'blue',
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    }
})

export default Produtos