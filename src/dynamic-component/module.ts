import { NgModule, ModuleWithProviders, Compiler, COMPILER_OPTIONS, CompilerOptions, Optional, CompilerFactory } from '@angular/core';
import { JitCompilerFactory } from '@angular/compiler';
import { DynamicComponentDirective } from './dynamic-component.directive';
import { DynamicComponentOptions } from './options';

export function createCompiler(compilerFactory: CompilerFactory) {
    return compilerFactory.createCompiler();
}

/**
 * Setup for DynamicComponentDirective
 * 
 * ```ts
 * @NgModule({
 *   imports: [
 *     DynamicComponentModule.forRoot({
 *       imports: [CommonModule]
 *     })
 *   ],
 * })
 * class AppModule {}
 * ```
 */
@NgModule({
    declarations: [DynamicComponentDirective],
    exports: [DynamicComponentDirective],
})
export class DynamicComponentModule {
    static forRoot(metadata: NgModule): ModuleWithProviders {
        return {
            ngModule: DynamicComponentModule,
            providers: [
                { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
                { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
                { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
                {
                    provide: DynamicComponentOptions, useValue: {
                        ngModuleMetadata: metadata,
                    }
                },
            ],
        };
    }
}
