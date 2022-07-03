import { useContext, useEffect } from 'react'
import Context from '../../global/Context'
import { View, Text, StyleSheet } from 'react-native'




const Profile = (props)=>{
     const { states, requests} = useContext(Context)
     const place = states.place

    useEffect(()=>{
        requests.getPlace()
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{place.nome}</Text>
            <Text style={styles.txtStyle}>
                Email: {place.email}{'\n'}
                Serviço: {place.servico}{'\n'}
                Responsável: {place.responsavel}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: '20%' 
    },
    title: {
        fontSize: 30,
        margin: 20
    },
    txtStyle: {
        marginLeft: 20,
        fontSize: 20,
        lineHeight: 30
    }
})


export default Profile