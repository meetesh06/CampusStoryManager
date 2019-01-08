package com.campusstorymanager;
import android.app.Activity;
import android.content.Intent;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.github.hiteshsondhi88.libffmpeg.ExecuteBinaryResponseHandler;
import com.github.hiteshsondhi88.libffmpeg.FFmpeg;
import com.github.hiteshsondhi88.libffmpeg.LoadBinaryResponseHandler;
import com.github.hiteshsondhi88.libffmpeg.exceptions.FFmpegCommandAlreadyRunningException;
import com.github.hiteshsondhi88.libffmpeg.exceptions.FFmpegNotSupportedException;

import net.alhazmy13.mediapicker.Video.VideoPicker;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.app.Activity.RESULT_OK;

public class MkaerVideoPicker extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private Promise mPickerPromise;
    private FFmpeg ffmpeg;
    private static final String E_PICKER = "PICKER_FAILED_TO_COMPLETE";
    private static final String E_COMPRESS = "FAILED_TO_COMPRESS";

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == VideoPicker.VIDEO_PICKER_REQUEST_CODE && resultCode == RESULT_OK) {
                List<String> mPaths =  intent.getStringArrayListExtra(VideoPicker.EXTRA_VIDEO_PATH);
                try {
                    // the uri
                    String uri = mPaths.get(0);
                    MediaMetadataRetriever retriever = new MediaMetadataRetriever();
                    // get duration
                    retriever.setDataSource(getCurrentActivity(), Uri.parse(uri));
                    String time = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION);
                    // make a json to send
                    JSONObject data = new JSONObject();
                    data.put("uri", uri);
                    data.put("duration", time);

                    mPickerPromise.resolve(data.toString());
                } catch (Exception e) {
                    mPickerPromise.reject(E_PICKER, e.toString());
                }
            }
        }
    };

    public MkaerVideoPicker(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "MkaerVideoPicker";
    }

    @ReactMethod
    public void openPicker(final Promise promise) {
        mPickerPromise = promise;
        ffmpeg = FFmpeg.getInstance(getCurrentActivity());
        try {
            ffmpeg.loadBinary(new LoadBinaryResponseHandler() {

                @Override
                public void onStart() {}

                @Override
                public void onFailure() {}

                @Override
                public void onSuccess() {}

                @Override
                public void onFinish() {}
            });
        } catch (FFmpegNotSupportedException e) {
            // Handle if FFmpeg is not supported by device
            Log.d("MENIME", e.toString());
        }

        new VideoPicker.Builder(getCurrentActivity())
            .mode(VideoPicker.Mode.CAMERA_AND_GALLERY)
            .directory(VideoPicker.Directory.DEFAULT)
            .extension(VideoPicker.Extension.MP4)
            .enableDebuggingMode(false)
            .build();
    }

    @ReactMethod
    public void compress(final Promise promise) {
    }

    private void execFFmpegBinary(String[] command, String uriCompressed){
        try {

            ffmpeg.execute(command, new ExecuteBinaryResponseHandler() {

                @Override
                public void onStart() {
                    Log.d("Event ", "onStart");
                }

                @Override
                public void onProgress(String message) {
                    Log.e("Event ", "onProgress - " + message);

                }

                @Override
                public void onFailure(String message) {
                    Log.e("Event ", "onFailure - " + message);

                }

                @Override
                public void onSuccess(String message) {
                    Log.e("Event ", "onSuccess - " + message);

                }

                @Override
                public void onFinish() {
                    Log.e("Event ", "onFinish");
                    mPickerPromise.resolve(uriCompressed);

                }
            });
        } catch (FFmpegCommandAlreadyRunningException e) {
            // Handle if FFmpeg is already running
            Log.d("MENIME", e.toString());
        }
    }

}