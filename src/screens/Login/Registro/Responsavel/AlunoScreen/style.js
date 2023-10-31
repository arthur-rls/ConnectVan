import {StyleSheet} from 'react-native'



export default StyleSheet.create({
  h1:{
    fontSize: 45,
    fontFamily:'AileronH',
    alignItems: 'center',
    marginTop:'30%'
  },
  tela:{
    width:'100%',
    paddingVertical:20
  },
  input:{
    width:'100%',
    height: 53, 
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    padding: 15,
    fontSize:13,
    marginVertical:7,
    fontFamily:'AileronR'
  },
  inputErro:{
    borderWidth: 1, 
    borderColor: '#f02929',
    width:'100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    padding: 20,
    fontSize:13,
    marginVertical:5,
    fontFamily:'AileronR'
  },
  gradient:{
    height:50, alignSelf: 'center', borderRadius:50, width:'100%'
    },
    botao:{
      width:'100%',
      backgroundColor:'yellow',
      alignItems: 'center',
      justifyContent:'center',
      borderRadius:50,
      flex: 1,
      marginTop:'8%'
    },
  input2:{
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    paddingHorizontal: 25,
    fontSize:13,
    width:'100%',
    fontFamily:'AileronR',
    flex:1,
    marginTop:8
  },
  input2Erro:{
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    paddingHorizontal: 25,
    fontSize:13,
    width:'100%',
    fontFamily:'AileronR',
    borderWidth: 1, 
    borderColor: '#f02929',
    flex:1
  },
  fundo:{
    flex:5, 
    paddingHorizontal: 40, 
    backgroundColor: 'white', 
    alignItems: 'center'
  },
  dropdown: {
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8,
    borderWidth:0,
  },
  dropdownErro: {
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8,
    borderWidth:0,
    borderWidth: 1, 
    borderColor: '#f02929',
  },
  containerStyle:{
    width: 100,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8,
    
  },
  text:{
    fontSize:13,
    fontFamily:'AileronR',
    color: '#6F6F6F',
  },
  box:{
    width: 100,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8,
    borderWidth:0.4
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView:{
    justifyContent:'center',
    marginTop:'50%'
  },
  errOuIncorr:{
    position:'absolute', 
    backgroundColor:'#f02929', 
    marginTop: 15, 
    padding:10, 
    flexDirection:'row', 
    borderRadius:13, 
    alignSelf:'center',
  },
})

