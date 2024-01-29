package com.recargasdominicanas.app

class PushNotificationListener {

    companion object {

        lateinit var newTokenListener: (token: String) -> Unit
        lateinit var newNotificationListener: () -> Unit

        fun onNewToken(cb: (token: String) -> Unit) {
            this.newTokenListener = cb;
        }

        fun onNewNotification(cb: () -> Unit) {
            this.newNotificationListener = cb
        }
    }
}
