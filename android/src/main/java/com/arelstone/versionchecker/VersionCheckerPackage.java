package com.arelstone.versionchecker;

import java.utils.Arrays;
import java.utils.Collections;
import java.utils.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class VersionCheckerPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext){
    return Arrays.<NativeModule>asList(new VersionCheckerModule(reactContext));
  }

  public List<Class<? extends JavaScriptModule>>  createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
