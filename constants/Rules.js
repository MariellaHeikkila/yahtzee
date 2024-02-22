import { View, Text } from "react-native"
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS
} from '../constants/Game'

export const Rules = () => {
    return(
        <View>
            <Text multiline='true'>THE GAME: Upper section of the classic Yahtzee 
                dice game. You have {NBR_OF_DICES} dices and 
                 for the every dice you have {NBR_OF_THROWS} 
                throws. After each throw you can keep dices in 
                order to get same dice spot counts as many as 
                possible. In the end of the turn you must select 
                your points from {MIN_SPOT} to {MAX_SPOT}. 
                Game ends when all points have been selected. 
                The order for selecting those is free. 
            </Text>
            <Text multiline='true'>POINTS: After each turn game calculates the sum 
                for the dices you selected. Only the dices having 
                the same spot count are calculated. Inside the 
                game you can not select same points from 
                {MIN_SPOT} to {MAX_SPOT} again.
            </Text>
            <Text multiline='true'>GOAL: To get points as much as possible. 
                {BONUS_POINTS_LIMIT} points is the limit of 
                getting bonus which gives you {BONUS_POINTS} 
                points more. 
            </Text>
        </View>
    )
}