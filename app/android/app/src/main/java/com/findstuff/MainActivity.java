package com.findstuff;

import com.facebook.react.ReactActivity;
// import com.facebook.react.ReactActivityDelegate;
// import com.facebook.react.ReactRootView;
// import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FindStuff";
    }
    
    // @Override
    // protected ReactActivityDelegate createReactActivityDelegate() {
    //     return new ReactActivityDelegate(this, getMainComponentName()) {
    //         @Override
    //         protected ReactRootView createRootView() {
    //             return new RNGestureHandlerEnabledRootView(MainActivity.this);
    //         }
    //     };
    // }


    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     super.onCreate(savedInstanceState);
    //     // setContentView(R.layout.activity_main);

    //     Intent intent = new Intent();

    //     String manufacturer = android.os.Build.MANUFACTURER;

    //     switch (manufacturer) {

    //         case "xiaomi":
    //             intent.setComponent(new ComponentName("com.miui.securitycenter",
    //                     "com.miui.permcenter.autostart.AutoStartManagementActivity"));
    //             break;
    //         case "oppo":
    //             intent.setComponent(new ComponentName("com.coloros.safecenter",
    //                     "com.coloros.safecenter.permission.startup.StartupAppListActivity"));

    //             break;
    //         case "vivo":
    //             intent.setComponent(new ComponentName("com.vivo.permissionmanager",
    //                     "com.vivo.permissionmanager.activity.BgStartUpManagerActivity"));
    //             break;
    //     }

    //   List<ResolveInfo> arrayList =  getPackageManager().queryIntentActivities(intent, PackageManager.MATCH_DEFAULT_ONLY);

    //     if (arrayList.size() > 0) {
    //         startActivity(intent);
    //     }
    // }
}
