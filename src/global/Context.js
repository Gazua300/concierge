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
    const [icone, setIcone] = useState('eye-with-line')
    const [icone2, setIcone2] = useState('eye-with-line')
    const [visivel, setVisivel] = useState(true)
    const [visivel2, setVisivel2] = useState(true)

    
    
    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(false)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(true)
            setIcone('eye-with-line')
        }
    }

    const visibilidade2 = ()=>{
        if(icone2 === 'eye-with-line'){
            setVisivel2(false)
            setIcone2('eye')
        }else if(icone2 === 'eye'){
            setVisivel2(true)
            setIcone2('eye-with-line')
        }
    }


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
            alert(e.response.data)
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



    const states = { clientes, itens, place, show, visivel, icone,
                    visivel2, icone2 }
    const setters = { getToken, setShow, visibilidade, visibilidade2 }
    const requests = { clientsByPlace, produtos, deletePedido, getPlace }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context