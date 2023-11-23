import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
  },
  fundoTab:{
    flex:1,
    backgroundColor: '#fff',
    width:'100%',
    marginTop:15,
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
    alignItems:'center',
    gap:10,
    paddingTop:15
  },
  fundoTab2:{
    flex:1,
    backgroundColor: '#fff',
    width:'100%',
    marginTop:10,
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
    alignItems:'center',
    justifyContent:'center'
  },
  botao:{
    borderRadius:25, 
    width:'70%',
    height:'7%',  
    alignItems:'center', 
    justifyContent:'center', 
  },
  infos:{
    fontSize:15, 
    marginTop:'2%',
  },
  iconMenu:{
    marginLeft:10,
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
  },
  botao2:{
    width:'100%',
    alignItems: 'center',
    height:50,
    justifyContent:'center',
    borderRadius:50
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
  },
  viewBotao:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'flex-end',
    paddingBottom:'5%'
  },
  senhaErrOuIncorr:{
    position:'absolute', 
    backgroundColor:'green', 
    padding:10,
    marginHorizontal:'15%', 
    flexDirection:'row', 
    borderRadius:13,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:'5%',
    zIndex:2
  },
  textoSolici:{
    fontFamily:'AileronR', 
    fontSize:16, 
    color:'white', 
    marginLeft:5
  },
  botaoAdd2: {
    borderRadius: 80,
    width: 315,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist:{
    fontSize:17,
    backgroundColor:'pink'
  },
  titulo:{
    fontSize:18,
    fontWeight:'bold',
    fontFamily:'AileronH'
  },
  gradientCalendario:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:35
  },
  gradientBotao:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:50
  },
  fundoTel:{
    flexDirection:'row', 
    alignItems:'center', 
    paddingHorizontal:10, 
    backgroundColor:'white', 
    borderRadius:30, 
    marginTop:20, 
    width:'90%',
    height:'8.3%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.65,
    elevation: 9,
  },
  accordion:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.65,
    elevation: 9,
    height:60,
    borderRadius:30, 
    width:'100%',
    backgroundColor:'white'
  }
});