import { View } from "react-native"
import Header from './Header'
import Footer from './Footer'
import style from "../styles/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAX_NBR_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import { Button, DataTable, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { verticalScale } from "../constants/Metrics";

export default ScoreBoard = ({navigation}) => {

    const buttonTxtColor = '#9B6445'

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
        <View style={style.scoreboard}>   
            <Header/>
            <View >
            <Text style={[style.titletexts, {marginVertical: verticalScale(15)}]}>SCOREBOARD</Text>
            <DataTable>
                    <DataTable.Header>
                        <DataTable.Title >
                         <Text style={style.scoreboardheadertexts}>Ranking</Text>   
                        </DataTable.Title>
                        <DataTable.Title >
                         <Text style={style.scoreboardheadertexts}>Player</Text>   
                        </DataTable.Title>
                        <DataTable.Title >
                         <Text style={style.scoreboardheadertexts}>Date</Text>   
                        </DataTable.Title>
                        <DataTable.Title >
                         <Text style={style.scoreboardheadertexts}>Clock</Text>   
                        </DataTable.Title>
                        <DataTable.Title >
                         <Text style={style.scoreboardheadertexts}>Scores</Text>   
                        </DataTable.Title>
                    </DataTable.Header>
                </DataTable>
                <View>
                {scores.length === 0 ?
                    <Text style={[style.textcolor, {marginVertical: verticalScale(60)}]}>Scoreboard is empty</Text>                    
                    :
                    scores.map((player, index) => (
                        index < MAX_NBR_SCOREBOARD_ROWS && 
                        <DataTable.Row key={player.key}>
                        <DataTable.Cell><Text style={style.textcolor}>{index + 1}.</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={style.textcolor}>{player.name}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={style.textcolor}>{player.date}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={style.textcolor}>{player.time}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={style.textcolor}>{player.points}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))
                }
                </View>            
            </View>
            {scores.length > 0 &&
            <View style={[style.innerview, {marginVertical: verticalScale(10)}]}>
                <Button 
                textColor= {buttonTxtColor}
                style={style.buttons}
                mode="elevated"
                onPress={() => clearScoreBoard()}>CLEAR SCOREBOARD</Button>                
            </View>
            }
            <Footer/> 
            </View>         
    )
}