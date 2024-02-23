import { useState } from "react"
import { Keyboard, Pressable, Text, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header'
import Footer from './Footer'
import style from "../styles/style";
import { Rules } from "../constants/Rules";
import { TextInput } from "react-native-paper";

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
        <View style={style.container}>
            <Header/>       
            <View style={style.innerview}>
                {!hasPlayerName ? 
                    <>
                        <MaterialCommunityIcons name='book-edit-outline' size={90} color='#F0681A'/>
                        <Text style={style.textcolor}>For Scoreboard enter your name:</Text>
                        <TextInput onChangeText={setPlayerName} autoFocus={true}/>                        
                        <Pressable onPress={()=> handlePlayerName(playerName)}>
                            <Text style={style.textcolor}>OK</Text>
                        </Pressable>
                    </>
                    :
                    <>
                        <MaterialCommunityIcons name='book-open-page-variant-outline' size={90} color='#F0681A'/>
                        <Text style={style.textcolor}>Rules of the game</Text>
                        <Rules/>
                        <Text style={style.textcolor}>Good luck, {playerName}</Text>
                        <Pressable onPress={()=> navigation.navigate('GameBoard', {player: playerName})}>
                            <Text style={style.textcolor}>PLAY</Text>
                        </Pressable>
                    </>
                }
                </View>
            <Footer/>
            </View>        
    )
}