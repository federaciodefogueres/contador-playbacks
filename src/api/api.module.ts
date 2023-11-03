import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AsociacinService } from './api/asociacin.service';
import { CandidaturaService } from './api/candidatura.service';
import { CargoService } from './api/cargo.service';
import { ConsultaService } from './api/consulta.service';
import { CuestionarioService } from './api/cuestionario.service';
import { GeneroService } from './api/genero.service';
import { OpcionesDeRespuestaService } from './api/opcionesDeRespuesta.service';
import { PreguntaService } from './api/pregunta.service';
import { ResultadosService } from './api/resultados.service';
import { SimulacionService } from './api/simulacion.service';
import { TipoAsociacinService } from './api/tipoAsociacin.service';
import { UsuarioService } from './api/usuario.service';
import { VisitanteService } from './api/visitante.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AsociacinService,
    CandidaturaService,
    CargoService,
    ConsultaService,
    CuestionarioService,
    GeneroService,
    OpcionesDeRespuestaService,
    PreguntaService,
    ResultadosService,
    SimulacionService,
    TipoAsociacinService,
    UsuarioService,
    VisitanteService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
