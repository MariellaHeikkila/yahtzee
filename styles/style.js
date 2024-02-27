import { StyleSheet, Dimensions } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../constants/Metrics'

const { width, height } = Dimensions.get('window');

const backgroundApp = '#332E2C'
const secondary = '#C56B37'
const secondarysecond = '#F0681A'
const tertiary = '#9B6445'
const textcolor = '#f5e8e3'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundApp,
    height: verticalScale(70),
    width: horizontalScale(380),
  },
  header: {
    height: verticalScale(55),
    backgroundColor: tertiary,
    flexDirection: 'row',
  },
  footer: {
    height: verticalScale(40),
    backgroundColor: tertiary,
    flexDirection: 'row'
  },
  title: {
    color: textcolor,    
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(23),
  },
  author: {
    color: textcolor,
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(14),
    textAlign: 'center',
    margin: moderateScale(4),
  },
  innerview: {    
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10)   
  },
  inputText: {
    backgroundColor: textcolor,
    width: horizontalScale(200)
  },
  titletexts: {
   fontWeight: 'bold',
   fontSize: moderateScale(19),
   textAlign: 'center',
   color: textcolor,
   marginVertical: horizontalScale(5)
  },
  textcolor: {    
    color: textcolor,
    textAlign: 'center',
    marginVertical: horizontalScale(5)
  },
  rulesText: {
    color: textcolor,
    textAlign: 'left',
    marginTop: 10,
    marginHorizontal: horizontalScale(10)
  },
  pointsrowtext: {
    color: textcolor,
    textAlign: 'center',
    marginBottom: 5
  },
  scoreboardheadertexts: {
    color: textcolor,
  },
  scoreboard: {
    flex: 1,
    backgroundColor: backgroundApp
  },
  buttonText: {
    color:'#332E2C',
    fontSize: 20
  },
  buttons: {
    width: horizontalScale(200),
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    backgroundColor: '#f5e8e3',
    borderRadius: 5
  }
});