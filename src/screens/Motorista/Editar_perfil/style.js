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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1.3,
    padding: 30,
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
    marginTop:'2%',
    flexDirection:'row', 
    marginBottom:'8%',
    gap:12, 
  },
  viewBotaoModal:{
    justifyContent:'center', 
    flexDirection:'row', 
    gap:12, 
  },
  botaoAdd:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:135,
    height:45,
    alignItems:'center',
    justifyContent:'center'
  },
  botaoModal:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:138,
    height:45,
    marginTop:'5%',
    alignItems:'center',
    justifyContent:'center'
  },
  botaoSair:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:'35%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  botaoContato:{
    backgroundColor:'#FFBF00',
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