import axios from "axios"
import { createContext, useState } from "react"
import { url } from "../constants/url"


const Context = createContext()


export const GlobalState = (props)=>{
    const [token, setToken] = useState('')



    const states = { token }
    const setters = { setToken }
    const requests = {  }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context