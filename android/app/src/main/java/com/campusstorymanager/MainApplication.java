package com.campusstorymanager;

import android.app.Application;
import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;
import com.BV.LinearGradient.LinearGradientPackage; // <--- This!
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactlibrary.RNVideoHelperPackage;
import com.brentvatne.react.ReactVideoPackage;
//import com.vydia.RNUploader.UploaderReactPackage;

//public class MainApplication extends Application implements ReactApplication {
//
//  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
//    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
//    }
//
//    @Override
//    protected List<ReactPackage> getPackages() {
//      return Arrays.<ReactPackage>asList(
//          new MainReactPackage(),
//            new VectorIconsPackage()
//      );
//    }
//
//    @Override
//    protected String getJSMainModuleName() {
//      return "index";
//    }
//  };
//
//  @Override
//  public ReactNativeHost getReactNativeHost() {
//    return mReactNativeHost;
//  }
//
//  @Override
//  public void onCreate() {
//    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
//  }
//}
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import

import net.alhazmy13.mediapicker.Video.VideoPicker;

import static android.app.Activity.RESULT_OK;

public class MainApplication extends NavigationApplication implements OnImagePickerPermissionsCallback {
    private PermissionListener listener; // <- add this attribute

    @Override
                public void setPermissionListener(PermissionListener listener)
                {
                this.listener = listener;
                }

                @Override
                public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
                {
                if (listener != null)
                {
                listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
                }
                super.onRequestPermissionsResult(requestCode, permissions, grantResults);
                }
            @Override
    protected ReactGateway createReactGateway() {
            ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                        return "index";
                    }
        };
            return new ReactGateway(this, isDebug(), host);
        }

            @Override
    public boolean isDebug() {
            return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
     // Add additional packages you require here
            // No need to add RnnPackage and MainReactPackage
                       return Arrays.<ReactPackage>asList(
                                 new LinearGradientPackage()
                                ,new VectorIconsPackage()
                                ,new FastImageViewPackage()
                                ,new ImagePickerPackage()
                                ,new RNVideoHelperPackage()
                                ,new ReactVideoPackage()
//                                ,new UploaderReactPackage()
                                ,new MkaerVideoPickerPackage()
                    );
        }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
            return getPackages();
        }

}