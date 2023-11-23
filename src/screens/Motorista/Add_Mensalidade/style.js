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
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
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
  },
  centeredView:{
    justifyContent:'center',
    marginTop:'50%'
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
  viewBotao:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'flex-end',
    flexDirection:'row',
    gap:15
  },
  botaoAdd:{
    backgroundColor:'#FFBF00',
    borderRadius:25,
    width:140,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'7%'
  },
  gradientBotao:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:50
  },
  // input:{
  //   width:'100%', 
  //   height:42, 
  //   backgroundColor:'white', 
  //   borderRadius:15,
  //   borderWidth:0.5,
  //   paddingHorizontal:20,
  //   fontFamily:'AileronR'
  // },
});