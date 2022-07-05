import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'




const Home = (props)=>{
    const [atendido, setAtendido] = useState(false)
    const { requests, states, setters } = useContext(Context)
    const clientes = states.clientes


    useEffect(()=>{
        requests.clientsByPlace()
    }, [])


            
    
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
                                        {cliente.pedido}
                                    </Text>
                                    <Text style={{fontSize:18, marginTop:5, color:'whitesmoke'}}>Feito as {cliente.ordem}</Text>
                                </View>
                                <View style={styles.btnContainer}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={{color:'whitesmoke'}}>Atender</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={{color:'whitesmoke'}}>Remover</Text>
                                    </TouchableOpacity>
                                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 50
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
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ae8625',
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    }
})


export default Home