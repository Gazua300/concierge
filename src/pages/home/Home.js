import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/url'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'




const Home = (props)=>{
    const [atendido, setAtendido] = useState(false)
    const { requests, states, setters } = useContext(Context)
    const clientes = states.clientes


    useEffect(()=>{
        requests.clientsByPlace()
    }, [])


            
    
    return(
        <ScrollView>
           {clientes.length > 0 ? clientes.map(cliente=>{
            return(
                <View key={cliente.id}
                    style={styles.card}>
                    <View>
                        <Text style={styles.txtStyle}>
                            {cliente.clienteNome}
                        </Text>
                        <Text style={{fontSize:18}}>
                            {cliente.pedido}
                        </Text>
                        <Text style={{fontSize:18, marginTop:5}}>Feito as {cliente.ordem}</Text>
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
    )
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 1,
        margin: 15,
        padding: 15,
        borderRadius: 10,
    },
    txtStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 20                
    },
    txtTemp: {
        marginTop: 100,
        textAlign: 'center',
        fontSize: 20
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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


export default Home