package com.recargasdominicanas.app

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.firebase.messaging.FirebaseMessaging

@CapacitorPlugin(name = "PushNotification")
class PushNotification: Plugin() {

    override fun load() {

        PushNotificationListener.onNewNotification {
            notifyListeners("newNotification", null)
        }

        PushNotificationListener.onNewToken {
            notifyListeners("newToken", JSObject().apply { put("token", it) })
        }
    }

    @PluginMethod
    fun getCurrentToken(call: PluginCall) {
        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                call.resolve(JSObject().apply { put("value", task.result) })
            }
        }
    }
}
