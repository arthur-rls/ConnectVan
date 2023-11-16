import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  h1:{
    fontSize: 55,
    fontFamily:'AileronH',
    alignItems: 'center',
    marginTop:'45%'
  },
  tela:{
    width:'100%',
    paddingVertical:20
  },
  input:{
    width:'100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    paddingHorizontal: 40,
    fontSize:13,
    fontFamily:'AileronR'
  },
  inputErro:{
    width:'100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#f02929',
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    paddingHorizontal: 40,
    fontSize:13,
    fontFamily: 'AileronR'
  },
  iconErro:{
    position:'absolute',
    zIndex:2,
    marginLeft:20,
    color:'#f02929'
  },
  icon:{
    position:'absolute',
    zIndex:2,
    marginLeft:11,
  },
  gradient:{
    width:140, height:45, alignSelf: 'center', borderRadius:50
  },
  botao:{
    width:140,
    backgroundColor:'yellow',
    alignItems: 'center',
    height:43,
    justifyContent:'center',
    borderRadius:50,
    marginTop:'7%'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    padding: 35,
    height:'80%',

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
  politica:{
    fontFamily:'AileronR',
    fontSize:15,
    paddingVertical:5,
    textAlign:'justify'
  },
  politica2:{
    fontFamily:'AileronH',
    fontSize:15,
    paddingVertical:5,
    textAlign:'justify'
  },
  errOuIncorr:{
    position:'absolute', 
    backgroundColor:'#f02929', 
    marginTop: 20, 
    padding:10, 
    flexDirection:'row', 
    borderRadius:13,
    alignSelf:'center'
  },
})

