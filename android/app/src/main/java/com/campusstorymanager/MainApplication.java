package com.campusstorymanager;

import android.app.Application;
import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import io.realm.react.RealmReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;
import com.BV.LinearGradient.LinearGradientPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactlibrary.RNVideoHelperPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;

import net.alhazmy13.mediapicker.Video.VideoPicker;

import static android.app.Activity.RESULT_OK;

public class MainApplication extends NavigationApplication implements OnImagePickerPermissionsCallback {
    private PermissionListener listener;

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
        return Arrays.<ReactPackage>asList(
                    new LinearGradientPackage()
                ,new VectorIconsPackage()
                ,new FastImageViewPackage()
                ,new ImagePickerPackage()
                ,new RNVideoHelperPackage()
                ,new ReactVideoPackage()
                ,new BlurViewPackage()
                ,new RNFetchBlobPackage()
                ,new MkaerVideoPickerPackage()
                ,new RNFileViewerPackage()
                ,new RealmReactPackage()
    );
        }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
            return getPackages();
        }

}