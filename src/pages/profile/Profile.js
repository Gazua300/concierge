import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native'




const Profile = (props)=>{
    const { states, requests } = useContext(Context)
    const place = states.place


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
                        Email: {place.email}{'\n'}
                        Serviço: {place.servico}{'\n'}
                        Responsável: {place.responsavel}{'\n'}
                        Contingente: {place.mesas} mesas
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        // paddingTop: 50 
    },
    perfilContainer: {
        
    },
    title: {
        fontSize: 30,
        margin: 20,
        color: 'whitesmoke',
    },
    txtStyle: {
        marginLeft: 20,
        marginBottom: 30,
        fontSize: 20,
        lineHeight: 30,
        color: 'whitesmoke',
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