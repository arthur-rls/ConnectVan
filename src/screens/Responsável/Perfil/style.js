import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
    width:'100%'
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50,
    position:'absolute'
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1.3,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView:{
    justifyContent:'center',
    marginTop:'50%'
  },
  viewBotao:{
    justifyContent:'center',
    flexDirection:'row', 
    marginBottom:'4%',
    gap:12, 
  },
  viewBotaoModal:{
    justifyContent:'center', 
    flexDirection:'row', 
    gap:12, 
  },
  botaoAdd:{
    borderRadius:25,
    width:135,
    height:45,
    alignItems:'center',
    justifyContent:'center'
  },
  botaoModal:{
    borderRadius:25,
    width:138,
    height:45,
    marginTop:'5%',
    alignItems:'center',
    justifyContent:'center'
  },
  botaoSair:{
    borderRadius:25,
    width:'35%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  senhaErrOuIncorr:{
    position:'absolute', 
    backgroundColor:'green', 
    padding:10,
    marginHorizontal:'15%', 
    flexDirection:'row', 
    borderRadius:13,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:'5%',
    zIndex:2
  },
  textoSolici:{
    fontFamily:'AileronR', 
    fontSize:16, 
    color:'white', 
    marginLeft:5
  },
  botaoContato:{
    borderRadius:25,
    width:'72%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  input:{
    height: 45,
    width:290,
    marginTop:'3%',
    borderWidth: 1,
    borderColor:'#black',
    padding: 10,
    borderRadius:8,
    color:'gray'
  }
});