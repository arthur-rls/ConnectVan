import {StyleSheet} from 'react-native'



export default StyleSheet.create({
  logo:{
    width: 150, 
    height: 150, 
    margin: 2,
    resizeMode: 'stretch',
    borderRadius:100,
    marginTop:'50%'
  },
  tela:{
    width:'100%',
    alignItems: 'center',
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
  icon:{
    width:100,
    height:100,
    zIndex:2,
  },

  gradient:{
    width:'100%', height:150, alignSelf: 'center', borderRadius:20
  },
  botao:{
    width:'100%',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:20,
    flex: 1, 
    height:150,
  },
})

