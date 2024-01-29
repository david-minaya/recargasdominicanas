package com.recargasdominicanas.app

import android.app.Service
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import com.getcapacitor.PluginCall
import recieptservice.com.recieptservice.PrinterInterface

class PosH5Printer(private val context: Context) {

    fun print(call: PluginCall) {

        val intent = Intent().apply {
            val packageName = "recieptservice.com.recieptservice"
            val className = "recieptservice.com.recieptservice.service.PrinterService"
            setClassName(packageName, className)
        }

        context.bindService(intent, object : ServiceConnection {

            override fun onServiceConnected(name: ComponentName, service: IBinder) {
                PrinterService(PrinterInterface.Stub.asInterface(service)).print(call.data)
                call.resolve()
            }

            override fun onServiceDisconnected(name: ComponentName) {
                call.resolve()
            }
        }, Service.BIND_AUTO_CREATE)
    }

    inner class PrinterService(private val printer: PrinterInterface) : BasePrinter() {

        override fun initPrint() {
            printer.setAlignment(0)
            printer.setTextSize(28f)
            printer.setTextBold(false)
        }

        override fun setSize(size: String) {
            if (size == "normal") printer.setTextSize(28f)
            if (size == "large") printer.setTextSize(36f)
        }

        override fun setBold(bold: Boolean) {
            printer.setTextBold(bold)
        }

        override fun setAlign(align: Int) {
            printer.setAlignment(align)
        }

        override fun printText(text: String) {
            printer.printText(text)
        }

        override fun printCol(col1: String, col2: String) {

            val width = 27
            val spaces = width - (col1.length + col2.length)
            val row = col1 + col2.padStart(spaces + col2.length)

            printer.printText(row)
            printer.nextLine(1)
        }

        override fun printLine() {
            printer.printText("---------------------------")
        }

        override fun printNewLine() {
            printer.nextLine(1)
        }
    }
}
