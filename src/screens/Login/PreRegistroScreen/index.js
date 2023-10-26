import React from 'react';
import {View, Text, Image, TouchableOpacity,} from 'react-native'
import styles from './style'


// CUUU PINTO BUCETA

export default function PreReg ({navigation}) {
  return(
    <View style={{flex:1, backgroundColor: 'white'}}>
      <View style={styles.inner}>
          <View style={styles.tela}>
              <Image source={require('../../../../assets/logo.png')} style={styles.logo}/>

              <Text style={[styles.connect, {fontFamily: 'AileronH'}]}>Connect</Text>
              <Text style={styles.van}>Van</Text>
          </View>
        <View style={{flexDirection:'row', paddingVertical:10, width:'100%', paddingHorizontal:20, gap:10}}>
          <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('cadastroResponsavel')}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
            <View style={{position:'absolute', alignItems: 'center'}}>
              <Image source={require('../../../../assets/users.png')} style={styles.icon}/>
              <Text style={{fontFamily:'AileronR', fontSize:14}}>Responsável</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('cadastroMotorista')}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
            <View style={{position:'absolute', alignItems: 'center'}}>
              <Image source={require('../../../../assets/driver.png')} style={styles.icon}/>
              <Text style={{fontFamily:'AileronR', fontSize:14}}>Motorista</Text>
            </View>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  )
}