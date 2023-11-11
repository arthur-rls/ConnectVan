import LoginScreen from './Login/LoginScreen/index'
import PreRegistroScreen from './Login/PreRegistroScreen/index'
import CadastroMotoristaScreen from './Login/Registro/Motorista/CadastroScreen/index'
import InfoMotoristaScreen from './Login/Registro/Motorista/InformacoesScreen/index'
import CadastroResponsavelScreen from './Login/Registro/Responsavel/CadastroScreen/index'
import AlunoCadastroScreen from './Login/Registro/Responsavel/AlunoScreen/index'
import HomeRotaMotoristaScreen from './Motorista/HomeRota/index'
import HomeMotoristaScreen from './Motorista/Home/index'
import Pedidos from './Motorista/Pedidos_Contratacao/index'
import AddAluno from './Motorista/Add_Aluno/index'
import AddAluno2 from './Motorista/Add_Aluno/index2'
import AddAlunos from './Motorista/Add_Alunos/index'
import AddMensalidade from './Motorista/Add_Mensalidade/index'
import AddMensalidades from './Motorista/Add_Mensalidade/index2'
import Escolas from './Motorista/Escolas/index'
import Cidades from './Motorista/Cidades/index'
import EditarEscolas from './Motorista/Editar_escolas/index'
import EditarCidades from './Motorista/Editar_cidades/index'
import PassageirosEscola from './Motorista/Passageiros_Escola/index'
import InfoAluno from './Motorista/Info_Aluno/index'
import InfoAluno2 from './Motorista/Info_Aluno/index2'
import Passageiros from './Motorista/Passageiros/index'
import SplashScreen from './SplashScreen/index'
import EditarPerfilM from './Motorista/Editar_perfil/index'
import Mensalidades from './Motorista/Mensalidade/index'
import HomeResponsavel from './Responsável/Home/index'
import MensalidadeR from './Responsável/Mensalidade/index'
import PassageiroR from './Responsável/Passageiros/index'
import AddPassageiro from './Responsável/AlunoScreen/index'
import TelaAluno from './Responsável/Passageiro/index'
import Pesquisa from './Responsável/Pesquisar/index'
import PerfilMoto from './Responsável/Perfil_Motorista/index'
import EditarPerfilR from './Responsável/Perfil/index'
import Acompanhar from './Responsável/Acompanhar/index'
import Motorista from './Responsável/Motorista/index'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign, FontAwesome5, FontAwesome, Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import CustomDrawer from './CustomDrawer/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerM() {
    return (
      <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />} 
      screenOptions={{
        drawerActiveBackgroundColor:'#bdbdbd',
        drawerActiveTintColor:'white',
        drawerInactiveTintColor:'#808080',
        drawerLabelStyle: {marginLeft:-15},
        headerShown:false,
      }}>
        <Drawer.Screen 
          name="Home" 
          component={HomeMotoristaScreen} 
          options={{
            drawerIcon: ({ color, size }) => <AntDesign name='home' color={color} size={24} marginLeft={7} />,
          }}
        />
        <Drawer.Screen 
          name="Mensalidades" 
          component={Mensalidades}
          options={{
            drawerIcon: ({ color, size }) => <FontAwesome5 name='money-bill-wave' color={color} size={18} marginLeft={7} />,
          }}
        />
        <Drawer.Screen 
          name="Passageiros" 
          component={Passageiros} 
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name='ios-school' color={color} size={24} marginLeft={7} />,
          }}
        />
        <Drawer.Screen 
          name="Cidades" 
          component={Cidades} 
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name='location-sharp' color={color} size={24} marginLeft={7} />,
          }}
        />
        <Drawer.Screen 
          name="Escolas" 
          component={Escolas} 
          options={{
            drawerIcon: ({ color, size }) => <FontAwesome5 name='school' color={color} size={20} marginLeft={6} />,
          }}
        />
        <Drawer.Screen 
          name="Perfil" 
          component={EditarPerfilM} 
          options={{
            drawerIcon: ({ color, size }) => <FontAwesome5 name='user-alt' color={color} size={22} marginLeft={10} />,
          }}
        />
      </Drawer.Navigator>
    );
  }

  function DrawerR(){
    return(
    <Drawer.Navigator 
    drawerContent={props => <CustomDrawer {...props} />} 
    screenOptions={{
      drawerActiveBackgroundColor:'#bdbdbd',
      drawerActiveTintColor:'white',
      drawerInactiveTintColor:'#808080',
      drawerLabelStyle: {marginLeft:-15},
      headerShown:false,
    }}>
      <Drawer.Screen 
        name="Home" 
        component={HomeResponsavel} 
        options={{
          drawerIcon: ({ color, size }) => <AntDesign name='home' color={color} size={24} marginLeft={7} />,
        }}
      />
      <Drawer.Screen 
        name="Mensalidades" 
        component={MensalidadeR}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome5 name='money-bill-wave' color={color} size={18} marginLeft={7} />,
        }}
      />
      <Drawer.Screen 
        name="Passageiros" 
        component={PassageiroR} 
        options={{
          drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="bag-personal" color={color} size={24} marginLeft={7} />,
        }}
      />
      <Drawer.Screen 
        name="Motorista" 
        component={Motorista} 
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name='drivers-license' color={color} size={20} marginLeft={7} />,
        }}
      />
      <Drawer.Screen 
        name="Perfil" 
        component={EditarPerfilR} 
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome5 name='user-alt' color={color} size={20} marginLeft={10} />,
        }}
      />
    </Drawer.Navigator>
    )
  }

