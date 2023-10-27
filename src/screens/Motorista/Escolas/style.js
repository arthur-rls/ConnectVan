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
  viewBotao:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'flex-end',
    
    
  },
  botaoAdd:{
    backgroundColor:'black', 
    borderRadius:25, 
    width:37,
    height:37, 
    alignItems:'center', 
    justifyContent:'center',
    
  },
  botaoEscola:{
    width:'90%',
    height: 80,
    marginTop:'6%',
    marginBottom:'1%'
  },
  iconMenu:{
    marginLeft:10,
  },
  iconLupa:{
    position:'absolute',
    marginLeft:10,
  },
  botaoEscola:{
    width:'90%',
    height: 80,
    marginBottom:'2%',
  },
  fundoEscola:{
    borderRadius: 20,
    borderWidth:0.5,
    flexDirection:'row',
    width:'100%',
    
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
