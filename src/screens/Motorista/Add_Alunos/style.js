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
      marginTop:10,
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
    fundoEscola:{
      borderRadius: 20,
      borderWidth:0.5,
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
    gradient:{
      width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
    },
    botaoAdd:{
      backgroundColor:'#FFBF00',
      borderRadius:25,
      width:160,
      height:45,
      alignItems:'center',
      justifyContent:'center',
      marginBottom:'7%'
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
    },
    gradientBotao:{
      width:'100%', 
      height:'100%', 
      alignSelf: 'center', 
      borderRadius:50
    },
    botaoEscola:{
      width:'90%',
      height: 80,
      backgroundColor: 'white',
    },
    iconMenu:{
      marginLeft:10,
    },
    viewMae:{
      width:2, 
      backgroundColor:'black', 
      borderRadius:50,
      marginBottom:'10%',
      height:'100%'
    },
  });