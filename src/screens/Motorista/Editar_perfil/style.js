import {StyleSheet} from 'react-native'



export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
  },
      fundoTab:{
        flex:1,
        backgroundColor: '#fff',
        width:'100%',
        marginTop:20,
        borderRadius: 40,
        borderBottomEndRadius:0,
        borderBottomStartRadius:0,
        alignItems:'center',
      },
      viewBotao:{
        justifyContent:'center',
        marginTop:'15%',
        flexDirection:'row', 
        marginBottom:'8%',
        gap:12
      },
      botaoAdd:{
        backgroundColor:'#FFBF00',
        borderRadius:25,
        width:105,
        height:45,
        alignItems:'center',
        justifyContent:'center'
      },
      input:{
        height: 45,
        width:260,
        marginTop:'3%',
        borderWidth: 1,
        borderColor:'#black',
        padding: 10,
        borderRadius:5,
        color:'gray'
      }
    });