/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text, TouchableHighlight,
  View, Platform, PermissionsAndroid
} from 'react-native';
import Calling from './Calling'
import QuickbloxManager from './QuickbloxManager'
import ContactList from './ContactList';
import VideoCalling from './VideoCalling';

export default class TestLibQuickblox extends Component {

  constructor(props) {
    super()

    this.state = {
      calling: false
    }

    this.quickbloxManager = new QuickbloxManager(this)
    this.quickbloxManager.init()

    Platform.OS === 'android' && requestPermissions()
  }

  receiveCall() {
    this.setState({calling: true})
  }

  render() {
    return !this.state.calling ? <ContactList callUser={() => {
      this.setState({calling: true})
    }}/>
      : <VideoCalling/>
  }
}

function requestPermissions() {
  try {
    return PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.PROCESS_OUTGOING_CALLS,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.CALL_PHONE]
    )
  } catch (err) {
    console.warn(err)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  callDetails: {
    flex: 3,
    backgroundColor: '#6969'
  },
  userVideo: {
    position: 'absolute',
    bottom: 1,
    right: 0,
    width: 80,
    height: 120,
    backgroundColor: 'green',
    overflow: 'hidden'
  },
  callButtonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonContainer: {
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30
  },
  iconTitle: {
    alignItems: 'center',
    fontSize: 15,
    alignSelf: 'center'
  }
});

AppRegistry.registerComponent('TestLibQuickblox', () => TestLibQuickblox);