export default function Rotas({navigation}){
    return(
        <Stack.Navigator useLegacyImprementation screenOptions={{title:'', headerShown:false}}>
            <Stack.Screen name='splash' component={SplashScreen}/>
            <Stack.Screen name='login' component={LoginScreen}/>
            <Stack.Screen name='drawerM' component={DrawerM}/>
            <Stack.Screen name='drawerR' component={DrawerR}/>
            <Stack.Screen name='preRegistro' component={PreRegistroScreen}/>
            <Stack.Screen name='cadastroMotorista' component={CadastroMotoristaScreen}/>
            <Stack.Screen name='infoMotorista' component={InfoMotoristaScreen}/>
            <Stack.Screen name='cadastroResponsavel' component={CadastroResponsavelScreen}/>
            <Stack.Screen name='alunoCadastro' component={AlunoCadastroScreen}/>
            <Stack.Screen name='AddAluno' component={AddAluno}/>
            <Stack.Screen name='AddAluno2' component={AddAluno2}/>
            <Stack.Screen name='AddAlunos' component={AddAlunos}/>
            <Stack.Screen name='AddMensalidade' component={AddMensalidade}/>
            <Stack.Screen name='AddMensalidades' component={AddMensalidades}/>
            <Stack.Screen name='HomeRotaMotorista' component={HomeRotaMotoristaScreen}/>
            <Stack.Screen name='EditarE' component={EditarEscolas}/>
            <Stack.Screen name='EditarC' component={EditarCidades}/>
            <Stack.Screen name='PassageirosE' component={PassageirosEscola}/>
            <Stack.Screen name='InfoAluno' component={InfoAluno}/>
            <Stack.Screen name='InfoAluno2' component={InfoAluno2}/>
            <Stack.Screen name='Pedidos' component={Pedidos}/>
            <Stack.Screen name='AddPassageiro' component={AddPassageiro}/>
            <Stack.Screen name='TelaAluno' component={TelaAluno}/>
            <Stack.Screen name='Pesquisar' component={Pesquisa}/>
            <Stack.Screen name='PerfilMotorista' component={PerfilMoto}/>
            <Stack.Screen name='Acompanhar' component={Acompanhar}/>
        </Stack.Navigator>
    )
}