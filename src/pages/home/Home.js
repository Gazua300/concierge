import { useContext, useEffect } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/url'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'



const Home = (props)=>{
    const { requests, states, setters } = useContext(Context)
    const clientes = states.clientes


    useEffect(()=>{
        requests.clientsByPlace()
    }, [])



    const demandas = (id)=>{
        axios.get(`${url}/requests/${id}`).then(res=>{
            setters.setPedidos(res.data)
            props.navigation.navigate('Demandas')
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    
    
    return(
        <ScrollView>
           {clientes.length > 0 ? clientes.map(cliente=>{
            return(
                <View key={cliente.id}
                    style={styles.card}>
                    <Text style={styles.txtStyle}>
                        {cliente.clienteNome}{'\n'}
                        Mesa: {cliente.mesa}
                    </Text>
                    <TouchableOpacity style={styles.button}
                        onPress={()=> demandas(cliente.id)}>
                        <Text style={{color:'whitesmoke'}}>Pedidos</Text>
                    </TouchableOpacity>
                </View>
            )            
           }) : <Text style={styles.txtTemp}>Você está sem clientes no momento</Text>}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        margin: 15,
        padding: 15,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 20
    },
    txtTemp: {
        marginTop: 100,
        textAlign: 'center',
        fontSize: 20
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