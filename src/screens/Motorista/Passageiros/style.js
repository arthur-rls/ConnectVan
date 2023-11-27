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
    height:'100%',
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
  },
  fundoEscola:{
    borderRadius: 20,
    shadowColor: "#000",
    borderWidth:0.5
  },
  mensagem:{
    fontSize:17, 
    fontFamily:'AileronH', 
    color:'gray', 
    textAlign:'center', 
    marginBottom:2
  },
  nome:{
    fontSize:16,
    marginBottom:2,
    marginLeft:'5%',
    fontWeight:'bold',
    alignSelf:'center'
  },
  botaoEscola:{
    width:'90%',
    height: 80,
    backgroundColor: 'white',
    marginBottom:'5%',
  },
  iconBack:{
    marginLeft:5,
    marginTop:13
  },
});