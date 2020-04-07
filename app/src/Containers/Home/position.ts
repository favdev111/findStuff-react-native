import {
    init,
    Geolocation,
    setAllowsBackgroundLocationUpdates,
  } from 'react-native-amap-geolocation';
  
  export async function geolocationInit() {
    await init({
      ios: '099b23712ab62b8704c42b256553d6dd',
      // android: '947a5d4e754678580ed3d0cdb40764d6',    //debug-key
      android: '0db0a0a54cd10b52b586386861e6425e',        //release-key
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
  