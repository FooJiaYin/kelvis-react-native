import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { ThemeProvider, Header, Image, Tile, Button } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-root-toast';
import { useFonts } from 'expo-font';

// export default props => {
//   let [fontsLoaded] = useFonts({
//     'ethnocentric-rg': require('./assets/ethnocentric-rg.ttf'),
//   });

//   if (!fontsLoaded) {
//     return (
//       <View></View>
//     );
//   } else {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontFamily: 'ethnocentric-rg', fontSize: 40 }}>Inter Black</Text>
//         <Text style={{ fontSize: 40 }}>Platform Default</Text>
//       </View>
//     );
//   }
// };

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
  rightBorder: {
    borderRightColor: '#ffffff30', 
    borderRightWidth: 2,
  },
  bottomBorder: {
    borderBottomColor: 'white', 
    borderBottomWidth: 2,
  },
  whiteText: {
    color: 'white',
    fontFamily: 'ethnocentric-rg',
  },
  textOnImage: {
    position: 'absolute', 
    justifyContent: 'center', 
    alignItems: 'center', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0
  },
});

const SpeedImage = () => {
  return(
    <View style={{ flex: 1 }}>
      <View style={[ styles.textOnImage ]}>
        <Image 
          source={ require ('./assets/dashboard-speed.png') }
          containerStyle= {[ styles.centerH, { width: 250, height: 250 } ]}
        />
      </View>
      <View style={[ styles.textOnImage ]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 60, height: 57 } ]}>60</Text>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 12 } ]}>  km/h</Text>
        </View>
        <View style={{ height: 60}}></View>
      </View>
    </View>
  );
}

const Screen1 = () => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  var locked = true;
  var closed = true;
  return (    
    <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
      <View style={{ flex: 4, justifyContent: 'center'}}>
        <Image 
          source={ require ('./assets/home-profile.png') }
          containerStyle= {[ styles.centerH, { width: 190, height: 200 } ]}
        />
        <Text style={[ styles.centerH, styles.whiteText, { fontSize: 18 } ]}>Kevin Kuo</Text>
        <Text style={[ styles.centerH, styles.whiteText, { fontSize: 12 } ]}>1999/05/31</Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', backgroundColor: "#7D7080", padding: 20 }}>
        <Image 
          source={ require ('./assets/home-battery.png') }
          containerStyle= {[ styles.centerV, { width: 60, height: 120 } ]}
        />
        <Text style={[ styles.centerV, styles.whiteText, {padding: 30, fontSize: 48} ]}>100%</Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: "#6F1B32" }}>
        <View style={[ styles.rightBorder, { flex: 1, justifyContent: 'center'} ]}>
          <Image 
            source={ require ('./assets/home-lock.png') }
            containerStyle= {[ styles.centerH, { width: 60, height: 80 } ]}
            onPress={() => {
              locked = !locked;
              var message = (locked)? "Locked" : "Unlocked";
              let toast = Toast.show(message, {
                duration: 500,
                position: Toast.positions.CENTER,
                delay: 800,                  
              });
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Image 
            source={ require ('./assets/home-back.png') }
            containerStyle= {[ styles.centerH, { width: 90, height: 62 } ]}
            onPress={() => {
              closed = !closed;
              var message = (closed)? "Closed" : "Opened";
              let toast = Toast.show(message, {
                duration: 500,
                position: Toast.positions.CENTER,
                delay: 800,                  
              });
            }}
          />      
        </View>    
      </View>
      <View style={{ flex: 1 }}>
      </View>  
    </View>
  );
}

const Screen2 = () => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  return (    
    <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
      <View style={{ flex: 4 }}>   
        <SpeedImage />
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <View style={[ styles.bottomBorder, { flexDirection: 'row', alignItems: 'flex-end', flex: 1 } ]}>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 32, height: 38 } ]}>35</Text>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 12, height: 20 } ]}>  km/h</Text>
        </View>
        <Text style={[ styles.centerH, styles.whiteText, { fontSize: 10, flex: 2 } ]}>RANGE</Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: "#7D7080" }}>
        <View style={[ styles.rightBorder, { flex: 1, justifyContent: 'center' } ]}>
          <Image 
            source={ require ('./assets/dashboard-repair.png') }
            containerStyle= {[ styles.centerH, { width: 90, height: 90 } ]}
            onPress={() => {
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Image 
            source={ require ('./assets/dashboard-map.png') }
            containerStyle= {[ styles.centerH, { width: 90, height: 90 } ]}
            onPress={() => {
            }}
          />      
        </View>    
      </View>
      <View style={{ flex: 1 }}>
      </View>  
    </View>
  );
}

