import { Text, SafeAreaView, View, TouchableOpacity, Linking,Image } from 'react-native';

import { Entypo, FontAwesome} from '@expo/vector-icons';
import styles from './style'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, arrayRemove, updateDoc} from 'firebase/firestore';


export default function Pedidos ({navigation}) {
    const [arr, setArr] = useState([]);
    const [soli, setSoli]=useState([]);
    const [mensagem, setmensagem] = useState('')
    const [nomeM, setNomeM] = useState('')
    
    

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista' , user.uid)
                const snapshot = await getDoc(docRef)
                setSoli(snapshot.data().solicitacao)
                setNomeM(snapshot.data().nome)
                const dataArray = []
                setmensagem(`Olá, sou o motorista ${nomeM} desejo conversar sobre os valores do transporte.`)
                for(const item of soli){
                  const userRef = doc(db, 'responsavel', item)
                  const snap = await getDoc(userRef)
                  const verify = snap.data()
                      if(verify == undefined){
                          updateDoc(doc(db, 'motorista', user.uid), {solicitacao: arrayRemove(item)})
                      }
                      else{
                        const idResponsavel = item;
                        dataArray.push({idResponsavel, ...verify})
                      }
                  }
                  console.log(dataArray)
                  setArr(dataArray)
            }
        });
    }, [mensagem])

    if(arr.length==0 || !arr){
        return(
          <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'13%', justifyContent:'center', marginBottom:'2%', flexDirection:'column'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{flex:1,position:'absolute'}}>
                <Entypo name="chevron-left" size={26} color="black" style={styles.iconMenu}/>
              </TouchableOpacity>
              <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18, fontFamily:'AileronH'}}>Pedidos de Contratação</Text>
              </View>
            </View>
            <View style={[styles.fundoTab, {paddingTop:'65%'}]}>
              <View style={{height:'14%', width:'45%'}}>
                <Image
                    source={require('../../../../assets/avan.png')}
                    style={{width:'100%', height:'100%'}}
                />
                </View>
              <View style={{marginTop:'3%'}}>
                <Text style={{fontSize:20, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>Oops! Não há</Text>
                <Text style={{fontSize:20, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>pedidos de contratação</Text>
                <Text style={{fontSize:20, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>até o momento.</Text>
              </View>
          </View>      
        </View> 
        )
    }
      return (
        <View style={styles.container}>
          <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
          <View style={{ marginTop:'13%', justifyContent:'center', marginBottom:'2%', flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{flex:1,position:'absolute'}}>
              <Entypo name="chevron-left" size={26} color="black" style={styles.iconMenu}/>
            </TouchableOpacity>
            <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:18, fontFamily:'AileronH'}}>Pedidos de Contratação</Text>
            </View>
          </View>
          <View style={styles.fundoTab}>
            <Text style={{fontSize:18, fontFamily:'AileronH', marginTop:'5%', marginBottom:7}}>
              TODOS ({arr.length})
            </Text>
            {arr.map((item) => {
                    const filhos = item.nomeAluno.length
                    const idR = item.idResponsavel;
                    const name = item.nomeAluno[0]
                    if(filhos == 1){
                      return(
                        <TouchableOpacity style={styles.botaoEscola} onPress={()=> navigation.navigate('AddAluno', {idR, name})}>
                          <View style={styles.fundoEscola}>
                            <View style={{padding:18, flex: 1}}>
                              <Text style={{fontSize:17, marginBottom:2, fontFamily:'AileronH'}}>{item.nome}</Text>
                              <Text style={{fontSize:14, fontFamily:'AileronR'}}>{filhos} filho</Text>
                            </View>  
                              <View style={{flex: 1, justifyContent:'flex-end', flexDirection:'row'}}>
                                <View style={{justifyContent:'center', marginRight:'10%'}}>
                                  <TouchableOpacity onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + '+55' + item.telefone)}>
                                    <FontAwesome name="whatsapp" size={24} color="black" />
                                  </TouchableOpacity>
                                </View>
                              </View>
                          </View>
                        </TouchableOpacity>
                      )
                    }
                    else{
                    return (
                        <TouchableOpacity style={styles.botaoEscola} onPress={()=> navigation.navigate('AddAlunos', {idR, filhos})}>
                          <View style={styles.fundoEscola}>
                            <View style={{padding:18, flex: 1}}>
                              <Text style={{fontSize:17, marginBottom:2, fontFamily:'AileronH'}}>{item.nome}</Text>
                              <Text style={{fontSize:14, fontFamily:'AileronR'}}>{filhos} filhos</Text>
                            </View>  
                              <View style={{flex: 1, justifyContent:'flex-end', flexDirection:'row'}}>
                                <View style={{justifyContent:'center', marginRight:'10%'}}>
                                  <TouchableOpacity onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + '+55' + item.telefone)}>
                                    <FontAwesome name="whatsapp" size={24} color="black" />
                                  </TouchableOpacity>
                                </View>
                              </View>
                          </View>
                        </TouchableOpacity>
                    );
                    }
                })}
            
    
          </View>      
        </View>
      );
}

