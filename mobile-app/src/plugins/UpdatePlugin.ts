import { Capacitor, registerPlugin } from '@capacitor/core';

interface IUpdatePlugin {
  getCurrentVersion(): Promise<{ version: string }>;
  download(): Promise<void>;
  install(): Promise<void>;
  addListener(name: string, cb: (event: any) => void): void;
}

const plugin = registerPlugin<IUpdatePlugin>('UpdatePlugin');

export class UpdatePlugin {

  static async getCurrentVersion() {
    const { version } = await plugin.getCurrentVersion();
    return version;
  }

  static async download() {
    await plugin.download();
  }

  static async install() {
    await plugin.install();
  }

  static onDownloadStarted(cb: (totalSize: number) => void) {
    if (Capacitor.isNativePlatform()) {
      plugin.addListener('downloadStarted', event => {
        cb(event.totalSize);
      });
    }
  }

  static onDownloadProgress(cb: (size: number, progress: number) => void) {
    if (Capacitor.isNativePlatform()) {
      plugin.addListener('downloadProgress', event => {
        cb(event.size, event.progress);
      });
    }
  }

  static onDownloadCompleted(cb: () => void) {
    if (Capacitor.isNativePlatform()) {
      plugin.addListener('downloadCompleted', cb);
    }
  }

  static onDownloadFailed(cb: () => void) {
    if (Capacitor.isNativePlatform()) {
      plugin.addListener('downloadFailed', cb);
    }
  }
}
