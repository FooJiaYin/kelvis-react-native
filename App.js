import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Alert, Linking, Animated, PanResponder } from 'react-native';
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
  imageStyle: {
    width: null, 
    height: null, 
    resizeMode: 'contain' 
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
  ringStyle: {
    flex: 1,
    aspectRatio: 1, 
    borderWidth: 15, 
    borderRadius: 1000, 
    position: 'absolute'
  }
});

class Appbar extends Component {
  title = "";

  state = {
    date: new Date(),
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    if (this.props.title == 'clock') {
      var h = ('0' + this.state.date.getHours()).slice(-2);
      var m = ('0' + this.state.date.getMinutes()).slice(-2);
      if (h.length < 2) {h = "0" + h;}
      if (m.length < 2) {m = "0" + m;}
      this.title = h + ':' + m;
    }
    else {
      this.title = this.props.title;
    }
    return (
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => this.props.navigation.toggleDrawer(),
        }}
        centerComponent={{ text: this.title, style: [ styles.whiteText, { fontSize: 18 } ] }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={{ borderBottomWidth:0 }}
        backgroundColor="#50455A"
      />
    );
  }
}

class Clock extends Component {  
  state = {
    date: new Date(),
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    var h = ('0' + this.state.date.getHours()).slice(-2);
    var m = ('0' + this.state.date.getMinutes()).slice(-2);
    if (h.length < 2) {h = "0" + h;}
    if (m.length < 2) {m = "0" + m;}
    return (
      <Text style={this.props.style}>{h + ':' + m}</Text>
    );
  }
}

class AnimatedNumber extends Component {
  state = {
    number: 0
  };

  finalValue = 0;
  duration = 5;

  componentDidMount() {   
    if(this.props.initialValue) {
      this.state.number = Number(this.props.initialValue);
      this.setState({ number: Number(this.props.initialValue) })
    }
    this.finalValue = Number(this.props.finalValue);
    this.duration = Number(this.props.duration) * 100;
    const interval = Number(this.props.duration) * 100 / Math.abs(this.finalValue - this.state.number);
    // console.log(interval);
    this.count = setInterval(
      () => {
        if( this.state.number < this.finalValue)
          this.setState({ number: this.state.number + 1 });
        if( this.state.number > this.finalValue)
          this.setState({ number: this.state.number - 1 });
        // else this.reset();
      },
      interval
    );
  }

  reset() {
    this.setState({ number: 0 });
  }

  componentWillUnmount() {
    this.reset();
    clearInterval(this.count);
  }

  render() {
    return (
      <Text style={this.props.style}>{this.props.prefix}{this.state.number}{this.props.postfix}</Text>
    );
  }
}

const SpeedImage = () => {
  return(
    <View style={{ flex: 1 }}>
      <View style={[ styles.textOnImage ]}>
        <Image 
          source={ require ('./assets/dashboard-speed.png') }
          style={ styles.imageStyle }
          containerStyle= {[ styles.centerH, { width: '80%', height: '90%' } ]}
        />
      </View>
      <View style={[ styles.textOnImage ]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <AnimatedNumber style={[ styles.centerH, styles.whiteText, { fontSize: 60, height: 57 } ]} finalValue='60' duration='10'/>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 12 } ]}>  km/h</Text>
        </View>
        <View style={{ height: 60}}></View>
      </View>
    </View>
  );
}

const HomeScreen = ({ navigation }) => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  var locked = true;
  var closed = true;
  return (       
    <SafeAreaProvider> 
      <Appbar title="clock" navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
        <View style={{ flex: 4, justifyContent: 'center'}}>
          <View style={{ flex: 5, justifyContent: 'center'}}>
            <Image 
              source={ require ('./assets/home-profile.png') }
              style={ styles.imageStyle }
              containerStyle= {[ styles.centerH, { width: '80%', height: '90%' } ]}
            />
          </View>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 18 } ]}>Kevin Kuo</Text>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 12, paddingBottom: 20 } ]}>1999/05/31</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: "#7D7080", paddingLeft: '10%', paddingRight: '10%' }}>
          <Image 
            source={ require ('./assets/home-battery.png') }
            style={ styles.imageStyle }
            containerStyle= {[ styles.centerV, { flex: 1, width: '80%', height: '70%' } ]}
          />
          <AnimatedNumber style={[ styles.centerV, styles.whiteText, {flex: 2, paddingLeft: '10%', paddingRight: '10%', fontSize: 45} ]} finalValue='100' postfix='%' duration='10'/>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: "#6F1B32" }}>
          <View style={[ styles.rightBorder, { flex: 1, justifyContent: 'center'} ]}>
            <Image 
              source={ require ('./assets/home-lock.png') }
              style={ styles.imageStyle }
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
              style={ styles.imageStyle }
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
    </SafeAreaProvider>
  );
}

