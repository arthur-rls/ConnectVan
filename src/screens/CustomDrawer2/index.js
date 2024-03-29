import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import styles from './style'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {db, auth} from '../../firebase/config';
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';

export default function CustomDrawer({props, navigation}){
    const [rec, setRec] = useState('')
    useEffect(()=>{
        navigation.addListener('focus', () => {
        onAuthStateChanged(auth, async(user)=>{
            if(user){
                    const docRef = doc(db, 'resposanvel', user.uid)
                    const snapshot = await getDoc(docRef)
                    setRec(snapshot.data());
            }
        })
    })
    },[])
    if(!rec){
        return null
    }
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{}}>

                <View style={styles.container}>
                        <View style={styles.viewMae}>
                            <TouchableOpacity>
                                <Image
                                source={require('../../../assets/Logo-branca.png')}
                                style={styles.imagem}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.nome}>{rec.nome}</Text> 
                                <Text style={styles.email}>{rec.email}</Text> 
                            </View>
                        </View>
                </View>

                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    );
};