import { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import Context from '../../global/Context'



const Home = (props)=>{
    const { requests, states } = useContext(Context)


    return(
        <View>
           <Text>Puta que pariu e agora?</Text>
        </View>
    )
}
export default Home