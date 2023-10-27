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
      iconMenu:{
        marginLeft:10,
      },
      titulo:{
        fontSize:18, 
        fontWeight:'bold', 
        marginTop:'3%'
      },
      infos:{
        fontSize:15, 
        marginTop:'2%',
        fontFamily:'AileronR'
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
        marginBottom:'10%'
      },
      viewFilha:{
        fontSize:18, 
        fontFamily:'AileronH',
        marginTop:'3%'
      },
      fundo:{
        marginTop:'10%'
      }
    });