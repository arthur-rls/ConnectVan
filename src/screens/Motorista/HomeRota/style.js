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
    justifyContent:'center'
  },
  viewBotao:{
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    marginBottom:'50%',
    
  },
  botaoMaps:{
    backgroundColor:'transparent', 
    flexDirection:'row',
    borderRadius:25, 
    width:200,
    height:42, 
    alignItems:'center', 
    justifyContent:'center',
  },
  dropdown: {
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8,
    borderWidth:0,
  },
  box:{
    width: '100%',
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8,
    borderWidth:0
  },
  containerStyle:{
    width: '90%',
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8,
    
  },
  text:{
    fontSize:13,
    fontFamily:'AileronR',
    color: '#6F6F6F',
  },
  infos:{
    fontSize:14, 
    marginTop:'2%',
    color:'gray',
    fontFamily:'AileronR'
  },
  iconBack:{
    marginLeft:10,
  },
  imagem:{
    width:'50%',
    height:'100%',
  },
  viewMae:{
    width:1, 
    backgroundColor:'black', 
    borderRadius:50,
  },
  viewFilha:{
    fontSize:20, 
    fontFamily:'AileronH'
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
  accordion:{
    marginTop:'5%',
    zIndex:1
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:20, position:'absolute'
  },
  botaoAdd:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:105,
    height:45,
    alignItems:'center',
    justifyContent:'center'
  },
  viewBotao2:{
    justifyContent:'center',
    marginTop:'5%',
    flexDirection:'row', 
    gap:12
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
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
});

