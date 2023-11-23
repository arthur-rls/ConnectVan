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
    fundoEscola:{
      borderRadius: 20,
      width:'90%',
      height: 80,
      backgroundColor: 'white',
      marginTop:'5%',
      borderWidth:0.5,
      flexDirection:'row',
    },
    viewBotao:{
      position:'absolute',
      width:'100%',
      height:'100%',
      justifyContent:'flex-end',
    },
    botaoAdd:{
      backgroundColor:'black', 
      borderRadius:50, 
      width:'60%',
      height:50, 
      alignItems:'center', 
      justifyContent:'center',
    },
    gradientBotao:{
      width:'100%', 
      height:'100%', 
      alignSelf: 'center', 
      borderRadius:50
    },
    input:{
      padding:20,
      height: 60,
      width:'100%',
      borderColor:'black',
      fontStyle:'italic',
      color:'gray',
      fontSize:15,
      borderRadius:20,
      borderWidth:0.5
    }
  });