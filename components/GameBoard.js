import { Pressable, Text, View } from "react-native"
import Header from './Header'
import Footer from './Footer'
import style from "../styles/style";
import { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-native-flex-grid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS,
    SCOREBOARD_KEY
} from '../constants/Game'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

let board = []

export default GameBoard = ({navigation, route}) => {

    const buttonTxtColor = '#9B6445'

    const [playerName, setPlayerName] = useState('') 

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices')
    const [bonusPointStatus, setBonusPointStatus] = useState(`You are ${BONUS_POINTS_LIMIT} points away from bonus`)
    const [gameEndStatus, setGameEndStatus] = useState(false)
    const [gameStartStatus, setGameStartStatus] = useState(false)
    // are dices locked 
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))
    //dices eye count
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0))
    //is count selected for eyecount
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false))
    //gathered points
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))
    const [totalPoints, setTotalPoints] = useState(0);
    // scoreboard points
    const [scores, setScores] = useState([])

    useEffect(() => {
        if(playerName === '' && route.params?.player) {
          setPlayerName(route.params.player)
        }
      }, []);  

      //scoreboard
    useEffect(() =>{
        const moveToScoreboard = navigation.addListener('focus', () => {
            getScoreBoardData()
        })
        return moveToScoreboard
    }, [navigation])

    useEffect(()=>{
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        selectedDices.fill(false)
        setStatus('Throw dices')
        let totalPointsCounter = dicePointsTotal.reduce((sum, point)=>sum + point, 0)
        let pointsMissing= BONUS_POINTS_LIMIT - totalPointsCounter
        if (pointsMissing > 0) {
            setTotalPoints(totalPointsCounter)
            setBonusPointStatus(`You are ${pointsMissing} points away from bonus`);
        }
        else{
            const newTotalPoints = totalPointsCounter + BONUS_POINTS;
            setTotalPoints(newTotalPoints)
            setBonusPointStatus(`Congrats! Bonus points (50) added`);
        }
        const allPointsSelected = selectedDicePoints.every((pointSelected) => pointSelected);
                    if (allPointsSelected) {
                        setGameEndStatus(true)
                    }
    },[selectedDicePoints])    

    useEffect(() => {
        if (gameEndStatus) {
            savePlayerPoints()
            setStatus("Game over. All points selected.")
        }
    },[gameEndStatus])

    const dicesRow = []
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={'dice' + dice}>
                <Pressable 
                key={'dice' + dice}
                onPress={() => selectDice(dice)}
                >
                    <MaterialCommunityIcons
                    name={board[dice]}
                    key={'dice' + dice}
                    size={50}
                    color={getDiceColor(dice)}
                    />
                </Pressable>
            </Col>
        )
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={'pointsRow' + spot}>
                <Text style={style.pointsrowtext} key={'pointsRow' + spot}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }

    const pointsToSelectRow = []
    for (let diceButton =0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={'buttonsRow' + diceButton}>
                <Pressable 
                key={'buttonsRow' + diceButton}
                onPress={() => selectDicePoints(diceButton)}
                >
                    <MaterialCommunityIcons
                    name={'numeric-' + (diceButton + 1) + '-circle'}
                    key={'buttonsRow' + diceButton}
                    size={35}
                    color={getDicePointsColor(diceButton)}
                    />
                </Pressable>
            </Col>
        )
    }

    const selectDicePoints = (i) => {
        if ( nbrOfThrowsLeft === 0) {
        let selectedPoints = [...selectedDicePoints]
        let points = [...dicePointsTotal]
        if(!selectedPoints[i]) {
            selectedPoints[i] = true
            let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
            points[i] = nbrOfDices * (i + 1)
        } else {
            setStatus('You already selected points for ' + (i + 1))
            return points[i]
        }
        setDicePointsTotal(points)
        setSelectedDicePoints(selectedPoints)
        return points[i]
        } 
        else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points')
        }
    }

    //scoreboard points
    const savePlayerPoints = async() => {

        let time = new Date()
        let date = `${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}`;
        let currentTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

        const newKey = scores.length + 1
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: date, 
            time: currentTime,
            points: totalPoints // change this to all points (+bonus if there is)
        }
        try {
            const newScore = [...scores, playerPoints]
            const jsonValue = JSON.stringify(newScore)
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
        } catch (error) {
            console.log('save error: ' + error);            
        }
    }

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

    //tänne jotain vielä...
    const throwDices = () => {
        setGameStartStatus(true) //ei toimi vielä hyvin
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus('Select your points before the next throw.')
            return 1
        } else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false)
            diceSpots.fill(0)
            dicePointsTotal.fill(0)
        }

        let spots = [...diceSpots]

        for ( let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1)
                board[i] = 'dice-' + randomNumber
                spots[i] = randomNumber
            }
        }
        setNbrOfThrowsLeft(prev => prev -1)
        setDiceSpots(spots)
        setStatus('Select and throw dices again')
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i]
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            setSelectedDices(dices)
        } else {
            setStatus('You have to throw dices first. ')
        }
    }

    function getDiceColor(i) {
        return selectedDices[i] ? '#C56B37' : '#F0681A'
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] && !gameEndStatus ? '#C56B37' : '#F0681A'
    }

    const restartGame = () => {
        setGameStartStatus(false)
        setGameEndStatus(false)
        setStatus('Throw dices')
        diceSpots.fill(0) 
        dicePointsTotal.fill(0)
        setTotalPoints(0)
        selectedDices.fill(0)
        selectedDicePoints.fill(0)
        totalPointsCounter = 0
        pointsMissing = 0
        setBonusPointStatus(`You are ${BONUS_POINTS_LIMIT} points away from bonus`)
    }
    
    //gameStartStatus ei toimi vielä hyvin
    return(
        <>   
        <View style={style.container}>     
            <Header/>
            <View style={style.innerview}>
            
            {!gameStartStatus ? 
            <>
            <Text style={style.textcolor}>Start your game! </Text>
            <MaterialCommunityIcons name="dice-multiple"
            size={60}
            color={'#F0681A'}
            />
            </>
            :
            <Container fluid>
                <Row>{dicesRow}</Row>
            </Container>}
            <Text style={style.textcolor}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={style.textcolor}> {status}</Text>
            <Button 
                textColor= {buttonTxtColor}
                style={style.buttons}
                mode="elevated"
                disabled={gameEndStatus}
                onPress={()=>throwDices()}>THROW DICES</Button>
            <View>
                <Text style={style.textcolor}>Your points are {totalPoints}.</Text>
                <Text style={style.textcolor}>{bonusPointStatus}</Text>
            </View>                
            <Container fluid>
                <Row >{pointsRow}</Row>
            </Container>
            <Container fluid>
                <Row>{pointsToSelectRow}</Row>
            </Container>   
            <Button 
                textColor= {buttonTxtColor}
                style={style.buttons}
                mode="elevated"
                onPress={()=>restartGame()}>START AGAIN</Button>
            <Text style={style.textcolor}>player: {playerName}</Text>
            </View>
            <Footer/>  
            </View>      
        </>
    )
}