const DashboardScreen = ({ navigation }) => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  return ( 
    <SafeAreaProvider> 
      <Appbar title="DASHBOARD" navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
        <View style={{ flex: 4 }}>   
          <SpeedImage />
        </View>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <View style={[ styles.bottomBorder, { flexDirection: 'row', alignItems: 'flex-end', flex: 1 } ]}>
            <AnimatedNumber style={[ styles.centerH, styles.whiteText, { fontSize: 32, height: 38 } ]} initialValue='45' finalValue='0' duration='10' />
            <Text style={[ styles.centerH, styles.whiteText, { fontSize: 12, height: 20 } ]}>  km/h</Text>
          </View>
          <Text style={[ styles.centerH, styles.whiteText, { fontSize: 10, flex: 2 } ]}>RANGE</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: "#7D7080" }}>
          <View style={[ styles.rightBorder, { flex: 1, justifyContent: 'center' } ]}>
            <Image 
              source={ require ('./assets/dashboard-repair.png') }
              style={ styles.imageStyle }
              containerStyle= {[ styles.centerH, { width: 90, height: 90 } ]}
              onPress={() => {
                Linking.openURL("https://www.google.com/maps/search/%E6%A9%9F%E8%BB%8A%E7%B6%AD%E4%BF%AE");
              }}
              />
          </View>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Image 
              source={ require ('./assets/dashboard-map.png') }
              style={ styles.imageStyle }
              containerStyle= {[ styles.centerH, { width: 90, height: 90 } ]}
              onPress={() => {
                Linking.openURL("https://www.google.com/maps/");
              }}
            />      
          </View>    
        </View>
        <View style={{ flex: 1 }}>
        </View>  
      </View>
    </SafeAreaProvider>
  );
}

const DiagnosticsScreen = ({ navigation }) => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  const CheckItem = (props) => {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: "#7D7080", 
          marginBottom: 5,
          paddingLeft: '10%',
          paddingRight: '10%',
          justifyContent: 'space-between', 
          alignItems: 'center', 
        }}>
          <Text style= {[ styles.whiteText, { fontSize: 28 } ]}>
            { props.text }
          </Text>
          <Image 
            source={ require ('./assets/diagnostics-tick.png') }
            style={ styles.imageStyle }
            containerStyle= {[ { width: 30, height: 30 } ]}
          />
        </View>
    );
  }
  return (   
    <SafeAreaProvider> 
      <Appbar title="DIAGNOSTICS" navigation={navigation} /> 
      <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
        <View style={{ flex: 1 }}>          
          <View style={[ styles.textOnImage ]}>
            <Image 
              source={ require ('./assets/diagnostics-eye.png') }
              style={ styles.imageStyle }
              containerStyle= {[ styles.centerH, { width: '80%', height: '90%' } ]}
            />
          </View>
          <View style={[ styles.textOnImage ]}>
            <View style={{ height: 140}}></View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <AnimatedNumber style={[ styles.centerH, styles.whiteText, { fontSize: 24 } ]} finalValue='100' postfix='%' duration='10' />
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
    </SafeAreaProvider>
  );
}

const RidingStatusScreen = ({ navigation }) => {
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
                style={ styles.imageStyle }
                containerStyle= {[ styles.centerH, { width: '100%', height: '100%' } ]}
              />
            </View>
            <View style={[ styles.textOnImage ]}>
              <View style={{ }}>
                <AnimatedNumber style={[ styles.centerH, styles.whiteText, { fontSize: 40} ]} finalValue={ props.number } duration='5'/>
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
    <SafeAreaProvider> 
      <Appbar title="RIDING STATUS" navigation={navigation} /> 
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
    </SafeAreaProvider>
  );
}


