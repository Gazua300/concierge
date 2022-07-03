import { createContext, useEffect, useState } from "react"
import axios from "axios"
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { url } from "../constants/url"


const Context = createContext()


export const GlobalState = (props)=>{
    const [token, setToken] = useState('')
    const [clientes, setClientes] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [place, setPlace] = useState({})
 console.log(clientes)   
        
    // const getToken = async(tk)=>{
    //     try{
    //         await AsyncStorage.setItem('token', tk)
    //         const value = await AsyncStorage.get('token')
    //         //setToken(value)
    //     }catch(e){
    //         alert(e)
    //     }
    // }
    
    
    const clientsByPlace = ()=>{
        axios.get(`${url}/place/${token}`).then(res=>{
            setClientes(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const getPlace = ()=>{
        axios.get(`${url}/client/${token}`).then(res=>{
            setPlace(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const states = { clientes, pedidos, place }
    const setters = { setToken, setPedidos }
    const requests = { clientsByPlace, getPlace }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context