const Screen3 = () => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  const CheckItem = (props) => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#7D7080", 
        marginBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'space-between', 
        alignItems: 'center', 
      }}>
        <Text style= {[ styles.whiteText, { fontSize: 28 } ]}>
          { props.text }
        </Text>
        <Image 
          source={ require ('./assets/diagnostics-tick.png') }
          containerStyle= {[ { width: 30, height: 30 } ]}
        />
      </View>
    );
  }
  return (    
    <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
      <View style={{ flex: 1 }}>          
        <View style={[ styles.textOnImage ]}>
          <Image 
            source={ require ('./assets/diagnostics-eye.png') }
            containerStyle= {[ styles.centerH, { width: 250, height: 250 } ]}
          />
        </View>
        <View style={[ styles.textOnImage ]}>
          <View style={{ height: 140}}></View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={[ styles.centerH, styles.whiteText, { fontSize: 24 } ]}> 100%</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginBottom: 20}}>
        <CheckItem text="MOTOR" />
        <CheckItem text="BRAKE" />
        <CheckItem text="BATTERY" />
        <CheckItem text="HEADLAMP" />
      </View> 
    </View>
  );
}

const Screen4 = () => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  var eyeImg = require ('./assets/diagnostics-eye.png');
  const WhiteLine = () => {
    return (      
      <View style={[  { height: 2, width: 50, backgroundColor: 'white', marginTop: 10} ]}></View>
    );
  }
  var img1 = require('./assets/status-1.png');
  var img2 = require('./assets/status-2.png');
  var img3 = require('./assets/status-3.png');
  var img4 = require('./assets/status-4.png');
  const StatusItem = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={[ styles.textOnImage ]}>
            <Image 
              source={ props.img }
              containerStyle= {[ styles.centerH, { width: 140, height: 140 } ]}
            />
          </View>
          <View style={[ styles.textOnImage ]}>
            <View style={{ }}>
              <Text style={[ styles.centerH, styles.whiteText, { fontSize: 40} ]}>{ props.number }</Text>
              <Text style={[ styles.centerH, styles.whiteText, { fontSize: 12 } ]}>{ props.unit }</Text>
            </View>
            <View style={{ height: props.offset }}></View>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Text style={[ styles.whiteText, { fontSize: 8 } ]}>{ props.text }</Text>
        <WhiteLine />
        </View>
      </View>
    );
  }
  return (    
    <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
      <View style={{ flex: 2 }}>          
        <SpeedImage />
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <Text style={ styles.whiteText }>AVERAGE</Text>
        <WhiteLine />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20}}>
        <StatusItem img={img1} offset={0} number='32' unit='KM' text="MILEAGE OF THE DAY" />
        <StatusItem img={img2} offset={0} number='74' unit='KM' text="MILEAGE OF THE MONTH" />
      </View> 
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 40}}>
        <StatusItem img={img3} offset={30} number='90' unit='KM/H' text="HIGHEST SPEED" />
        <StatusItem img={img4} offset={30} number='105' unit='AH' text="ELECTRICITY USAGE" />
      </View> 
    </View>
  );
}

const Screen5 = () => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  return (    
    <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>   
      <Image 
          source={ require ('./assets/dashboard-speed.png') }
          containerStyle= {[ styles.centerH, { width: 300, height: 300 } ]}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 16 }]}>LIGHTS COLOR</Text>
      </View>
      <View style={{ flex: 3, backgroundColor: "#7D7080", marginBottom: 50 }}>
        <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[ styles.whiteText, { fontSize: 12 }]}>CHOOSE TO CHANGE THE LIGHTS</Text>
          <View style={[ {height: 2, width: 80, backgroundColor: 'white', marginTop: 7} ]}></View>
        </View>
        <View style={{ flex: 4, flexDirection: 'row'}}>
          <View style={[ { flex: 1, justifyContent: 'center' } ]}>
            <Image 
              source={ require ('./assets/dashboard-repair.png') }
              containerStyle= {[ styles.centerH, { width: 90, height: 90 } ]}
              onPress={() => {
              }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Image 
              source={ require ('./assets/dashboard-map.png') }
              containerStyle= {[ styles.centerH, { width: 90, height: 90 } ]}
              onPress={() => {
              }}
            />      
          </View>    
        </View>
      </View>
    </View>
  );
}

const Appbar = (props) => {
  return (
    <Header
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        onPress: () => {}// props.navigation.toggleDrawer(),
      }}
      centerComponent={{ text: props.title, style: [ styles.whiteText, { fontSize: 18 } ] }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      containerStyle={{ borderBottomWidth:0 }}
      backgroundColor="#50455A"
    />
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
  let [fontsLoaded] = useFonts({
    'ethnocentric-rg': require('./assets/ethnocentric-rg.ttf'),
  });
  if (!fontsLoaded) {
    return (
      <View></View>
    );
  } else {
    return (
      <SafeAreaProvider>
        {/* <Appbar title="18:05"/>
        <Screen1 /> */}
        {/* <Appbar title="DASHBOARD"/>
        <Screen2 /> */}
        {/* <Appbar title="DIAGNOSTICS"/>
        <Screen3 /> */}
        {/* <Appbar title="RIDING STATUS"/>
        <Screen4 /> */}
        <Appbar title="CUSTOMIZE"/>
        <Screen5 />
      </SafeAreaProvider>
    );
  }
}

export default App;
