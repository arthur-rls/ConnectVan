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
    marginTop:'5%',
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
    alignItems:'center',
  },
  fundoTab2:{
    flex:1,
    backgroundColor: '#fff',
    width:'100%',
    marginTop:'5%',
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
    alignItems:'center',
    justifyContent:'center'
  },
  viewBotao:{
    marginVertical:'9%',
  },
  flatlist:{
    fontSize:17,
    backgroundColor:'pink'
  },
  flatlistAberto:{
    paddingRight:'10%', 
  },
  titulo:{
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'AileronH'
  },
  botao:{
    borderRadius:35, 
    marginTop:-30,
    width:145,
    height:45, 
    borderRadius:35,
    alignItems:'center', 
    justifyContent:'center',
  },
  botaoContratar:{
    borderRadius:35, 
    marginTop:-10,
    width:145,
    height:45, 
    borderRadius:35,
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
  fundoTel:{
    flexDirection:'row', 
    alignItems:'center', 
    paddingHorizontal:10, 
    backgroundColor:'white', 
    borderRadius:30, 
    marginTop:20, 
    marginBottom:7,
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