class ColorPicker extends Component {
  radius = 0;
  last_x = 0;
  last_y = 0;
  current_x = 0;
  current_y = 0;
  angle = new Animated.Value(0);
  // state.angle = new Animated.Value(0);
  pan = new Animated.ValueXY();  
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      this.current_x = this.last_x + this.pan.x._value;
      this.current_y = this.last_y + this.pan.y._value;
      this.angle = Math.atan(this.current_x / this.current_y);
      if(this.current_y >= 0) this.angle = Math.PI * 3/2 - this.angle;
      else this.angle = Math.PI /2 - this.angle;
      this.props.callback(this.props.id, this.angle, Math.sqrt(Math.pow(this.current_x, 2) + Math.pow(this.current_y, 2)) / this.radius);
      // console.log(Math.sqrt(Math.pow(this.current_x, 2) + Math.pow(this.current_y, 2)));
      // console.log(this.current_x, this.current_y, Math.cos(this.angle), Math.sin(this.angle));
      // console.log(this.pan.x, this.pan.y);
      // console.log(this.color);
      Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y }
      ], {useNativeDriver: false})(evt, gestureState);
    },
    onPanResponderRelease: () => {
      if(Math.sqrt(Math.pow(this.current_x, 2) + Math.pow(this.current_y, 2)) > this.radius) {
        // console.log("OVer!!");
        this.current_x = -Math.cos(this.angle) * this.radius;
        this.current_y = -Math.sin(this.angle) * this.radius;
        this.pan.x.setValue(this.current_x - this.last_x);
        this.pan.y.setValue(this.current_y - this.last_y);
        // console.log(this.pan.x, this.pan.y);
      }
      this.pan.flattenOffset();
      this.last_x = this.current_x;
      this.last_y = this.current_y;
      // console.log(this.pan.x, this.pan.y);
    }
  });

  setRadius(layout) {
    const {x, y, width, height} = layout;
    this.radius = Math.min(width, height) / 2;
    // console.log(layout, this.radius);
  }



  render() {
    var color = this.angle.interpolate({
        inputRange: [0, Math.PI/2],
        outputRange: ['hsla(0, 100%, 50%, 0.3)',  'hsla(360, 100%, 50%, 0.3)']
    });
    // console.log("Render " + color);
    return (
      <View style={[ { flex: 1, justifyContent: 'center', width: '80%', height: '80%' } ]}>
        <Image 
          source={ require ('./assets/customize-color.png') }
          style={ styles.imageStyle }
          containerStyle= {[ styles.centerH, { width: '100%', height: '100%'} ]}
          onLayout={(event) => { this.setRadius(event.nativeEvent.layout); } }
        />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Animated.View
            style={{ transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }] }} {...this.panResponder.panHandlers}>
            <View style={{ height: 50, width: 50, backgroundColor: "hsla(360, 0%, 100%, 0.3)", borderRadius: 100}} />
          </Animated.View>
        </View>
      </View>
    );
  }
}

class ChooseColor extends Component { 
  state = {
    diameter1 : new Animated.Value(0),
    diameter2 : new Animated.Value(0),
    color1 : new Animated.Value(Math.PI/3),
    color2 : new Animated.Value(Math.PI/3),
    opacity1: new Animated.Value(0),
    opacity2: new Animated.Value(0),
  }

  updateColor = (id, angle, opacity) => {
    var newColor = "hsla(" + (angle * 180 / Math.PI).toString() + ", 100%, 50%, 1.0)";
    if (id == '1') {
      this.state.color1.setValue(angle);
      this.state.opacity1.setValue(Math.min(opacity, 1));
    }
    if (id == '2') {
      this.state.color2.setValue(angle);
      this.state.opacity2.setValue(Math.min(opacity, 1));
    }
    // console.log(id, opacity);    
  };

  setSize = (layout) => {
    const {x, y, width, height} = layout;
    while(!this.state.diameter1 || !this.state.diameter2);
    this.state.diameter1.setValue(Math.min(width, height) * 0.7 - 29);
    this.state.diameter2.setValue(Math.min(width, height) * 0.7);
  }

