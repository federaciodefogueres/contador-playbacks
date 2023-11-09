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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { SessionResponse } from '../model/sessionResponse';
import { SessionsResponse } from '../model/sessionsResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SesionesService {

    protected basePath = 'https://virtserver.swaggerhub.com/federaciodefogueres/contador-playbacks-api/1.0.0';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * Devuelve todas las sesiones con su información.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllSessions(observe?: 'body', reportProgress?: boolean): Observable<SessionsResponse>;
    public getAllSessions(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SessionsResponse>>;
    public getAllSessions(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SessionsResponse>>;
    public getAllSessions(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<SessionsResponse>('get',`${this.basePath}/sesiones`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Devuelve la información de la sesión solicitada.
     * @param idSession 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSession(idSession: string, observe?: 'body', reportProgress?: boolean): Observable<SessionResponse>;
    public getSession(idSession: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SessionResponse>>;
    public getSession(idSession: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SessionResponse>>;
    public getSession(idSession: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idSession === null || idSession === undefined) {
            throw new Error('Required parameter idSession was null or undefined when calling getSession.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<SessionResponse>('get',`${this.basePath}/sesiones/${encodeURIComponent(String(idSession))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
