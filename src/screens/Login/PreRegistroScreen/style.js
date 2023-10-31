import {StyleSheet} from 'react-native'

//qualquer coisa

export default StyleSheet.create({
  logo:{
    width: 130, 
    height: 130, 
    margin: 2,
    resizeMode: 'stretch',
    borderRadius:100,
    marginTop:'45%'
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
    width:65,
    height:65,
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

