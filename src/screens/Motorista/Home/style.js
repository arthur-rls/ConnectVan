import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFBF00',
    width:'100%'
  },
  fundoTab: {
    flex:1,
    backgroundColor: '#fff',
    width:'100%',
    marginTop:'5%',
    borderRadius: 40,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
    alignItems:'center',
  },
  iconMenu:{
    marginLeft:15,
  },
  saldot: {
    flex:0.5,
    width: '83%',
    height: 80,
    alignConbotaotent:'center',
    backgroundColor: 'white',
  },
  logo:{
    width: 42, 
    height: 42, 
    resizeMode: 'stretch', 
    borderRadius:100, 
    marginRight:10,
    marginTop:-5
  },
  avisos: {
    flex:1,
    width: '83%',
    height: '15%',
    alignContent:'center',
    backgroundColor: 'white',
  },
  avisosSaldo: {
    flex:0.5,
    width: '83%',
    height: '15%',
    alignContent:'center',
    backgroundColor: 'white',
  },
  fundoAvisos:{
    borderRadius: 11,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    flexDirection:'row',
    alignItems:'center',
  },
  fundoSaldo: {
    borderRadius: 11,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    flexDirection:'row',
    alignItems:'center',
  },
  linhaAmarela:{
    width:6, 
    backgroundColor:'#FFBF00', 
    height:'100%',
    borderTopLeftRadius:11,
    borderBottomLeftRadius:11,
    position:'absolute',
  },
  textSaldo:{
    fontSize: 17, 
    marginTop:12, 
    fontFamily:'AileronR'
  },
  botaoOcultar: {
    flexDirection: 'column',
    backgroundColor: '#FFBF00',
    borderRadius: 12,
    width: 80,
    height: 38,
    marginLeft:'8%',
    justifyContent: 'center',
    alignItems:'center',
    position:'absolute',
    bottom:0,
    right:0
  },
  botaoVer: {
    flexDirection: 'column',
    backgroundColor: '#FFBF00',
    borderRadius: 12,
    width: 80,
    height: 35,
    marginLeft:'17%',
    justifyContent: 'center',
    alignItems:'center',
  },
  gradient:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:12,
  },
  data:{
    fontSize: 14,
    color: '#999999',
    marginLeft: '40%',
  },
  inputi: {
    height: 70,
    width:'90%',
    height:'100%',
    fontSize: 17,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    fontStyle:'italic',
    fontFamily:'AileronR',
    textAlign:'left',
    marginVertical:'1%'
  },
  viewBotao: {
    justifyContent: 'center',
  },
  botaoAdd2: {
    backgroundColor: '#FFBF00',
    borderRadius: 80,
    width: 298,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  gradientBotao:{
    width:'100%', 
    height:'100%', 
    alignSelf: 'center', 
    borderRadius:50
  },
  apaga: {
    marginTop: 8,
    alignSelf:'flex-end'
  },
  enviar: {
    justifyContent:'flex-end',
    marginLeft:'93%',
    position:'absolute',
  },
});