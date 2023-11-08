export * from './asociaciones.service';
import { AsociacionesService } from './asociaciones.service';
export * from './sesiones.service';
import { SesionesService } from './sesiones.service';
export * from './settings.service';
import { SettingsService } from './settings.service';
export const APIS = [AsociacionesService, SesionesService, SettingsService];
