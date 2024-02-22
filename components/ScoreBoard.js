import { View } from "react-native"
import Header from './Header'
import Footer from './Footer'
import style from "../styles/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAX_NBR_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import { Button, DataTable, Text } from "react-native-paper";
import { useEffect, useState } from "react";


export default ScoreBoard = ({navigation}) => {

    const [scores, setScores] = useState([])

    useEffect(() =>{
        const moveToScoreboard = navigation.addListener('focus', () => {
            getScoreBoardData()
        })
        return moveToScoreboard
    }, [navigation])

    const getScoreBoardData = async() => {

        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue)
                setScores(tmpScores)
            }
        } catch (error) {
            console.log('Read error: ' + error);
        }
    }

    const clearScoreBoard = async() => {
        try {
            await AsyncStorage.clear()
            setScores([])
        } catch (error) {
            console.log('read error: ' + error);
        }
    }
    
    scores.sort((a,b) => b.points - a.points)

    return(
        <>        
            <Header/>
            <View>
            <Text>SCOREBOARD</Text>
                <View>
                {scores.length === 0 ?
                    <Text>Scoreboard is empty</Text>
                    :
                    scores.map((player, index) => (
                        index < MAX_NBR_SCOREBOARD_ROWS && 
                        <DataTable.Row key={player.key}>
                        <DataTable.Cell><Text>{index + 1}.</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.name}</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.date}</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.time}</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.points}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))
                }
                </View>            
            </View>
            <View>
                <Button 
                style={style.buttons}
                mode="elevated"
                onPress={() => clearScoreBoard()}>CLEAR SCOREBOARD</Button>                
            </View>
            <Footer/>        
        </>
    )
}