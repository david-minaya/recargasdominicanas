package com.recargasdominicanas.app

import android.os.Build
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "Printer")
class PrinterPlugin: Plugin() {

    private lateinit var bluetoothPrinter: BluetoothPrinter

    override fun load() {
        bluetoothPrinter = BluetoothPrinter(context)
    }

    @PluginMethod()
    fun print(call: PluginCall) {

        if (Build.MODEL == "POSH5-OS01") {
            PosH5Printer(context).print(call)
            return
        }

        if (Build.MODEL == "V1s-G") {
            SunmiPrinter(context).print(call)
            return
        }

        if (bluetoothPrinter.isEnabled()) {
            bluetoothPrinter.print(call)
            return
        }

        call.reject("Printer not found")
    }
}
