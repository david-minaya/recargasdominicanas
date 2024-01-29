package com.recargasdominicanas.app

import android.os.Bundle
import com.getcapacitor.BridgeActivity
import com.recargasdominicanas.app.plugins.UpdatePlugin

class MainActivity : BridgeActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(PrinterPlugin::class.java)
        registerPlugin(PushNotification::class.java)
        registerPlugin(UpdatePlugin::class.java)
        super.onCreate(savedInstanceState)
    }
}
