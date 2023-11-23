import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
  },
  viewInput:{
    flexDirection:'row', 
    alignItems:'center', 
    marginTop:'15%',
    justifyContent:'center',
  },
  input:{
    width:'92%', 
    height:42, 
    backgroundColor:'white', 
    borderRadius:15, 
    position:'absolute',
    paddingHorizontal:20,
    fontFamily:'AileronR'
  },
  lupa:{
    marginRight:'35%'
  },
  todos:{
    fontSize:18,
    marginTop:'5%',
    marginBottom:'3%',
    fontFamily:'AileronH',
    alignSelf:'center'
  },
  mensagem:{
    fontSize:18, 
    fontFamily:'AileronH', 
    color:'gray', 
    textAlign:'center', 
    marginBottom:2
  },
  fundoTab:{
    flex:1,
    backgroundColor: '#fff',
    width:'100%',
    marginTop:'8%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  fundoEscola:{
    borderRadius: 20,
    borderWidth:0.5,
    flexDirection:'row',
  },
  botaoEscola:{
    width:'90%',
    height: 80,
    marginTop:'2%',
  },
  viewEstrela:{
    position:'absolute', 
    marginLeft:'86%', 
    marginTop:20
  },
  nomeMotorista:{
    fontSize:17, 
    marginBottom:2, 
    fontFamily:'AileronH'
  },
});