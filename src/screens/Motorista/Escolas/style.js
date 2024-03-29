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
  viewBotao:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'flex-end',
  },
  mensagem:{
    fontSize:18, 
    fontFamily:'AileronH', 
    color:'gray', 
    textAlign:'center', 
    marginBottom:2
  },
  botaoAdd:{
    backgroundColor:'black', 
    borderRadius:25, 
    width:44,
    height:44, 
    alignItems:'center', 
    justifyContent:'center',
  },
  botaoEscola:{
    width:'90%',
    height: 80,
    backgroundColor: 'white',
    marginBottom:'5%',
    borderWidth:0.5,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:'5%'
  },
  iconLupa:{
    position:'absolute',
    marginLeft:10,
  },
  nome:{
    fontFamily:'AileronH',
    fontSize:18
  },
  passageiros:{
    fontFamily:'AileronR',
    fontSize:14
  },
});
