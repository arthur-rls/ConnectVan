import {StyleSheet} from 'react-native'



export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
    alignItems:'center'
  },
  viewInput:{
    flexDirection:'row', 
    marginTop:'15%',
    justifyContent:'center',
    alignItems:'center',
    width:'95%',
  },
  input:{
    height:42, 
    width:'100%',
    backgroundColor:'white', 
    borderRadius:15, 
    paddingHorizontal:20,
    fontFamily:'AileronR',
  },
  todos:{
    fontSize:18,
    marginTop:'5%',
    marginBottom:'3%',
    fontFamily:'AileronH'
  },
  fundoTab:{
    flex:1,
    backgroundColor: '#fff',
    width:'100%',
    marginTop:'10%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems:'center'
  },
  fundoEscola:{
    borderRadius: 20,
    borderWidth:0.5,
    flexDirection:'row',
  },
  viewBotao:{
    alignItems:'center',
    justifyContent:'center',
    marginVertical:'15%',
    
  },
  botaoMaps:{
    backgroundColor:'transparent', 
    flexDirection:'row',
    borderRadius:25, 
    width:200,
    height:42, 
    alignItems:'center', 
    justifyContent:'center',
  },

  saldot: {
    width: '90%',
    backgroundColor: 'white',
  },
  fundoSaldo: {
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    flexDirection:'row',
    alignItems:'center'
  },
  viewMae:{
    width:3, 
    backgroundColor:'#FFBF00', 
    position:'absolute',
    left:-1,
    height:'100%'
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
  },
});