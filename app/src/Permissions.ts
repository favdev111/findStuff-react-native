import {Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings';
async function requestCamPermission() {
  await request(
    PERMISSIONS.ANDROID.CAMERA,
    // {
    //   title: '申请权限',
    //   message: '权限已被拒绝，请进入应用程序设置，开启权限。',
    //   buttonNeutral: '等再问我',
    //   buttonNegative: '拒绝',
    //   buttonPositive: '允许',
    // }
  ).then(result => {
    console.log(11111, result);
  });
}

async function requestLibPermission() {
  await request(
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    // {
    //   title: '申请权限',
    //   message: '权限已被拒绝，请进入应用程序设置，开启权限。',
    //   buttonNeutral: '等再问我',
    //   buttonNegative: '拒绝',
    //   buttonPositive: '允许',
    // }
  ).then(result => {
    console.log(11111, result);
  });
}

async function requestLocationPermission() {
  await request(
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    // {
    //   title: '申请权限',
    //   message: '权限已被拒绝，请进入应用程序设置，开启权限。',
    //   buttonNeutral: '等再问我',
    //   buttonNegative: '拒绝',
    //   buttonPositive: '允许',
    // }
  ).then(result => {
    console.log(11111, result);
  });
}

async function checkPermissions(opt) {
  let ps_opt;
  if (opt === 'location') ps_opt = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
  else if (opt === 'camera') ps_opt = PERMISSIONS.ANDROID.CAMERA;
  else if (opt === 'read_library')
    ps_opt = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  else if (opt === 'write_library')
    ps_opt = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

  let ret = check(ps_opt)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            '申请权限',
            '您的手机无法成功运行该应用程序的功能。',
            [{text: '知道', onPress: () => console.log('OK Pressed111')}],
            {cancelable: true},
          );
          break;
        case RESULTS.DENIED:
        case RESULTS.BLOCKED:
          Alert.alert(
            '申请权限',
            '权限已被拒绝，请进入应用程序设置，开启权限。',
            [
              {
                text: '现在设置',
                onPress: () => AndroidOpenSettings.appDetailsSettings(),
              },
              {
                text: '稍后设置',
                onPress: () => console.log('alert closed'),
              },
            ],
            {cancelable: true},
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
      }
      return result;
    })
    .catch(error => {
      console.log('check error...', error);
      return 'x';
    });
  return ret;
}

async function checkCamLibPermission() {
  await requestCamPermission();
  let cam_ret = await checkPermissions('camera');
  if (cam_ret !== RESULTS.GRANTED) {
    console.log('camera grant is ', cam_ret);
    return false;
  }

  await requestLibPermission();
  let lib_ret = await checkPermissions('read_library');
  if (lib_ret !== RESULTS.GRANTED) {
    console.log('read_library grant is ', lib_ret);
    return false;
  } else {
    return true;
  }
}

export {
  requestCamPermission,
  requestLibPermission,
  requestLocationPermission,
  checkPermissions,
  checkCamLibPermission,
};
