import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const backgroundApp = '#332E2C'

const secondary = '#C56B37'

const secondarysecond = '#F0681A'

const tertiary = '#9B6445'

const textcolor = '#f5e8e3'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundApp
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: tertiary,
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: tertiary,
    flexDirection: 'row'
  },
  title: {
    color: textcolor,    
    flex: 1,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: textcolor,
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  innerview: {    
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15    
  },
  inputText: {
    backgroundColor: textcolor,
    marginVertical: 5
  },
  titletexts: {
   fontWeight: 'bold',
   fontSize: width * 0.05,
   textAlign: 'center',
   color: textcolor,
  },
  textcolor: {    
    color: textcolor,
    textAlign: 'center'
  },
  rulesText: {
    color: textcolor,
    marginTop: 10
  },
  pointsrowtext: {
    color: textcolor,
    textAlign: 'center',
    marginBottom: 5
  },
  scoreboardheadertexts: {
    color: textcolor,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  buttonText: {
    color:'#332E2C',
    fontSize: 20
  },
  buttons: {
    marginHorizontal: 50,
    marginVertical: 10,
    backgroundColor: '#f5e8e3',
    borderRadius: 5
  }
});