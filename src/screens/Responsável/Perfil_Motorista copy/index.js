import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from './style'
import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';

export default function Motorista ({route, navigation}) {
    const [rec, setRec] = useState('');
    const [escolas, setEscolas] = useState([])
    const [showElement, setShowElement] = useState(false)

    const Item = ({item}) => (
        <View>
            <Text style={{fontSize:20}}>{item}</Text>
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
        <View style={{paddingVertical:50}}>
            <Text style={{fontSize:20}}>{rec.nome}</Text>
            <Text style={{fontSize:20}}>{rec.telefone}</Text>
            <FlatList
                data={escolas}
                renderItem={renderItem}
            />
        </View>
    )
}