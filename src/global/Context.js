import { createContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { url } from "../constants/url"


const Context = createContext()


export const GlobalState = (props)=>{
    const [token, setToken] = useState('')
    const [clientes, setClientes] = useState([])
    const [place, setPlace] = useState({})
    const [itens, setItens] = useState([])

    

    const getToken = async(tk)=>{
        try{
            await AsyncStorage.setItem('token', tk)
            const value = await AsyncStorage.getItem('token')
            setToken(value)
        }catch(e){
            alert(e)
        }
    }
    
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


    const produtos = ()=>{
        axios.get(`${url}/cardapio/place/${token}`).then(res=>{
            setItens(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const deletePedido = (id)=>{
        axios.delete(`${url}/request/${id}`).then(res=>{
            clientsByPlace()
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const states = { clientes, place, itens, token }
    const setters = { setToken, getToken }
    const requests = { clientsByPlace, getPlace, produtos, deletePedido }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context