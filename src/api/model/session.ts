/**
 * Contador Playbacks API
 * API para la app contador-playbacks
 *
 * OpenAPI spec version: 1.0.0
 * Contact: transformaciondigital@hogueras.es
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Asociacion } from './asociacion';

export interface Session { 
    id?: string;
    sessionTitle?: string;
    type?: number;
    typeNormalized?: string;
    participants?: Array<Asociacion>;
}