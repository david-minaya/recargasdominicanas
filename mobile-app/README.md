# Recargas Dominicanas mobile app

This is the mobile app of the Recargas Dominicanas system.

### Commands

| Command | Description |
|:--------|:------------|
| npm run copy | Copies the web app build into the native app |
| npm run update | Updates the native plugins and dependencies based on package.json |
| npm run sync | copy + update |
| npm run build | Build the project |
| npm run start | Start the server in the port 8080 |
| npm run dev | Start the developer server |
| npm run lint | Inspect the project to find errors and warnings |

See the Capacitor documentation for more information https://capacitorjs.com/docs

### Connect to a physical device over Wifi

1. Enable USB debuging in the device.
2. Connect the device and the computer to the same Wifi network.
3. Connect the device to the computer using a USB cable.
4. Open the port 5555 in the device running the command `adb tcpip 555`.
5. Disconnect the USB cable from the device.
6. Connect the device using its IP address `adb connect device_ip_address:5555`.

For more information about how to connect a physical device to run android application visit the page https://developer.android.com/studio/command-line/adb.
