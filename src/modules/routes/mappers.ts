import { get } from 'radash';
import * as Types from './types';

export const Routes = (src?: any): Types.IEntity.Routes => ({
  id: get(src, 'id', 0),
  start: Location(get(src, 'start', {})),
  finish: Location(get(src, 'finish', {}))
});

export const Location = (src?: any): Types.IEntity.Location => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', '')
});
