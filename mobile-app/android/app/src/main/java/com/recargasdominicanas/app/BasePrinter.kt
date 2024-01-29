package com.recargasdominicanas.app

import com.getcapacitor.JSObject

private const val LEFT = "left"
private const val CENTER = "center"
private const val RIGHT = "right"

private const val NORMAL = "normal"
private const val LARGE = "large"

abstract class BasePrinter {

    protected open val left = 0
    protected open val center = 1
    protected open val right = 2

    open fun print(data: JSObject) {

        val lines = data.getJSONArray("lines")

        for (i in 0 until lines.length()) {

            initPrint()

            val line = lines.getJSONObject(i)
            val type = line.getString("type")

            if (type == "text") {

                val text = line.getString("value")
                val align = getAlign(line.optString("align", LEFT))
                val bold = line.optBoolean("bold", false)
                val size = line.optString("size", NORMAL)

                setAlign(align)
                setBold(bold)
                setSize(size)
                printText(text)
                printNewLine()
            }

            if (type == "col") {

                val col1 = line.getString("text1")
                val col2 = line.getString("text2")

                printCol(col1, col2)
            }

            if (type == "horizontal-line") {
                printLine()
                printNewLine()
            }

            if (type == "new-line") {
                printNewLine()
            }
        }
    }

    protected abstract fun initPrint()

    protected abstract fun setBold(bold: Boolean)

    protected abstract fun setAlign(align: Int)

    protected abstract fun setSize(size: String)

    protected abstract fun printText(text: String)

    protected abstract fun printCol(col1: String, col2: String)

    protected abstract fun printNewLine()

    protected abstract fun printLine()

    open fun getAlign(align: String): Int {
        return when (align) {
            LEFT -> left
            CENTER -> center
            RIGHT -> right
            else -> throw Exception()
        }
    }
}
