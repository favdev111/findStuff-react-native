# find-stuff-app

# design

https://org.modao.cc/app/cbcc45733afb052cfb083f105bcce28c#screen=s59869B75281555836197914

# build release version guide

1. android/app/build.gradle
   1. bundleInRelease: true
   2. enableHermes: false
2. command
   1. react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
3. android/app/src/main/res/
   1. delete drawable\*, raw directories
4. command
   1. cd android
   2. ./gradlew assembleRelease
5. android/app/build/outputs/apk/release
   1. could find release version apk.
6. What parts consumed my valuable times
   1. trial to remove unused packages from package.json, you may try it after build successfully.
      1. in my guess, it occurs import path error, still can't find correct reason, but was painful for me.
   2. enableHermes: true, this is the really bad option to set true.
   3. mis deleting mipmap directories, absolutely don't delete!
   4. mis setting of bundleInRelease: true, remember, never forgot!
   5. don't modify some app functions, it makes the problem more difficult.
      1. this project, i modified BottomNavTab, and didn't test it's behavior, so eventually modified again like the start point.
7. Happy coding!

# ssl setting guide

1. yarn add react-native-ssl-pinning@latest
2. openssl s_client -showcerts -connect 211.149.180.81:8000
3. Copy the certificate (Usally the first one in the chain), and paste it using nano or other editor like so , nano mycert.pem
4. convert it to .cer with this command openssl x509 -in mycert.pem -outform der -out mycert.cer
5. iOS > drag mycert.cer to Xcode project, mark your target and 'Copy items if needed'
   Android > Place your .cer files under src/main/assets/.

# ios settings

brew install openssl

- cd /usr/local/include

ln -s ../opt/openssl/include/openssl

-cd ios

pod deintegrate
pod install

======================================================================================================================

- periodical background notificatioin
- continuos connect, disconnect to the server
- test message list, detail
- add report logic
- ... ... ..

---

- get sha1
  keytool -list -v -keystore .\findstuff.keystore -alias findstuffkey -storepass 123456 -keypass 123456

-amap setting url
https://lbs.amap.com/dev/key/app

==========================================================================================================================

amap get geolocation result

- ios: {"accuracy": 65, "altitude": 185, "direction": -1, "errorCode": 0, "latitude": 42.89453993055555, "longitude": 129.4887163628472, "speed": -1, "timestamp": 1583439289955.162}
- android: {"accuracy": 30, "adCode": "222401", "address": "吉林省延边朝鲜族自治州延吉市白松街 983 号靠近中国邮政储蓄银行(天池路支行)", "altitude": 0, "city": "延边朝鲜族自治州", "cityCode": "1433", "coordinateType": "GCJ02", "country": "中国", "description": "在中国邮政储蓄银行(天池路支行)附近", "district": "延吉市", "errorCode": 0, "errorInfo": "success", "gpsAccuracy": -1, "heading": 0, "latitude": 42.894413, "locationDetail": "#csid:8dfb513c425442d9af4b34f4e4907133", "locationType": 2, "longitude": 129.488622, "poiName": "中国邮政储蓄银行(天池路支行)", "province": "吉林省", "speed": 0, "street": "白松街", "streetNumber": "983 号", "timestamp": 1583439587769, "trustedLevel": 1}

@@@@@Geolocation.watchPosition@@@@

- ios:

{"coords": {"accuracy": 65, "altitude": 185, "altitudeAccuracy": null, "heading": undefined, "latitude": 42.89454535590278, "longitude": 129.4887060546875, "speed": -1}, "location": {"accuracy": 65, "altitude": 185, "direction": -1, "errorCode": 0, "latitude": 42.89454535590278, "longitude": 129.4887060546875, "speed": -1, "timestamp": 1583450616951.642}, "timestamp": 1583450616951.642}

- android:

{"coords": {"accuracy": 30, "altitude": 0, "altitudeAccuracy": null, "heading": 0, "latitude": 42.894421, "longitude": 129.488655, "speed": 0}, "location": {"accuracy": 30, "adCode": "222401", "address": "吉林省延边朝鲜族自治州延吉市白松街 559 号靠近中国邮政储蓄银行(天池路支行)", "altitude": 0, "city": "延边朝鲜族自治州", "cityCode": "1433", "coordinateType": "GCJ02", "country": "中国", "description": "在中国邮政储蓄银行(天池路支行)附近", "district": "延吉市", "errorCode": 0, "errorInfo": "success", "gpsAccuracy": -1, "heading": 0, "latitude": 42.894421, "locationDetail": "#csid:a72997666be54094acb3a9def0d64ba2", "locationType": 2, "longitude": 129.488655, "poiName": "中国邮政储蓄银行(天池路支行)", "province": "吉林省", "speed": 0, "street": "白松街", "streetNumber": "559 号", "timestamp": 1583449755267, "trustedLevel": 1}, "timestamp": 1583449755267}
