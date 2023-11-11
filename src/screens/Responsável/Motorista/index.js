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
        onAuthStateChanged(auth, async(user)=>{
            const docRefM = doc(db, 'responsavel', user.uid)
            await getDoc(docRefM).then(async(snapshot2)=>{
                const moto = snapshot2.data().motorista
                const docRef = doc(db, 'motorista', moto)
                await getDoc(docRef).then((snapshot)=>{
                    setRec(snapshot.data())
                    setEscolas(snapshot.data().escola)
                })
            })
        })
    }, [])
    if(!rec || !escolas){
        return(
            <Text>não tem</Text>
        )
    }

    return(
        <View style={styles.container}>
          <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                  <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
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
                </List.Section>
                
            </View>
        </View>
    )
}