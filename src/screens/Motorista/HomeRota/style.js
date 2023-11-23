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
    gap:20
  },
  botaoMaps:{
    backgroundColor: '#FFBF00',
    borderRadius: 80,
    width: 295,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    flexDirection:'row'
  },
  dropdown: {
    backgroundColor: 'white',
    color: '#CCCCCC',
    fontSize:14,
    fontFamily:'AileronR',
    borderRadius:12,
    borderWidth:0.6,
    width:'95%',
  },
  box:{
    backgroundColor: 'white',
    color: '#CCCCCC',
    fontSize:14,
    fontFamily:'AileronR',
    borderRadius:12,
    borderWidth:0.6,
    width:'95%',
  },
  containerStyle:{
    width: '90%',
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    fontSize:13,
    fontFamily:'AileronR',
    borderRadius:8
  },
  botaoAdd2: {
    backgroundColor: '#FFBF00',
    borderRadius: 80,
    width: 298,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  gradientBotao:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:50
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
    width:2, 
    backgroundColor:'black', 
    borderRadius:50,
  },
  viewFilha:{
    fontSize:18, 
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
    marginTop:'9%',
    zIndex:1
  },
  gradientBotao:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:80, 
    position:'absolute'
  },
  botaoAdd:{
    borderRadius:25,
    width:135,
    marginTop:5,
    height:45,
    alignItems:'center',
    justifyContent:'center'
  },
  viewBotao2:{
    justifyContent:'center',
    marginTop:'5%',
    flexDirection:'row', 
    gap:18
  },
  centeredView:{
    justifyContent:'center',
    marginTop:'50%',
    marginHorizontal:'30%',
  },
  gradient:{
    width:'100%', height:'100%', alignSelf: 'center', borderRadius:50
  },
  modalView: {
    margin:50,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
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
  modalViewMaps: {
    margin:20,
    position:'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
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
    marginVertical:'60%'
  },
  viewBotao:{
    justifyContent:'center',
    marginTop:'2%',
    marginBottom:'8%',
    gap:12, 
  },
  viewBotaoModal:{
    justifyContent:'center', 
    flexDirection:'row', 
    gap:12, 
  },
  botaoModal:{
    borderRadius:25,
    width:138,
    height:45,
    marginTop:'5%',
    alignItems:'center',
    justifyContent:'center'
  },
  faltantesTexto:{
    fontSize:18, 
    textAlign:'justify', 
    paddingBottom:8, 
    fontFamily:'AileronH', 
    alignSelf:'center'
  },
});

