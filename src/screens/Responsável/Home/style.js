import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
    alignItems:'center',
  },
  viewInput:{
    flexDirection:'row', 
    marginTop:'13%',
    justifyContent:'center',
    alignItems:'center',
    width:'92%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1.3,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView:{
    justifyContent:'center',
    marginTop:'50%'
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
    marginTop:'5%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems:'center',
    paddingVertical:20
  },
  fundoEscola:{
    borderRadius: 20,
    borderWidth:0.5,
    flexDirection:'row',
  },
  botaoAdd2: {
    backgroundColor: '#FFBF00',
    borderRadius: 80,
    width: 298,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop:'90%'
  },
  viewBotaoCalendario:{
    justifyContent:'center',
    marginTop:'10%',
    flexDirection:'row', 
    gap:12,
  },
  botaoAdd:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:123,
    height:45,
    alignItems:'center',
    justifyContent:'center',
  },
  botao:{
    backgroundColor:'#FFBF00', 
    borderRadius:35, 
    marginTop:-30,
    width:145,
    height:45, 
    borderRadius:35,
    alignItems:'center', 
    justifyContent:'center',
  },
  botaoMaps:{
    backgroundColor:'transparent', 
    flexDirection:'row',
    borderRadius:45, 
    width:200,
    height:47, 
    alignItems:'center', 
    justifyContent:'center',
  },
  avisos: {
    flex:1,
    width: '83%',
    height: '15%',
    alignContent:'center',
    backgroundColor: 'white',
  },
  viewSaldo: {
    flex:0.3,
    width: '83%',
    alignContent:'center',
  },
  viewAvisos: {
    flex:0.5,
    width: '83%',
    height:'30%',
    alignContent:'center',
    marginTop:'30%'
  },
  fundoAvisos:{
    borderRadius: 11,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    alignContent:'center',
    alignItems:'flex-start', 
    paddingLeft:'5%',
    marginTop:'7%',
  },
  fundoSaldo: {
    borderRadius: 11,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    flexDirection:'row',
    alignItems:'center',
  },
  linhaAmarela:{
    width:6, 
    backgroundColor:'#FFBF00', 
    height:'100%',
    borderTopLeftRadius:11,
    borderBottomLeftRadius:11,
    position:'absolute',
  },
  botaoPagNPag: {
    flexDirection: 'column',
    backgroundColor: '#FFBF00',
    borderRadius: 12,
    width: 80,
    height: 32,
    marginLeft:'19%',
    marginTop:4,
    justifyContent: 'center',
    alignItems:'center',
  },
  gradient:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:35
  },
  gradientCalendario:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:35
  },
  logo:{
    width: 42, 
    height: 42, 
    resizeMode: 'stretch', 
    borderRadius:100, 
    marginRight:10,
    marginTop:-5
  },
});