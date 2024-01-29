# Build from command line

1. Build the applicaiton using gradle

    ```bash
    ./gradlew :app:bundleRelease
    ```

    This command going to generate the Android App Blundle in the dir `app/build/outputs/bundle/release/app-release.aab`.

2. Align the application

    ```bash
    zipalign -v -p 4 ./app/build/outputs/bundle/release/app-release.aab app-release-aligned.aab
    ```
    
    This going to generate the aligned `app-release-aligned.aab` file in the root of the project.

3. Sign the application

    ```bash
    jarsigner.exe -keystore <key-store-path> -storepass <key-store-password> -signedjar app-release-signed.aab app-release-aligned.aab <key-store-alias>
    ```

    This going to generate the aligned `app-release-signed.aab` file in the root of the project.

References:

- https://developer.android.com/studio/build/building-cmdline
- https://docs.oracle.com/javase/8/docs/technotes/tools/windows/jarsigner.html
