import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, Header, Image, Button } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerH: {
    marginLeft: 'auto', 
    marginRight: 'auto',
    // width: 200, height: 200,
  },
  centerV: {
    marginTop: 'auto', 
    marginBottom: 'auto',
    // width: 200, height: 200,
  },
  whiteText: {
    color: 'white',
    fontFamily: 'ethnocentric rg',
  }
});

const Screen = (props) => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  var profileImg = require ('./assets/home-profile.png');
  var batteryImg = require ('./assets/home-battery.png');
  return (
    <SafeAreaProvider>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => props.navigation.toggleDrawer(),
          }}
          centerComponent={{ text: props.title, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          containerStyle={{ borderBottomWidth:0 }}
          backgroundColor="#50455A"
        />
        <View style={{ flex: 4, justifyContent: 'center', backgroundColor: "#0F1837" }}>
          <Image 
            source={profileImg}
            containerStyle= {[ styles.centerH, { width: 190, height: 200 } ]}
          />
          <Text style={[ styles.centerH, styles.whiteText ]}>Kevin Kuo</Text>
          <Text style={[ styles.centerH, styles.whiteText ]}>1999/05/31</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', backgroundColor: "#7D7080", padding: 20 }}>
          <Image 
            source={batteryImg}
            containerStyle= {[ styles.centerV, { width: 60, height: 120 } ]}
          />
          <Text style={[ styles.centerV, styles.whiteText, {padding: 30} ]}>100%</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: "#6F1B32" }}>
          
        </View>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#0F1837" }}>
        </View>
      </SafeAreaProvider>
  );
}

const Drawer = (props) => {
  return (
    <View>
      <MyHeader navigation={props.navigation} title="Settings" />
      <Text>This is Settings Screen</Text>
    </View>
  )
}

function App() {
  return (
    <Screen title="SYSTEM"/>
  );
}

export default App;
