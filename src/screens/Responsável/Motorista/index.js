import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from './style'
import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';
import { List } from 'react-native-paper';

export default function Motorista ({route, navigation}) {
    const [rec, setRec] = useState('');
    const [escolas, setEscolas] = useState([])
    const [showElement, setShowElement] = useState(false)
    const [contrato, setContrato] = useState(false)
    const [cidades, setCidades] = useState([])
    const Item = ({item}) => (
        <View>
            <List.Item title={item} />
        </View>
      );

      const renderItem = ({item}) => {
      
        return (
          <Item
            item={item}
          />
        );
      }

    useEffect(()=>{
        pegarDados()
    }, [])


    const pegarDados=()=>{
        onAuthStateChanged(auth, async(user)=>{
            const docRefM = doc(db, 'responsavel', user.uid)
            await getDoc(docRefM).then(async(snapshot2)=>{
                console.log(snapshot2.data())
                if(snapshot2.data().motorista != '' && snapshot2.data().motorista != undefined && snapshot2.data().motorista != null){
                    setContrato(true)
                    const moto = snapshot2.data().motorista
                    const docRef = doc(db, 'motorista', moto)
                    await getDoc(docRef).then((snapshot)=>{
                        setRec(snapshot.data())
                        setEscolas(snapshot.data().escola)
                        setCidades(snapshot.data().cidade)
                    })
                }
            })
        })
        
    }
    if(!rec){
        pegarDados()
        return(
            <View style={styles.container}>
              <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
              <View style={{ marginTop:'13%', justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                      <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
                  </TouchableOpacity>
                  <View style={{ justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:18, fontFamily:'AileronH'}}>Motorista</Text>
                  </View>
              </View>
    
          <View style={styles.fundoTab2}>
            <View style={{height:'10%', width:'50%'}}>
              <Image
                source={require('../../../../assets/avan.png')}
                style={{width:'100%', height:'100%'}}
              />
            </View>
            <View style={{marginTop:'3%'}}>
              <Text style={{fontSize:18, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>Oops! Ainda não há</Text>
              <Text style={{fontSize:18, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>nenhum motorista</Text>
              <Text style={{fontSize:18, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>contratado.</Text>
            </View>
            <View style={styles.viewBotao}>
                <TouchableOpacity style={styles.botaoContratar} onPress={()=>navigation.navigate('Pesquisar')}>
                    <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                    <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Contratar</Text>
                </TouchableOpacity> 
            </View>   
          </View>      
        </View>
        )
      }
      else{
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'13%', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                    <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'AileronH'}}>{rec.nome}</Text>
                </View>
            </View>
            <View style={styles.fundoTab}>
                <View style={styles.fundoTel}>
                    <View style={{paddingHorizontal:15, paddingRight:135}}>
                        <Text style={{fontSize:17, marginBottom:2, fontWeight:'bold'}}>{rec.telefone}</Text>
                    </View>
                    <View style={{position:'absolute', paddingLeft:235}}>
                        <TouchableOpacity onPress={()=>Linking.openURL('whatsapp://send?phone=' + rec.telefone)}>
                            <FontAwesome name="whatsapp" size={28} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <List.Section style={{width:'100%', justifyContent:'center', paddingHorizontal:'5%'}}>
                {escolas?(
                        <List.Accordion
                        theme={{colors: {background: 'white', primary:'black'}}}
                        style={styles.accordion}
                        title="Escolas"
                        left={(props) => <List.Icon {...props} icon="school" />}>
                            <FlatList
                                data={escolas}
                                renderItem={renderItem}
                            />
                        </List.Accordion>
                    ):null}
                    {cidades? (
                        <List.Accordion
                        theme={{colors: {background: 'white', primary:'black'}}}
                        style={styles.accordion}
                        title="Cidades"
                        left={(props) => <List.Icon {...props} icon="city" />}>
                            <FlatList
                                data={cidades}
                                renderItem={renderItem}
                            />
                        </List.Accordion>
                    ):null}
                </List.Section>
                
            </View>
        </View>
    )}
}