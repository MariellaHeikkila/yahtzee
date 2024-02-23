import { useState } from "react"
import { Keyboard, Pressable, Text, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header'
import Footer from './Footer'
import style from "../styles/style";
import { Rules } from "../constants/Rules";
import { Button, TextInput } from "react-native-paper";


export default Home = ({navigation}) => {

    const buttonTxtColor = '#9B6445'

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0 ) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    const changePlayer = () => {
        navigation.navigate('Home')
        setPlayerName('')
        setHasPlayerName(false)
        navigation.navigate('Home')
    }

    return(        
        <View style={style.container}>
            <Header/>       
            <View style={style.innerview}>
                {!hasPlayerName ? 
                    <>
                        <MaterialCommunityIcons name='book-edit-outline' size={90} color='#F0681A'/>
                        <Text style={style.textcolor}>For Scoreboard enter your name:</Text>
                        <TextInput 
                        onChangeText={setPlayerName} 
                        autoFocus={true}
                        mode="outlined"
                        style={style.inputText}
                        />
                        <Button 
                        textColor= {buttonTxtColor}
                        style={style.buttons}
                        mode="elevated"
                        onPress={()=> handlePlayerName(playerName)}>OK</Button>
                    </>
                    :
                    <>
                        <MaterialCommunityIcons name='book-open-page-variant-outline' size={90} color='#F0681A'/>
                        <Text style={style.textcolor}>Rules of the game</Text>
                        <Rules/>
                        <Text style={style.textcolor}>Good luck, {playerName}</Text>
                        <Button 
                        textColor= {buttonTxtColor}
                        style={style.buttons}
                        mode="elevated"
                        onPress={()=> navigation.navigate('GameBoard', {player: playerName})}>PLAY</Button>
                        <Button 
                        textColor= {buttonTxtColor}
                        style={style.buttons}
                        mode="elevated"
                        onPress={()=> changePlayer()}>CHANGE PLAYER</Button>  
                    </>
                }
                </View>
            <Footer/>
            </View>        
    )
}