import { createContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { url } from "../constants/url"


const Context = createContext()


export const GlobalState = (props)=>{
    const [place, setPlace] = useState({})
    const [clientes, setClientes] = useState([])    
    const [itens, setItens] = useState([])
    const [show, setShow] = useState(false)
    


    const getToken = async(tk)=>{
        try{
            await AsyncStorage.setItem('token', tk)
        }catch(e){
            alert(e)
        }
    }
    
    const clientsByPlace = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.get(`${url}/place/${id}`).then(res=>{
            setClientes(res.data)
        }).catch(e=>{
            console.log(e.response.data)
        })
    }


    
    const produtos = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.get(`${url}/cardapio/place/${id}`).then(res=>{
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


    const getPlace = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.get(`${url}/client/${id}`).then(res=>{
            setPlace(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }



    const states = { clientes, itens, place, show }
    const setters = { getToken, setShow }
    const requests = { clientsByPlace, produtos, deletePedido, getPlace }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context