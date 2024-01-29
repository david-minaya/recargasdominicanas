package com.recargasdominicanas.app.plugins

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.webkit.CookieManager
import androidx.core.content.FileProvider
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.recargasdominicanas.app.BuildConfig
import com.recargasdominicanas.app.R
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import kotlin.math.roundToInt

@CapacitorPlugin(name = "UpdatePlugin")
class UpdatePlugin: Plugin() {

    private lateinit var file: File

    override fun load() {
        file = File(this.context.getExternalFilesDir(null), "recargasdominicanas.apk")
    }

    @PluginMethod()
    fun getCurrentVersion(pluginCall: PluginCall) {
        val result = JSObject().put("version", BuildConfig.VERSION_NAME)
        pluginCall.resolve(result)
    }

    @PluginMethod()
    fun download(pluginCall: PluginCall) {

        MainScope().launch(Dispatchers.IO) {

            val api = this@UpdatePlugin.context.getString(R.string.api)
            val url = URL("$api/app-version/download")
            val cookie = CookieManager.getInstance().getCookie(api)
            val request = url.openConnection() as HttpURLConnection

            request.setRequestProperty("Cookie", cookie);

            try {

                if (request.responseCode != 200) {
                    throw Exception()
                }

                request.inputStream.use { input ->

                    file.outputStream().use { output ->

                        val totalSize = request.contentLength.toFloat()
                        val buffer = ByteArray(DEFAULT_BUFFER_SIZE)
                        var bytesRead = input.read(buffer)
                        var size = bytesRead.toFloat()
                        var lastTime = System.currentTimeMillis()
                        var time = 0L

                        downloadStarted(totalSize)

                        while (bytesRead != -1) {

                            output.write(buffer, 0, bytesRead)

                            val currentTime = System.currentTimeMillis()
                            val progress = ((size / totalSize) * 100).toInt()

                            // Refresh the progress each 100 milliseconds or when the progress
                            // is equals to 100
                            if (time > 100 || progress == 100) {
                                downloadProgress(progress, size)
                                time = 0
                            }

                            time += currentTime - lastTime
                            lastTime = currentTime
                            bytesRead = input.read(buffer)
                            size += bytesRead
                        }

                        downloadCompleted()
                    }
                }

            } catch (exception: Exception) {

                downloadFailed()

            } finally {

                request.disconnect()
            }
        }

        pluginCall.resolve()
    }

    @PluginMethod()
    fun install(pluginCall: PluginCall) {

        val uri = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            FileProvider.getUriForFile(this.context, "${BuildConfig.APPLICATION_ID}.fileprovider", file)
        } else {
            Uri.fromFile(file)
        }

        val intent = Intent(Intent.ACTION_VIEW)
            .setDataAndType(uri, "application/vnd.android.package-archive")
            .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

        this.context.startActivity(intent)

        pluginCall.resolve()
    }

    private fun downloadStarted(totalSize: Float) {
        val result = JSObject().put("totalSize", byteToMegabyte(totalSize))
        notifyListeners("downloadStarted", result)
    }

    private fun downloadProgress(progress: Int, size: Float) {

        val result = JSObject()
            .put("progress", progress)
            .put("size", byteToMegabyte(size))

        notifyListeners("downloadProgress", result)
    }

    private fun downloadCompleted() {
        notifyListeners("downloadCompleted", null)
    }

    private fun downloadFailed() {
        notifyListeners("downloadFailed", null)
    }

    private fun byteToMegabyte(bytes: Float): Float {
        val mb = bytes / (1024 * 1024)
        return (mb * 100.0).roundToInt() / 100.0f
    }
}
