import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from './style'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, collectionGroup, query, where, getDocs} from 'firebase/firestore';

export default function EscolasMotorista ({route, navigation}) {
    const [escolas, setEscolas]=useState([]);
    const [passageiros, setPassageiros] = useState('')
    const a = []
    useEffect(()=>{
      navigation.addListener('focus', () => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const docRef = doc(db, 'motorista', user.uid)
            const snapshot = await getDoc(docRef)
            setEscolas(snapshot.data().escola)
          }
        //   escolas.forEach(async(item)=>{
        //     const q = query(collectionGroup(db, 'passageiros'), where('escola','==', item))
        //     const queryy = await getDocs(q)
        //     const alunos = []
        //       queryy.forEach((aluno) => {
        //           alunos.push(aluno.id) 
        //       })
        //     a.push(alunos.length)
        // });
        // setPassageiros(a)
        // console.log(passageiros)
        });
    },[])
  },[]) 

// if(passageiros == null || a == null){
//   return null
// }
  return (
    <View style={styles.container}>
      
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
            <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
          </TouchableOpacity>
          <View style={{ justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH'}}>Escolas</Text>
        </View>
      </View>

      <View style={styles.fundoTab}>
        {escolas?(
          <View style={{width:'100%', alignItems:'center'}}>
            <Text style={{fontSize:18, fontFamily:'AileronH', marginVertical:'5%'}}>
              TODAS ({escolas.length})
            </Text>
            {escolas.map((item, index) => {
                const esc = item
                return (
                  <TouchableOpacity style={styles.botaoEscola} onPress={()=>navigation.navigate('PassageirosE', {esc})}>
                    <View style={styles.fundoEscola}>
                      <View style={{paddingVertical:20, paddingLeft:20}}>
                        <Text style={styles.nome}>{item}</Text>
                        {/* <Text style={styles.passageiros}>{passageiros[index]} passageiros</Text> */}
                      </View>
                      <View style={{flex: 1, justifyContent:'flex-end', flexDirection:'row'}}>
                        <View style={{justifyContent:'center', marginRight:'10%'}}>
                          <TouchableOpacity>
                            <Entypo name="chevron-right" size={24} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
            })}
          </View>
        ):(
          <Text style={{fontSize:18, fontFamily:'AileronH', marginVertical:'5%'}}>
              TODAS (0)
            </Text>
        )}
       <View style={styles.viewBotao}>
          <View style={{flexDirection:'row', justifyContent:'flex-end', padding: '10%'}}>
            <TouchableOpacity style={styles.botaoAdd} onPress={()=>navigation.navigate('EditarE')}>
                <FontAwesome5 name="pencil-alt" size={17} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}