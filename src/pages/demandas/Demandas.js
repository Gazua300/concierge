import { useContext } from "react"
import Context from "../../global/Context"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'



const Demandas = (props)=>{
    const { states } = useContext(Context)
    const pedidos = states.pedidos
console.log(pedidos)

    return(
        <View>
            {pedidos.length > 0 ? pedidos.map(pedido=>{
                return(
                    <View key={pedido.id}
                        style={styles.card}>
                        <Text style={styles.txtStyle}>
                            {pedido.pedido}{'\n'}
                            {/* Mesa: {pedido.mesa}{'\n'} */}
                            Feito as {pedido.ordem}
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{color:'whitesmoke'}}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                )
            }) : <Text>Cliente ainda não fez nenhum pedido</Text>}
        </View>
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
        padding: 10,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 20,
        lineHeight: 40
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

export default Demandas