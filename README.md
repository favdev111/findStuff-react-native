  ### Run App
	1. Go to /app
	2. react-native start
	3. react-native run-android
	4. for installing app in real android device for debug, generate debug.keystore file by runing this command
		"keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000"
	5. for building app, need findStuff.keystore file
	6. all info for debug.keystore and findStuff.keystore is put in app/android/app/
	7. build release apk
      cd android
      gradlew assembleRelease
   	8. get amap key for get location
	   https://lbs.amap.com/
	   follow this guide
	   	https://lbs.amap.com/api/android-location-sdk/guide/create-project/get-key
		 
