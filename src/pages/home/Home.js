import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native'




const Home = (props)=>{
    const { requests, states, setters } = useContext(Context)
    const clientes = states.clientes


    useEffect(()=>{
        requests.clientsByPlace()
    }, [])



    const remover = (id)=>{
        Alert.alert(
            'Alerta',
            `Tem certeza que deseja excluir o pedido?\nVerfique se o mesmo já foi atendido.`,
            [
                {
                    text:'Cancelar',                                        
                },
                {
                    text:'Ok',
                    onPress: ()=> requests.deletePedido(id)
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
                    {clientes.length > 0 ? clientes.map(cliente=>{
                        return(                                   
                            <View key={cliente.id}
                                style={styles.card}>
                                <View>
                                    <Text style={styles.txtStyle}>
                                        {cliente.clienteNome}
                                    </Text>
                                    <Text style={{fontSize:18, color:'whitesmoke'}}>
                                        {cliente.pedido}{'\n'}
                                        Mesa {cliente.mesa}
                                    </Text>
                                    <Text style={{fontSize:18, marginTop:10, color:'whitesmoke'}}>Feito as {cliente.ordem}</Text>
                                </View>                                 
                                <TouchableOpacity style={styles.button}
                                    onPress={()=> remover(cliente.id)}>
                                    <Text style={{color:'whitesmoke', fontSize:15}}>Remover</Text>
                                </TouchableOpacity>
                            </View>
                        )            
                    }) : <Text style={styles.txtTemp}>Você está sem clientes no momento</Text>}
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
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#ae8625',
        borderRadius:10,
        margin: 15,
        padding: 20,
    },
    txtStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'whitesmoke',
        marginBottom: 20
    },
    txtTemp: {
        marginTop: 100,
        marginHorizontal: 50,
        textAlign: 'center',
        fontSize: 20,
        color: 'whitesmoke'
    },
    button: {
        backgroundColor: '#ae8625',
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    }
})


export default Home