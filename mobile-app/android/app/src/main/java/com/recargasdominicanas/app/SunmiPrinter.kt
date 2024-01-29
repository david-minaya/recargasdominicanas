package com.recargasdominicanas.app

import android.content.Context
import com.getcapacitor.PluginCall
import com.sunmi.peripheral.printer.InnerPrinterCallback
import com.sunmi.peripheral.printer.InnerPrinterManager
import com.sunmi.peripheral.printer.SunmiPrinterService

class SunmiPrinter(private val context: Context) {

    fun print(call: PluginCall) {

        InnerPrinterManager.getInstance().bindService(context, object: InnerPrinterCallback() {

            override fun onConnected(service: SunmiPrinterService) {
                PrinterService(service).print(call.data)
                call.resolve()
            }

            override fun onDisconnected() {
                call.reject("onDisconnected -> Ocurrio un error al imprimir");
            }
        })
    }

    private inner class PrinterService(private val printer: SunmiPrinterService): BasePrinter() {

        override fun initPrint() {
            printer.printerInit(null)
            setSize("normal")
            setAlign(0)
            setBold(false)
        }

        override fun setSize(size: String) {
            if (size == "normal") printer.setFontSize(28f, null)
            if (size == "large") printer.setFontSize(36f, null)
        }

        override fun setBold(bold: Boolean) {
            if (bold) printer.sendRAWData(byteArrayOf(0x1B, 0x45, 0x1), null)
            if (!bold) printer.sendRAWData(byteArrayOf(0x1B, 0x45, 0x1), null)
        }

        override fun setAlign(align: Int) {
            printer.setAlignment(align, null)
        }

        override fun printText(text: String) {
            printer.printText(text, null)
        }

        override fun printCol(col1: String, col2: String) {
            printer.printColumnsText(arrayOf(col1, col2), intArrayOf(12, 14), intArrayOf(left, right), null)
        }

        override fun printLine() {
            printer.printText("---------------------------", null)
        }

        override fun printNewLine() {
            printer.lineWrap(1, null)
        }
    }
}
