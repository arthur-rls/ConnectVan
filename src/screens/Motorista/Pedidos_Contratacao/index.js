import { Text, SafeAreaView, View, TouchableOpacity, Linking,Image } from 'react-native';

import { Entypo, FontAwesome} from '@expo/vector-icons';
import styles from './style'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc} from 'firebase/firestore';


export default function Pedidos ({navigation}) {
    const [arr, setArr] = useState([]);
    const [soli, setSoli]=useState([]);
    const dataArray = []
    const [mensagem, setmensagem] = useState('')
    const [nomeM, setNomeM] = useState('')
    
    

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista' , user.uid)
                const snapshot = await getDoc(docRef)
                setSoli(snapshot.data().solicitacao)
                setNomeM(snapshot.data().nome)
                setmensagem(`Olá, sou o motorista ${nomeM} desejo conversar sobre os valores do transporte.`)
                
                for(const id of soli){
                    const docRefUser = doc(db, 'responsavel', id);
                    try {
                        const docSnapshot = await getDoc(docRefUser);
                        const dado = docSnapshot.data();
                        const idResponsavel = id;
                        dataArray.push({idResponsavel, ...dado})
                        
                    } catch (error) {
                        console.error('erro');
                    }
                } 
                setArr(dataArray)
            }
            
        });
    }, [mensagem])


    if(!soli){
        return(
          <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'12%', justifyContent:'center', marginBottom:'2%', flexDirection:'column'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{flex:1,position:'absolute'}}>
                <Entypo name="chevron-left" size={29} color="black" style={styles.iconMenu}/>
              </TouchableOpacity>
              <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18, fontFamily:'AileronH'}}>Pedidos de Contratação</Text>
              </View>
            </View>
          <View style={styles.fundoTab}>
            <Text style={{fontFamily:'AileronH', fontSize:30, marginTop:'10%'}}>Nenhum pedido no momento</Text>
          </View>      
        </View> 
        )
    }
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'12%', justifyContent:'center', marginBottom:'2%', flexDirection:'column'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{flex:1,position:'absolute'}}>
          <Entypo name="chevron-left" size={29} color="black" style={styles.iconMenu}/>
        </TouchableOpacity>
        <View style={{ justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH'}}>Pedidos de Contratação</Text>
        </View>
      </View>
      <View style={styles.fundoTab}>
        <Text style={{fontSize:18, fontFamily:'AileronH', marginTop:'5%'}}>
          TODOS ({arr.length})
        </Text>
        {arr.map((item) => {
                const filhos = item.nomeAluno.length
                const idR = item.idResponsavel;
                const key = 0;
                if(filhos == 1){
                  return(
                    <TouchableOpacity style={styles.botaoEscola} onPress={()=> navigation.navigate('AddAluno', {idR, key})}>
                      <View style={styles.fundoEscola}>
                        <View style={{padding:18, flex: 1}}>
                          <Text style={{fontSize:17, marginBottom:2, fontFamily:'AileronH'}}>{item.nome}</Text>
                          <Text style={{fontSize:14, fontFamily:'AileronR'}}>{filhos} filho</Text>
                        </View>  
                          <View style={{flex: 1, justifyContent:'flex-end', flexDirection:'row'}}>
                            <View style={{justifyContent:'center', marginRight:'10%'}}>
                              <TouchableOpacity onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + item.telefone)}>
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
                              <TouchableOpacity onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + item.telefone)}>
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

