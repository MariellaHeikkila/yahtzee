import { StyleSheet } from 'react-native';

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
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
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
  textcolor: {
    
    color: textcolor,
  },
  rulesText: {
    color: textcolor,
    marginTop: 5
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
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:'#332E2C',
    fontSize: 20
  },
  buttons: {
    marginHorizontal: 50,
    marginVertical: 20,
    backgroundColor: '#f5e8e3',
    color: 'white'
  }
});