  render()  {
    return( 
      <View style={{ flex: 1, backgroundColor: "#0F1837" }}> 
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}
          onLayout={(event) => { this.setSize(event.nativeEvent.layout); } }>   
            <Animated.View style={[ {height: this.state.diameter1, width: this.state.diameter1, borderColor: 'white' }, styles.ringStyle, styles.centerH, styles.centerV ]} />
            <Animated.View style={[ {height: this.state.diameter1, width: this.state.diameter1, opacity: this.state.opacity1,
              borderColor: this.state.color1.interpolate({
                inputRange: [0, Math.PI/3, Math.PI*2/3, Math.PI, Math.PI*4/3, Math.PI*5/3, Math.PI*2],
                outputRange: ['rgb(255, 0, 0)',  'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(0, 0, 255)', 'rgb(255, 0, 255)', 'rgb(255, 0, 0)'] }) }, 
                styles.ringStyle, styles.centerH, styles.centerV ]} />
            <Animated.View style={[ {height: this.state.diameter2, width: this.state.diameter2, borderColor: 'white' }, styles.ringStyle, styles.centerH, styles.centerV ]} />
            <Animated.View style={[ {height: this.state.diameter2, width: this.state.diameter2, opacity: this.state.opacity2,
              borderColor: this.state.color2.interpolate({
                inputRange: [0, Math.PI/3, Math.PI*2/3, Math.PI, Math.PI*4/3, Math.PI*5/3, Math.PI*2],
                outputRange: ['rgb(255, 0, 0)',  'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(0, 0, 255)', 'rgb(255, 0, 255)', 'rgb(255, 0, 0)'] }) }, 
                styles.ringStyle, styles.centerH, styles.centerV ]} />
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
            <ColorPicker id='1' callback={ this.updateColor }/>   
            <ColorPicker id='2' callback={ this.updateColor }/>   
          </View>
        </View>
      </View>
    );
  }
}

const CustomizeScreen = ({ navigation }) => {
  // Image.prefetch("https://i.picsum.photos/id/744/200/300.jpg");
  // const ColorPicker = () => {
  //   return (
  //     <View style={[ { flex: 1, justifyContent: 'center', width: '80%', height: '80%' } ]}>
  //       <Image 
  //         source={ require ('./assets/customize-color.png') }
  //         style={ styles.imageStyle }
  //         containerStyle= {[ styles.centerH, { width: '100%', height: '100%'} ]}
  //         onPress={() => {
  //         }}
  //       />
  //       <Dragable />
  //     </View>
  //   );
  // }
  return (   
    <SafeAreaProvider> 
      <Appbar title="CUSTOMIZE" navigation={navigation} />  
      <ChooseColor />
    </SafeAreaProvider>
  );
}

function DrawerComponent (props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#6C6070" }}> 
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          // onPress: () => props.navigation.toggleDrawer(),
        }}
        centerComponent={{ text: "SYSTEM", style: [ styles.whiteText, { fontSize: 18 } ] }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={{ borderBottomWidth:0 }}
        backgroundColor="#938995"
      />     
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>   
        <Image 
          source={ require ('./assets/drawer-profile.png') }
          containerStyle= {[ styles.centerH, { width: 180, height: 180, marginBottom: 20 } ]}
        />
        <Text style={[ styles.centerH, styles.whiteText, { fontSize: 20 } ]}>Kevin Kuo</Text>
        <Text style={[ styles.centerH, styles.whiteText, { fontSize: 16 } ]}>1999/05/31</Text>
      </View>
      
      <View style={{ flex: 5 }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}  
            itemStyle={{
              // flex: 1,
              // flexDirection: 'row',
              backgroundColor: "#B1A9B1", 
              // height: '20%',
              marginBottom: 5,
              // paddingTop: 10,
              // paddingBottom: 10,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              borderRadius: 0,
              justifyContent: 'center', 
              // alignItems: 'center', 
            }} 
            labelStyle={[{ color: '#3F3B3A', fontFamily: 'ethnocentric-rg', fontSize: 20, marginLeft: 'auto', marginRight: 'auto', paddingRight: 0 } ]} /> 
          </DrawerContentScrollView>
        </View> 
      </View>
  )
}

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator(); 

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
      <NavigationContainer>
          {/* <Drawer.Navigator initialRouteName="Drawer" drawerContent="DrawerComponent"> */}
          <Drawer.Navigator drawerContent={props => <DrawerComponent {...props} /> }  style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: "#B1A9B1", 
            marginBottom: 5,
            paddingLeft: 50,
            paddingRight: 50,
            justifyContent: 'center', 
            alignItems: 'center', 
          }}>
            {/* <Drawer.Screen name="Drawer" component={DrawerComponent} /> */}
            {/* <Drawer.Screen name="Box" component={Dragable} /> */}
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name="Diagnostics" component={DiagnosticsScreen} />
            <Drawer.Screen name="Riding Status" component={RidingStatusScreen} />
            <Drawer.Screen name="Customize" component={CustomizeScreen} />
            {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
          </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
