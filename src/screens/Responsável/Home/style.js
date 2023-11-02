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
    marginTop:'6%',
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
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderColor: '#DDDDDD',
    borderWidth: 1.3,
    flexDirection:'row',
    alignItems:'center'
  },
  viewMae:{
    width:5, 
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    backgroundColor:'#FFBF00', 
    position:'absolute',
    left:-1,
    height:'100%'
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
  },
  logo:{
    width: 42, 
    height: 42, 
    resizeMode: 'stretch', 
    borderRadius:100, 
    marginRight:10,
  },
});