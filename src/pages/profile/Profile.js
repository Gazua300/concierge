import { useContext, useEffect } from 'react'
import Context from '../../global/Context'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'




const Profile = (props)=>{
     const { states, requests} = useContext(Context)
     const place = states.place

    useEffect(()=>{
        requests.getPlace()
    }, [])

    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.title}>{place.nome}</Text>
                <Text style={styles.txtStyle}>
                    Email: {place.email}{'\n'}
                    Serviço: {place.servico}{'\n'}
                    Responsável: {place.responsavel}
                </Text>
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
    title: {
        fontSize: 30,
        margin: 20,
        color: 'whitesmoke',
    },
    txtStyle: {
        marginLeft: 20,
        fontSize: 20,
        lineHeight: 30,
        color: 'whitesmoke',
    }
})


export default Profile