
/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package co.appsolution.abbott;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.*;
import org.apache.cordova.api.CordovaPlugin;

public class Abbott extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("loadUrlTimeoutValue", 60000); // timeout
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")
    }
    
    @Override
    protected void onResume() {
       Log.v("APP", "onResume");
       super.onResume();
    }

    @Override
    protected void onActivityResult(int reqCode, int resCode, Intent intent) {
       try {
          CordovaPlugin callback = this.activityResultCallback;
          //callback is 03-05 12:22:46.469: V/APP(29747): callback: org.apache.cordova.CameraLauncher@42606760 when is ok
          if (intent != null) {
             Log.v("APP", "INTENT: " + intent);
             if (intent.getData() != null) {
                Log.v("APP", "INTENT DATA: " + intent.getData());
                if (callback != null) {
                   super.onActivityResult(reqCode, resCode, intent);
                }
                else{
                   //TODO: Find a solution when callback is null
                   return;
                }
             }
          }
          super.onActivityResult(reqCode, resCode, intent);
       } catch (Error e) {
          e.printStackTrace();
       }
    }
}


/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package co.appsolution.abbott;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.*;
import org.apache.cordova.api.CordovaPlugin;

public class Abbott extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("loadUrlTimeoutValue", 60000); // timeout
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")
    }
    
    @Override
    protected void onResume() {
       Log.v("APP", "onResume");
       super.onResume();
    }

    @Override
    protected void onActivityResult(int reqCode, int resCode, Intent intent) {
       try {
          CordovaPlugin callback = this.activityResultCallback;
          //callback is 03-05 12:22:46.469: V/APP(29747): callback: org.apache.cordova.CameraLauncher@42606760 when is ok
          if (intent != null) {
             Log.v("APP", "INTENT: " + intent);
             if (intent.getData() != null) {
                Log.v("APP", "INTENT DATA: " + intent.getData());
                if (callback != null) {
                   super.onActivityResult(reqCode, resCode, intent);
                }
                else{
                   //TODO: Find a solution when callback is null
                   return;
                }
             }
          }
          super.onActivityResult(reqCode, resCode, intent);
       } catch (Error e) {
          e.printStackTrace();
       }
    }
}

