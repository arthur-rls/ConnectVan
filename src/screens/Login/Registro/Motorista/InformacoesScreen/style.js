import {StyleSheet} from 'react-native'



export default StyleSheet.create({
  h1:{
    fontSize: 45,
    fontFamily:'AileronH',
    alignItems: 'center',
    marginTop:'45%'
  },
  tela:{
    width:'100%',
    paddingBottom:20
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
  icon:{
    left:30,
    zIndex:2,
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
  },
  errOuIncorr:{
    backgroundColor:'#f02929', 
    marginTop: 15, 
    padding:10, 
    flexDirection:'row', 
    borderRadius:13, 
    alignSelf:'center',
  },
})

