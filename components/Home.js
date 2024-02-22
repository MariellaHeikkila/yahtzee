import { useState } from "react"
import { Keyboard, Pressable, Text, TextInput, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header'
import Footer from './Footer'
import style from "../styles/style";
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS
} from '../constants/Game'
import { Rules } from "../constants/Rules";

export default Home = ({navigation}) => {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0 ) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    return(
        <>
            <Header/>
            <View>
                <MaterialCommunityIcons name='information' size={90} color='green'/>
                {!hasPlayerName ? 
                    <>
                        <Text>For Scoreboard enter your name:</Text>
                        <TextInput onChangeText={setPlayerName} autoFocus={true}/>
                        <Pressable onPress={()=> handlePlayerName(playerName)}>
                            <Text>OK</Text>
                        </Pressable>
                    </>
                    :
                    <>
                        <Text>Rules of the game</Text>
                        <Rules/>
                        <Text>Good luck, {playerName}</Text>
                        <Pressable onPress={()=> navigation.navigate('GameBoard', {player: playerName})}>
                            <Text>PLAY</Text>
                        </Pressable>
                    </>
                }
            </View>
            <Footer/>
        </>
    )
}