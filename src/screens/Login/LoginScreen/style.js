import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  logo:{
    width: 130, 
    height: 130, 
    resizeMode: 'stretch',
    borderRadius:100,
    marginTop:80
  },
  tela:{
    width:'100%',
    alignItems: 'center',
    paddingVertical:20
  },
  inner:{
    flex:1,
    paddingHorizontal:20,
    alignItems:'center',
    backgroundColor:'white',
    height:'100%'
  },
  connect:{
    fontSize: 40,
    color: '#FFBF00',
    fontFamily: 'AileronH',
    marginTop:15
  },
  van:{
    fontSize: 40,
    marginTop:-6  ,
    fontFamily: 'AileronH'
  },
  viewInput:{
    flexDirection:'row', 
    alignItems:'center',
    marginTop:15 
  },
  input:{
    width:'95%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    paddingHorizontal: 40,
    fontSize:13,
    fontFamily: 'AileronR'
  },
  inputErro:{
    width:'100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#f02929',
    backgroundColor: '#ECECEC',
    color: '#6F6F6F',
    paddingHorizontal: 40,
    fontSize:13,
    fontFamily: 'AileronR'
  },
  icon:{
    position:'absolute',
    zIndex:2,
    marginLeft:10,
  },
  iconErro:{
    position:'absolute',
    zIndex:2,
    marginLeft:10,
    color:'#f02929'
  },
  centeredView:{
    justifyContent:'center',
    marginTop:'50%'
  },
  gradient:{
    width:'100%', height:50, alignSelf: 'center', borderRadius:50
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
  container: {
    flex: 1,
  },
  viewButton:{
    width:'40%', 
    alignItems:'center', 
    paddingTop:11
  },
  textButton:{
    fontSize:17, 
    fontWeight:'bold',
    position:'absolute',
    fontFamily: 'AileronR'
  },
  botaoEntrar:{
    width:'90%',
    backgroundColor:'yellow',
    alignItems: 'center',
    height:45,
    justifyContent:'center',
    borderRadius:50,
  },
  botaoCadastrar:{
    width:155,
    backgroundColor:'yellow',
    alignItems: 'center',
    height:45,
    justifyContent:'center',
    borderRadius:50,
    marginBottom:'5%'
  },
})

