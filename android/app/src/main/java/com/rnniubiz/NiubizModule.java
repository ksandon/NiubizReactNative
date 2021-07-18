package com.rnniubiz;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

import lib.visanet.com.pe.visanetlib.VisaNet;
import lib.visanet.com.pe.visanetlib.data.custom.Channel;
import lib.visanet.com.pe.visanetlib.presentation.custom.VisaNetViewAuthorizationCustom;

public class NiubizModule extends ReactContextBaseJavaModule {

    private Promise resultPromise;
    String TAG = "NIUBIZ";

    NiubizModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(activityEventListener);
    }

    @NonNull
    @Override
    public String getName() {
        return "NiubizModule";
    }

    @ReactMethod
    public void openNiubizForm(ReadableMap map, Promise promise) {

        Map<String, Object> data = new HashMap<>();
        data.put(VisaNet.VISANET_CHANNEL, Channel.MOBILE);
        data.put(VisaNet.VISANET_COUNTABLE, true);
        data.put(VisaNet.VISANET_SECURITY_TOKEN, map.getString("token"));
        data.put(VisaNet.VISANET_MERCHANT, map.getString("merchant"));
        data.put(VisaNet.VISANET_PURCHASE_NUMBER, map.getString("purchase"));
        data.put(VisaNet.VISANET_AMOUNT, Double.parseDouble(map.getString("amount")));
        data.put(VisaNet.VISANET_REGISTER_NAME, map.getString("name"));
        data.put(VisaNet.VISANET_REGISTER_LASTNAME, map.getString("lastname"));
        data.put(VisaNet.VISANET_REGISTER_EMAIL, map.getString("email"));

        data.put(VisaNet.VISANET_ENDPOINT_URL, map.getString("endpoint"));
        data.put(VisaNet.VISANET_CERTIFICATE_HOST, map.getString("endpoint"));
        data.put(VisaNet.VISANET_CERTIFICATE_PIN, map.getString("pin"));

        VisaNetViewAuthorizationCustom custom = new VisaNetViewAuthorizationCustom();
        resultPromise = promise;

        try {
            VisaNet.authorization(getCurrentActivity(), data, custom);
        }
        catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    private final ActivityEventListener activityEventListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == VisaNet.VISANET_AUTHORIZATION) {
                if (data != null) {
                    if (resultCode == Activity.RESULT_OK) {
                        String response = data.getExtras().getString("keySuccess");
                        resultPromise.resolve(response);
                    } else {
                        String response = data.getExtras().getString("keyError");
                        resultPromise.resolve(response);
                    }
                }
            }
        }

        @Override
        public void onNewIntent(Intent intent) {}
    };

}
