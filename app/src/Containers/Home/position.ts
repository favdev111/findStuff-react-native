import {
    init,
    Geolocation,
    setAllowsBackgroundLocationUpdates,
  } from 'react-native-amap-geolocation';
  
  export async function geolocationInit() {
    await init({
      ios: '099b23712ab62b8704c42b256553d6dd',
      android: '7c09f30df0777beee6f441252b0fa1f2',
    });
  
    setAllowsBackgroundLocationUpdates(true);
  }
  
  export function getCurrentPosition() {
    Geolocation.getCurrentPosition(position =>
      console.log('current position is ... ', position),
    );
  }
  
  export function watchPosition() {
    Geolocation.watchPosition(position =>
      console.log('current watch position is ... ', position),
    );
  }
  