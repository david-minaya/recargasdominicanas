package com.recargasdominicanas.app

import android.annotation.SuppressLint
import android.bluetooth.BluetoothManager
import android.bluetooth.BluetoothSocket
import android.content.Context
import com.getcapacitor.PluginCall
import java.io.OutputStream
import java.util.*

class BluetoothPrinter(context: Context) {

    private val manager = context.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    private val adapter = manager.adapter
    private var socket: BluetoothSocket? = null
    private lateinit var output: OutputStream

    fun isEnabled(): Boolean {
        return adapter.isEnabled
    }

    @SuppressLint("MissingPermission")
    fun print(call: PluginCall) {

        try {

            if (socket == null) {
                val device = adapter.bondedDevices.toList()[0]
                val uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB")
                socket = device.createRfcommSocketToServiceRecord(uuid)
            }

            if (!socket!!.isConnected) {
                adapter.cancelDiscovery()
                socket!!.connect()
                output = socket!!.outputStream
            }

            PrinterService(output).print(call.data)
            call.resolve()

        } catch (err: Exception) {

            println(err)
            call.reject("BluetoothPrinter Error")
        }
    }

    private inner class PrinterService(private val printer: OutputStream): BasePrinter() {

        private val INIT_PRINTER = byteArrayOf(0x1B, 0x40)
        private val CHARSET_ENCODING = byteArrayOf(27, 116, 16)
        private val CHARSET_NAME = charset("windows-1252")
        private val BOLD_ENABLED = byteArrayOf(0x1B, 0x45, 0x01)
        private val BOLD_DISABLED = byteArrayOf(0x1B, 0x45, 0x00)
        private val NORMAL_FONT_SIZE = byteArrayOf(0x1d, 0x21, 0x00)
        private val LARGE_FONT_SIZE = byteArrayOf(0x1d, 0x21, 0x10)
        private val ALIGN_LEFT = byteArrayOf(0x1b, 0x61, 0x00)
        private val ALIGN_CENTER = byteArrayOf(0x1b, 0x61, 0x01)
        private val ALIGN_RIGHT = byteArrayOf(0x1b, 0x61, 0x02)
        private val NEW_LINE = byteArrayOf(0x0a)

        override fun initPrint() {
            printer.write(INIT_PRINTER)
            printer.write(CHARSET_ENCODING)
        }

        override fun setBold(bold: Boolean) {
            if (bold) printer.write(BOLD_ENABLED)
            if (!bold) printer.write(BOLD_DISABLED)
        }

        override fun setAlign(align: Int) {
            if (align == 0) printer.write(ALIGN_LEFT)
            if (align == 1) printer.write(ALIGN_CENTER)
            if (align == 2) printer.write(ALIGN_RIGHT)
        }

        override fun setSize(size: String) {
            if (size == "normal") printer.write(NORMAL_FONT_SIZE)
            if (size == "large") printer.write(LARGE_FONT_SIZE)
        }

        override fun printText(text: String) {
            printer.write(text.toByteArray(CHARSET_NAME))
        }

        override fun printCol(col1: String, col2: String) {

            val width = 32
            val spaces = width - (col1.length + col2.length)
            val row = col1 + col2.padStart(spaces + col2.length)

            printer.write(row.toByteArray(CHARSET_NAME))
            printer.write(NEW_LINE)
        }

        override fun printLine() {
            printer.write("--------------------------------".toByteArray())
        }

        override fun printNewLine() {
            printer.write(NEW_LINE)
        }
    }
}
