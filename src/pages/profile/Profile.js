import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native'




const Profile = (props)=>{
    const { states, requests } = useContext(Context)
    const place = states.place
    const ddd = String(place.contato).substring(0,2)
    const prefixo = String(place.contato).substring(2,6)
    const sufixo = String(place.contato).substring(6,10)
    const telefone = `(${ddd}) ${prefixo}-${sufixo}`


    useEffect(()=>{
        requests.getPlace()
    }, [])


    const sair = async()=>{
        try{
            await AsyncStorage.clear()
            props.navigation.navigate('Login')
        }catch(e){
            alert(e)
        }
    }

    const confirmarLogout = ()=>{
        Alert.alert(
            'Alert',
            'Tem certeza que deseja sair da sua conta?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> sair()
                }
            ]
        )
    }

   

    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                
                <View style={styles.perfilContainer}>
                    <Text style={styles.title}>{place.nome}</Text>
                    <Text style={styles.txtStyle}>
                        {place.email}{'\n'}
                        {place.servico}{'\n'}
                        {place.mesas} mesas{'\n'}
                    </Text>
                    <Text style={styles.localContainer}>
                        {place.endereco}{'\n'}
                        {telefone}
                    </Text>
                </View>                
                
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={confirmarLogout}>
                        <Text style={{color:'whitesmoke', fontSize:18, textAlign:'center'}}>
                            Deslogar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={()=> props.navigation.navigate('Auth')}>
                        <Text style={{color:'whitesmoke', fontSize:18, textAlign:'center'}}>
                            Editar
                        </Text>
                    </TouchableOpacity>
                </View>
           
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    perfilContainer: {
        margin: 20
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    txtStyle: {
        fontSize: 20,
        lineHeight: 30,
        color: 'whitesmoke',
    },
    localContainer: {
        color: 'whitesmoke',
        fontSize: 20,
        lineHeight: 30
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        backgroundColor: '#ae8625',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
    }
})


export default Profile