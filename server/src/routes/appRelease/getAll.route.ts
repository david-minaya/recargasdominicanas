import { APP_RELEASE_READ } from '../../constants/permissions';
import { AppRelease } from '../../entities/appRelease.entity';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';

permission(APP_RELEASE_READ)
get('/')
export const getAll = route(async () => {
  return AppRelease.createQueryBuilder('appRelease')
    .leftJoinAndSelect('appRelease.releaseNotes', 'releaseNotes')
    .orderBy('appRelease.date', 'DESC')
    .getMany();
});
