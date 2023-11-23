import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
  },
  fundoTab:{
    flex:1,
    backgroundColor: 'white',
    width:'100%',
    marginTop:13,
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
    alignItems:'center',
  },
  senhaErrOuIncorr:{
    position:'absolute', 
    backgroundColor:'#f02929', 
    marginTop: 50, 
    padding:10, 
    flexDirection:'row', 
    borderRadius:13,
    alignSelf: 'center',
  },
  iconMenu:{
    marginLeft:10,
  },
  titulo:{
    fontSize:18, 
    fontWeight:'bold', 
    marginTop:'3%'
  },
  viewBotao:{
    justifyContent:'center',
    marginTop:'18%',
    flexDirection:'row', 
    gap:12, 
  },
  botaoAdd:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:105,
    height:45,
    alignItems:'center',
    justifyContent:'center',
  },
  iconBack:{
    marginLeft:10,
  },
  viewMae:{
    width:2, 
    backgroundColor:'black', 
    borderRadius:50,
    marginBottom:'7.5%',
    marginLeft:'12%'
  },
  viewFilha:{
    fontSize:18, 
    fontFamily:'AileronH',
    marginTop:'3%'
  },
  infos:{
    fontSize:15, 
    marginTop:'5%',
    fontFamily:'AileronR'
  },
  fundo:{
    marginTop:'10%'
  },
  viewBotao:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'flex-end',
    flexDirection:'row',
    gap:15
  },
  botaoAdd:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:140,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'7%'
  },
  gradientBotao:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:50
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
  },
});