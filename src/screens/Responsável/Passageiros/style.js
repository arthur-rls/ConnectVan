import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#FFBF00',
    },
    fundoTab:{
      flex:2,
      backgroundColor: '#fff',
      width:'100%',
      marginTop:'5%',
      borderRadius: 40,
      paddingVertical:20,
      borderBottomEndRadius:0,
      borderBottomStartRadius:0,
      alignItems:'center',
    },
    fundoEscola:{
      borderRadius: 20,
      shadowColor: "#000",
      borderWidth:0.5
    },
    nome:{
      fontSize:17,
      marginBottom:2,
      marginLeft:'5%',
      fontWeight:'bold',
      alignSelf:'center'
    },
    viewBotao:{
      textAlignVertical:'center',
      justifyContent:'center',
    },
    botaoAdd:{
      backgroundColor:'#FFBF00',
      borderRadius:25,
      width:200,
      height:45,
      alignItems:'center',
      justifyContent:'center'
    },
    botaoEscola:{
      width:'90%',
      height: 80,
      backgroundColor: 'white',
      marginTop:'5%',
    },
    iconMenu:{
      marginLeft:15,
    },
    viewMae:{
      width:2, 
      backgroundColor:'black', 
      borderRadius:50,
    },
    fundoEscola:{
      borderRadius: 20,
      shadowColor: "#000",
      borderWidth:0.5
    },
    nome:{
      fontSize:16,
      marginBottom:2,
      marginLeft:'5%',
      fontFamily:'AileronH',
      alignSelf:'center'
    },
    gradient:{
      width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
    },
    botaoAdd:{
      backgroundColor:'transparent', 
      flexDirection:'row',
      borderRadius:25, 
      width:200,
      height:42, 
      alignItems:'center', 
      justifyContent:'center',
      marginTop:'100%'
    },
  });