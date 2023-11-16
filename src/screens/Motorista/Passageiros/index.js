import { Text, SafeAreaView, View, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import { Entypo, FontAwesome} from '@expo/vector-icons';
import styles from './style'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';

export default function Passageiros({navigation, route}) {
    const alunos = []
    const [passageiros, setPassageiros] = useState([])
    

    useEffect(()=>{
        pesquisa()
        
    }, [])
    const pesquisa =async()=>{
      onAuthStateChanged(auth, async(user)=>{
        const q = query(collection(db, 'motorista', user.uid, 'passageiros'), where('escola','!=', ''))
      
        const queryy = await getDocs(q)
        queryy.forEach((aluno) => {
            alunos.push(aluno.data())
        })
        setPassageiros(alunos)
        console.log(passageiros)
      })
    }

    return (
  
      <View style={styles.container}>
        <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
        <View style={{ marginTop:'13%', justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
              <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
            </TouchableOpacity>
            <View style={{ justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:18, fontFamily:'AileronH'}}>Passageiros</Text>
          </View>
        </View>
        <ScrollView style={styles.fundoTab} contentContainerStyle={{alignItems:'center',}}>
          <Text style={{fontSize:18, fontFamily:'AileronH', marginVertical:'5%'}}>
            TODOS ({passageiros.length})
          </Text>
            {passageiros.map((item)=>{
                const idA = item.nome;
                const resp = item.responsavel
                return(
                <TouchableOpacity style={styles.botaoEscola} onPress={()=>navigation.navigate('InfoAluno', {idA, resp})}>
                  <View style={styles.fundoEscola}>
                    <View style={{padding:18, flexDirection:'row', alignItems:'center'}}>
                      <Image
                        source={{uri:'https://cdn-icons-png.flaticon.com/512/5987/5987462.png'}}      
                        style={{height:45,width:45}}
                      />
                      <Text style={styles.nome}>{item.nome}</Text>
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
              )
            })}
        </ScrollView>    
      </View>
    );
  }