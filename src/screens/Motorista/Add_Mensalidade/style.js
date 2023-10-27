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
        
      },
      viewBotao:{
        justifyContent:'center',
        marginTop:'15%',
        flexDirection:'row', 
        marginBottom:'8%',
        gap:12
      },
      gradient:{
        width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
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
        width:'100%', 
        height:42, 
        backgroundColor:'white', 
        borderRadius:15,
        borderWidth:0.5,
        paddingHorizontal:20,
        fontFamily:'AileronR'
      },
    });