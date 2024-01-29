import { AppRelease } from '../entities/appRelease.entity';

export class AppReleaseRepo {

  static async getCurrent() {
    return AppRelease.createQueryBuilder('appRelease')
      .leftJoinAndSelect('appRelease.releaseNotes', 'releaseNotes')
      .where('appRelease.published = true')
      .orderBy('appRelease.date', 'DESC')
      .take(1)
      .getOne();
  }

  static async versionIsSmaller(version: string) {

    const lastRelease = await AppRelease.createQueryBuilder('appRelease')
      .orderBy('appRelease.date', 'DESC')
      .take(1)
      .getOne();

    if (!lastRelease) {
      return false;
    }

    const result = version.localeCompare(
      lastRelease.version, 
      undefined, 
      { numeric: true , sensitivity: 'base' }
    );
    
    return result <= 0;
  }
}
