
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model alumno
 * 
 */
export type alumno = $Result.DefaultSelection<Prisma.$alumnoPayload>
/**
 * Model cat_estatus
 * 
 */
export type cat_estatus = $Result.DefaultSelection<Prisma.$cat_estatusPayload>
/**
 * Model configuracion_cron
 * 
 */
export type configuracion_cron = $Result.DefaultSelection<Prisma.$configuracion_cronPayload>
/**
 * Model configuracion_general
 * 
 */
export type configuracion_general = $Result.DefaultSelection<Prisma.$configuracion_generalPayload>
/**
 * Model pedidos
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type pedidos = $Result.DefaultSelection<Prisma.$pedidosPayload>
/**
 * Model tarjetas
 * 
 */
export type tarjetas = $Result.DefaultSelection<Prisma.$tarjetasPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Alumnos
 * const alumnos = await prisma.alumno.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Alumnos
   * const alumnos = await prisma.alumno.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.alumno`: Exposes CRUD operations for the **alumno** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alumnos
    * const alumnos = await prisma.alumno.findMany()
    * ```
    */
  get alumno(): Prisma.alumnoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cat_estatus`: Exposes CRUD operations for the **cat_estatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cat_estatuses
    * const cat_estatuses = await prisma.cat_estatus.findMany()
    * ```
    */
  get cat_estatus(): Prisma.cat_estatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuracion_cron`: Exposes CRUD operations for the **configuracion_cron** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configuracion_crons
    * const configuracion_crons = await prisma.configuracion_cron.findMany()
    * ```
    */
  get configuracion_cron(): Prisma.configuracion_cronDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuracion_general`: Exposes CRUD operations for the **configuracion_general** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configuracion_generals
    * const configuracion_generals = await prisma.configuracion_general.findMany()
    * ```
    */
  get configuracion_general(): Prisma.configuracion_generalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidos`: Exposes CRUD operations for the **pedidos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedidos.findMany()
    * ```
    */
  get pedidos(): Prisma.pedidosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tarjetas`: Exposes CRUD operations for the **tarjetas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tarjetas
    * const tarjetas = await prisma.tarjetas.findMany()
    * ```
    */
  get tarjetas(): Prisma.tarjetasDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    alumno: 'alumno',
    cat_estatus: 'cat_estatus',
    configuracion_cron: 'configuracion_cron',
    configuracion_general: 'configuracion_general',
    pedidos: 'pedidos',
    tarjetas: 'tarjetas'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "alumno" | "cat_estatus" | "configuracion_cron" | "configuracion_general" | "pedidos" | "tarjetas"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      alumno: {
        payload: Prisma.$alumnoPayload<ExtArgs>
        fields: Prisma.alumnoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.alumnoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.alumnoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload>
          }
          findFirst: {
            args: Prisma.alumnoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.alumnoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload>
          }
          findMany: {
            args: Prisma.alumnoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload>[]
          }
          create: {
            args: Prisma.alumnoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload>
          }
          createMany: {
            args: Prisma.alumnoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.alumnoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload>
          }
          update: {
            args: Prisma.alumnoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload>
          }
          deleteMany: {
            args: Prisma.alumnoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.alumnoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.alumnoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alumnoPayload>
          }
          aggregate: {
            args: Prisma.AlumnoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlumno>
          }
          groupBy: {
            args: Prisma.alumnoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlumnoGroupByOutputType>[]
          }
          count: {
            args: Prisma.alumnoCountArgs<ExtArgs>
            result: $Utils.Optional<AlumnoCountAggregateOutputType> | number
          }
        }
      }
      cat_estatus: {
        payload: Prisma.$cat_estatusPayload<ExtArgs>
        fields: Prisma.cat_estatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cat_estatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cat_estatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload>
          }
          findFirst: {
            args: Prisma.cat_estatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cat_estatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload>
          }
          findMany: {
            args: Prisma.cat_estatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload>[]
          }
          create: {
            args: Prisma.cat_estatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload>
          }
          createMany: {
            args: Prisma.cat_estatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.cat_estatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload>
          }
          update: {
            args: Prisma.cat_estatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload>
          }
          deleteMany: {
            args: Prisma.cat_estatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cat_estatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.cat_estatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cat_estatusPayload>
          }
          aggregate: {
            args: Prisma.Cat_estatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCat_estatus>
          }
          groupBy: {
            args: Prisma.cat_estatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<Cat_estatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.cat_estatusCountArgs<ExtArgs>
            result: $Utils.Optional<Cat_estatusCountAggregateOutputType> | number
          }
        }
      }
      configuracion_cron: {
        payload: Prisma.$configuracion_cronPayload<ExtArgs>
        fields: Prisma.configuracion_cronFieldRefs
        operations: {
          findUnique: {
            args: Prisma.configuracion_cronFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.configuracion_cronFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload>
          }
          findFirst: {
            args: Prisma.configuracion_cronFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.configuracion_cronFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload>
          }
          findMany: {
            args: Prisma.configuracion_cronFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload>[]
          }
          create: {
            args: Prisma.configuracion_cronCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload>
          }
          createMany: {
            args: Prisma.configuracion_cronCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.configuracion_cronDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload>
          }
          update: {
            args: Prisma.configuracion_cronUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload>
          }
          deleteMany: {
            args: Prisma.configuracion_cronDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.configuracion_cronUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.configuracion_cronUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_cronPayload>
          }
          aggregate: {
            args: Prisma.Configuracion_cronAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguracion_cron>
          }
          groupBy: {
            args: Prisma.configuracion_cronGroupByArgs<ExtArgs>
            result: $Utils.Optional<Configuracion_cronGroupByOutputType>[]
          }
          count: {
            args: Prisma.configuracion_cronCountArgs<ExtArgs>
            result: $Utils.Optional<Configuracion_cronCountAggregateOutputType> | number
          }
        }
      }
      configuracion_general: {
        payload: Prisma.$configuracion_generalPayload<ExtArgs>
        fields: Prisma.configuracion_generalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.configuracion_generalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.configuracion_generalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload>
          }
          findFirst: {
            args: Prisma.configuracion_generalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.configuracion_generalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload>
          }
          findMany: {
            args: Prisma.configuracion_generalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload>[]
          }
          create: {
            args: Prisma.configuracion_generalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload>
          }
          createMany: {
            args: Prisma.configuracion_generalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.configuracion_generalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload>
          }
          update: {
            args: Prisma.configuracion_generalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload>
          }
          deleteMany: {
            args: Prisma.configuracion_generalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.configuracion_generalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.configuracion_generalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_generalPayload>
          }
          aggregate: {
            args: Prisma.Configuracion_generalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguracion_general>
          }
          groupBy: {
            args: Prisma.configuracion_generalGroupByArgs<ExtArgs>
            result: $Utils.Optional<Configuracion_generalGroupByOutputType>[]
          }
          count: {
            args: Prisma.configuracion_generalCountArgs<ExtArgs>
            result: $Utils.Optional<Configuracion_generalCountAggregateOutputType> | number
          }
        }
      }
      pedidos: {
        payload: Prisma.$pedidosPayload<ExtArgs>
        fields: Prisma.pedidosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pedidosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pedidosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          findFirst: {
            args: Prisma.pedidosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pedidosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          findMany: {
            args: Prisma.pedidosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>[]
          }
          create: {
            args: Prisma.pedidosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          createMany: {
            args: Prisma.pedidosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.pedidosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          update: {
            args: Prisma.pedidosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          deleteMany: {
            args: Prisma.pedidosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pedidosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.pedidosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          aggregate: {
            args: Prisma.PedidosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidos>
          }
          groupBy: {
            args: Prisma.pedidosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidosGroupByOutputType>[]
          }
          count: {
            args: Prisma.pedidosCountArgs<ExtArgs>
            result: $Utils.Optional<PedidosCountAggregateOutputType> | number
          }
        }
      }
      tarjetas: {
        payload: Prisma.$tarjetasPayload<ExtArgs>
        fields: Prisma.tarjetasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tarjetasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tarjetasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload>
          }
          findFirst: {
            args: Prisma.tarjetasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tarjetasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload>
          }
          findMany: {
            args: Prisma.tarjetasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload>[]
          }
          create: {
            args: Prisma.tarjetasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload>
          }
          createMany: {
            args: Prisma.tarjetasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tarjetasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload>
          }
          update: {
            args: Prisma.tarjetasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload>
          }
          deleteMany: {
            args: Prisma.tarjetasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tarjetasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tarjetasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tarjetasPayload>
          }
          aggregate: {
            args: Prisma.TarjetasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTarjetas>
          }
          groupBy: {
            args: Prisma.tarjetasGroupByArgs<ExtArgs>
            result: $Utils.Optional<TarjetasGroupByOutputType>[]
          }
          count: {
            args: Prisma.tarjetasCountArgs<ExtArgs>
            result: $Utils.Optional<TarjetasCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    alumno?: alumnoOmit
    cat_estatus?: cat_estatusOmit
    configuracion_cron?: configuracion_cronOmit
    configuracion_general?: configuracion_generalOmit
    pedidos?: pedidosOmit
    tarjetas?: tarjetasOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AlumnoCountOutputType
   */

  export type AlumnoCountOutputType = {
    pedidos: number
    tarjetas: number
  }

  export type AlumnoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | AlumnoCountOutputTypeCountPedidosArgs
    tarjetas?: boolean | AlumnoCountOutputTypeCountTarjetasArgs
  }

  // Custom InputTypes
  /**
   * AlumnoCountOutputType without action
   */
  export type AlumnoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlumnoCountOutputType
     */
    select?: AlumnoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlumnoCountOutputType without action
   */
  export type AlumnoCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
  }

  /**
   * AlumnoCountOutputType without action
   */
  export type AlumnoCountOutputTypeCountTarjetasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tarjetasWhereInput
  }


  /**
   * Count Type Cat_estatusCountOutputType
   */

  export type Cat_estatusCountOutputType = {
    pedidos: number
  }

  export type Cat_estatusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | Cat_estatusCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * Cat_estatusCountOutputType without action
   */
  export type Cat_estatusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cat_estatusCountOutputType
     */
    select?: Cat_estatusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Cat_estatusCountOutputType without action
   */
  export type Cat_estatusCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
  }


  /**
   * Models
   */

  /**
   * Model alumno
   */

  export type AggregateAlumno = {
    _count: AlumnoCountAggregateOutputType | null
    _avg: AlumnoAvgAggregateOutputType | null
    _sum: AlumnoSumAggregateOutputType | null
    _min: AlumnoMinAggregateOutputType | null
    _max: AlumnoMaxAggregateOutputType | null
  }

  export type AlumnoAvgAggregateOutputType = {
    id_alumno: number | null
  }

  export type AlumnoSumAggregateOutputType = {
    id_alumno: number | null
  }

  export type AlumnoMinAggregateOutputType = {
    id_alumno: number | null
    matricula: string | null
    nombre: string | null
    apellido_paterno: string | null
    apellido_materno: string | null
    email: string | null
    celular: string | null
    open_pay_id: string | null
    fecha_alta: Date | null
    fecha_modificacion: Date | null
  }

  export type AlumnoMaxAggregateOutputType = {
    id_alumno: number | null
    matricula: string | null
    nombre: string | null
    apellido_paterno: string | null
    apellido_materno: string | null
    email: string | null
    celular: string | null
    open_pay_id: string | null
    fecha_alta: Date | null
    fecha_modificacion: Date | null
  }

  export type AlumnoCountAggregateOutputType = {
    id_alumno: number
    matricula: number
    nombre: number
    apellido_paterno: number
    apellido_materno: number
    email: number
    celular: number
    open_pay_id: number
    fecha_alta: number
    fecha_modificacion: number
    _all: number
  }


  export type AlumnoAvgAggregateInputType = {
    id_alumno?: true
  }

  export type AlumnoSumAggregateInputType = {
    id_alumno?: true
  }

  export type AlumnoMinAggregateInputType = {
    id_alumno?: true
    matricula?: true
    nombre?: true
    apellido_paterno?: true
    apellido_materno?: true
    email?: true
    celular?: true
    open_pay_id?: true
    fecha_alta?: true
    fecha_modificacion?: true
  }

  export type AlumnoMaxAggregateInputType = {
    id_alumno?: true
    matricula?: true
    nombre?: true
    apellido_paterno?: true
    apellido_materno?: true
    email?: true
    celular?: true
    open_pay_id?: true
    fecha_alta?: true
    fecha_modificacion?: true
  }

  export type AlumnoCountAggregateInputType = {
    id_alumno?: true
    matricula?: true
    nombre?: true
    apellido_paterno?: true
    apellido_materno?: true
    email?: true
    celular?: true
    open_pay_id?: true
    fecha_alta?: true
    fecha_modificacion?: true
    _all?: true
  }

  export type AlumnoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alumno to aggregate.
     */
    where?: alumnoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alumnos to fetch.
     */
    orderBy?: alumnoOrderByWithRelationInput | alumnoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: alumnoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alumnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alumnos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned alumnos
    **/
    _count?: true | AlumnoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlumnoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlumnoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlumnoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlumnoMaxAggregateInputType
  }

  export type GetAlumnoAggregateType<T extends AlumnoAggregateArgs> = {
        [P in keyof T & keyof AggregateAlumno]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlumno[P]>
      : GetScalarType<T[P], AggregateAlumno[P]>
  }




  export type alumnoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alumnoWhereInput
    orderBy?: alumnoOrderByWithAggregationInput | alumnoOrderByWithAggregationInput[]
    by: AlumnoScalarFieldEnum[] | AlumnoScalarFieldEnum
    having?: alumnoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlumnoCountAggregateInputType | true
    _avg?: AlumnoAvgAggregateInputType
    _sum?: AlumnoSumAggregateInputType
    _min?: AlumnoMinAggregateInputType
    _max?: AlumnoMaxAggregateInputType
  }

  export type AlumnoGroupByOutputType = {
    id_alumno: number
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno: string | null
    email: string
    celular: string
    open_pay_id: string | null
    fecha_alta: Date
    fecha_modificacion: Date
    _count: AlumnoCountAggregateOutputType | null
    _avg: AlumnoAvgAggregateOutputType | null
    _sum: AlumnoSumAggregateOutputType | null
    _min: AlumnoMinAggregateOutputType | null
    _max: AlumnoMaxAggregateOutputType | null
  }

  type GetAlumnoGroupByPayload<T extends alumnoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlumnoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlumnoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlumnoGroupByOutputType[P]>
            : GetScalarType<T[P], AlumnoGroupByOutputType[P]>
        }
      >
    >


  export type alumnoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_alumno?: boolean
    matricula?: boolean
    nombre?: boolean
    apellido_paterno?: boolean
    apellido_materno?: boolean
    email?: boolean
    celular?: boolean
    open_pay_id?: boolean
    fecha_alta?: boolean
    fecha_modificacion?: boolean
    pedidos?: boolean | alumno$pedidosArgs<ExtArgs>
    tarjetas?: boolean | alumno$tarjetasArgs<ExtArgs>
    _count?: boolean | AlumnoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alumno"]>



  export type alumnoSelectScalar = {
    id_alumno?: boolean
    matricula?: boolean
    nombre?: boolean
    apellido_paterno?: boolean
    apellido_materno?: boolean
    email?: boolean
    celular?: boolean
    open_pay_id?: boolean
    fecha_alta?: boolean
    fecha_modificacion?: boolean
  }

  export type alumnoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_alumno" | "matricula" | "nombre" | "apellido_paterno" | "apellido_materno" | "email" | "celular" | "open_pay_id" | "fecha_alta" | "fecha_modificacion", ExtArgs["result"]["alumno"]>
  export type alumnoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | alumno$pedidosArgs<ExtArgs>
    tarjetas?: boolean | alumno$tarjetasArgs<ExtArgs>
    _count?: boolean | AlumnoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $alumnoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "alumno"
    objects: {
      pedidos: Prisma.$pedidosPayload<ExtArgs>[]
      tarjetas: Prisma.$tarjetasPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_alumno: number
      matricula: string
      nombre: string
      apellido_paterno: string
      apellido_materno: string | null
      email: string
      celular: string
      open_pay_id: string | null
      fecha_alta: Date
      fecha_modificacion: Date
    }, ExtArgs["result"]["alumno"]>
    composites: {}
  }

  type alumnoGetPayload<S extends boolean | null | undefined | alumnoDefaultArgs> = $Result.GetResult<Prisma.$alumnoPayload, S>

  type alumnoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<alumnoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlumnoCountAggregateInputType | true
    }

  export interface alumnoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['alumno'], meta: { name: 'alumno' } }
    /**
     * Find zero or one Alumno that matches the filter.
     * @param {alumnoFindUniqueArgs} args - Arguments to find a Alumno
     * @example
     * // Get one Alumno
     * const alumno = await prisma.alumno.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends alumnoFindUniqueArgs>(args: SelectSubset<T, alumnoFindUniqueArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alumno that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {alumnoFindUniqueOrThrowArgs} args - Arguments to find a Alumno
     * @example
     * // Get one Alumno
     * const alumno = await prisma.alumno.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends alumnoFindUniqueOrThrowArgs>(args: SelectSubset<T, alumnoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alumno that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alumnoFindFirstArgs} args - Arguments to find a Alumno
     * @example
     * // Get one Alumno
     * const alumno = await prisma.alumno.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends alumnoFindFirstArgs>(args?: SelectSubset<T, alumnoFindFirstArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alumno that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alumnoFindFirstOrThrowArgs} args - Arguments to find a Alumno
     * @example
     * // Get one Alumno
     * const alumno = await prisma.alumno.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends alumnoFindFirstOrThrowArgs>(args?: SelectSubset<T, alumnoFindFirstOrThrowArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alumnos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alumnoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alumnos
     * const alumnos = await prisma.alumno.findMany()
     * 
     * // Get first 10 Alumnos
     * const alumnos = await prisma.alumno.findMany({ take: 10 })
     * 
     * // Only select the `id_alumno`
     * const alumnoWithId_alumnoOnly = await prisma.alumno.findMany({ select: { id_alumno: true } })
     * 
     */
    findMany<T extends alumnoFindManyArgs>(args?: SelectSubset<T, alumnoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alumno.
     * @param {alumnoCreateArgs} args - Arguments to create a Alumno.
     * @example
     * // Create one Alumno
     * const Alumno = await prisma.alumno.create({
     *   data: {
     *     // ... data to create a Alumno
     *   }
     * })
     * 
     */
    create<T extends alumnoCreateArgs>(args: SelectSubset<T, alumnoCreateArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alumnos.
     * @param {alumnoCreateManyArgs} args - Arguments to create many Alumnos.
     * @example
     * // Create many Alumnos
     * const alumno = await prisma.alumno.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends alumnoCreateManyArgs>(args?: SelectSubset<T, alumnoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Alumno.
     * @param {alumnoDeleteArgs} args - Arguments to delete one Alumno.
     * @example
     * // Delete one Alumno
     * const Alumno = await prisma.alumno.delete({
     *   where: {
     *     // ... filter to delete one Alumno
     *   }
     * })
     * 
     */
    delete<T extends alumnoDeleteArgs>(args: SelectSubset<T, alumnoDeleteArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alumno.
     * @param {alumnoUpdateArgs} args - Arguments to update one Alumno.
     * @example
     * // Update one Alumno
     * const alumno = await prisma.alumno.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends alumnoUpdateArgs>(args: SelectSubset<T, alumnoUpdateArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alumnos.
     * @param {alumnoDeleteManyArgs} args - Arguments to filter Alumnos to delete.
     * @example
     * // Delete a few Alumnos
     * const { count } = await prisma.alumno.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends alumnoDeleteManyArgs>(args?: SelectSubset<T, alumnoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alumnos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alumnoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alumnos
     * const alumno = await prisma.alumno.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends alumnoUpdateManyArgs>(args: SelectSubset<T, alumnoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alumno.
     * @param {alumnoUpsertArgs} args - Arguments to update or create a Alumno.
     * @example
     * // Update or create a Alumno
     * const alumno = await prisma.alumno.upsert({
     *   create: {
     *     // ... data to create a Alumno
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alumno we want to update
     *   }
     * })
     */
    upsert<T extends alumnoUpsertArgs>(args: SelectSubset<T, alumnoUpsertArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alumnos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alumnoCountArgs} args - Arguments to filter Alumnos to count.
     * @example
     * // Count the number of Alumnos
     * const count = await prisma.alumno.count({
     *   where: {
     *     // ... the filter for the Alumnos we want to count
     *   }
     * })
    **/
    count<T extends alumnoCountArgs>(
      args?: Subset<T, alumnoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlumnoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alumno.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumnoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlumnoAggregateArgs>(args: Subset<T, AlumnoAggregateArgs>): Prisma.PrismaPromise<GetAlumnoAggregateType<T>>

    /**
     * Group by Alumno.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alumnoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends alumnoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: alumnoGroupByArgs['orderBy'] }
        : { orderBy?: alumnoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, alumnoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlumnoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the alumno model
   */
  readonly fields: alumnoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for alumno.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__alumnoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends alumno$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, alumno$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tarjetas<T extends alumno$tarjetasArgs<ExtArgs> = {}>(args?: Subset<T, alumno$tarjetasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the alumno model
   */
  interface alumnoFieldRefs {
    readonly id_alumno: FieldRef<"alumno", 'Int'>
    readonly matricula: FieldRef<"alumno", 'String'>
    readonly nombre: FieldRef<"alumno", 'String'>
    readonly apellido_paterno: FieldRef<"alumno", 'String'>
    readonly apellido_materno: FieldRef<"alumno", 'String'>
    readonly email: FieldRef<"alumno", 'String'>
    readonly celular: FieldRef<"alumno", 'String'>
    readonly open_pay_id: FieldRef<"alumno", 'String'>
    readonly fecha_alta: FieldRef<"alumno", 'DateTime'>
    readonly fecha_modificacion: FieldRef<"alumno", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * alumno findUnique
   */
  export type alumnoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * Filter, which alumno to fetch.
     */
    where: alumnoWhereUniqueInput
  }

  /**
   * alumno findUniqueOrThrow
   */
  export type alumnoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * Filter, which alumno to fetch.
     */
    where: alumnoWhereUniqueInput
  }

  /**
   * alumno findFirst
   */
  export type alumnoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * Filter, which alumno to fetch.
     */
    where?: alumnoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alumnos to fetch.
     */
    orderBy?: alumnoOrderByWithRelationInput | alumnoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alumnos.
     */
    cursor?: alumnoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alumnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alumnos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alumnos.
     */
    distinct?: AlumnoScalarFieldEnum | AlumnoScalarFieldEnum[]
  }

  /**
   * alumno findFirstOrThrow
   */
  export type alumnoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * Filter, which alumno to fetch.
     */
    where?: alumnoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alumnos to fetch.
     */
    orderBy?: alumnoOrderByWithRelationInput | alumnoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alumnos.
     */
    cursor?: alumnoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alumnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alumnos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alumnos.
     */
    distinct?: AlumnoScalarFieldEnum | AlumnoScalarFieldEnum[]
  }

  /**
   * alumno findMany
   */
  export type alumnoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * Filter, which alumnos to fetch.
     */
    where?: alumnoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alumnos to fetch.
     */
    orderBy?: alumnoOrderByWithRelationInput | alumnoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing alumnos.
     */
    cursor?: alumnoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alumnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alumnos.
     */
    skip?: number
    distinct?: AlumnoScalarFieldEnum | AlumnoScalarFieldEnum[]
  }

  /**
   * alumno create
   */
  export type alumnoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * The data needed to create a alumno.
     */
    data: XOR<alumnoCreateInput, alumnoUncheckedCreateInput>
  }

  /**
   * alumno createMany
   */
  export type alumnoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many alumnos.
     */
    data: alumnoCreateManyInput | alumnoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * alumno update
   */
  export type alumnoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * The data needed to update a alumno.
     */
    data: XOR<alumnoUpdateInput, alumnoUncheckedUpdateInput>
    /**
     * Choose, which alumno to update.
     */
    where: alumnoWhereUniqueInput
  }

  /**
   * alumno updateMany
   */
  export type alumnoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update alumnos.
     */
    data: XOR<alumnoUpdateManyMutationInput, alumnoUncheckedUpdateManyInput>
    /**
     * Filter which alumnos to update
     */
    where?: alumnoWhereInput
    /**
     * Limit how many alumnos to update.
     */
    limit?: number
  }

  /**
   * alumno upsert
   */
  export type alumnoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * The filter to search for the alumno to update in case it exists.
     */
    where: alumnoWhereUniqueInput
    /**
     * In case the alumno found by the `where` argument doesn't exist, create a new alumno with this data.
     */
    create: XOR<alumnoCreateInput, alumnoUncheckedCreateInput>
    /**
     * In case the alumno was found with the provided `where` argument, update it with this data.
     */
    update: XOR<alumnoUpdateInput, alumnoUncheckedUpdateInput>
  }

  /**
   * alumno delete
   */
  export type alumnoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
    /**
     * Filter which alumno to delete.
     */
    where: alumnoWhereUniqueInput
  }

  /**
   * alumno deleteMany
   */
  export type alumnoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alumnos to delete
     */
    where?: alumnoWhereInput
    /**
     * Limit how many alumnos to delete.
     */
    limit?: number
  }

  /**
   * alumno.pedidos
   */
  export type alumno$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    cursor?: pedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * alumno.tarjetas
   */
  export type alumno$tarjetasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    where?: tarjetasWhereInput
    orderBy?: tarjetasOrderByWithRelationInput | tarjetasOrderByWithRelationInput[]
    cursor?: tarjetasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TarjetasScalarFieldEnum | TarjetasScalarFieldEnum[]
  }

  /**
   * alumno without action
   */
  export type alumnoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alumno
     */
    select?: alumnoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alumno
     */
    omit?: alumnoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alumnoInclude<ExtArgs> | null
  }


  /**
   * Model cat_estatus
   */

  export type AggregateCat_estatus = {
    _count: Cat_estatusCountAggregateOutputType | null
    _avg: Cat_estatusAvgAggregateOutputType | null
    _sum: Cat_estatusSumAggregateOutputType | null
    _min: Cat_estatusMinAggregateOutputType | null
    _max: Cat_estatusMaxAggregateOutputType | null
  }

  export type Cat_estatusAvgAggregateOutputType = {
    id_cat_estatus: number | null
    valor: number | null
  }

  export type Cat_estatusSumAggregateOutputType = {
    id_cat_estatus: number | null
    valor: number | null
  }

  export type Cat_estatusMinAggregateOutputType = {
    id_cat_estatus: number | null
    clave: string | null
    descripcion: string | null
    valor: number | null
  }

  export type Cat_estatusMaxAggregateOutputType = {
    id_cat_estatus: number | null
    clave: string | null
    descripcion: string | null
    valor: number | null
  }

  export type Cat_estatusCountAggregateOutputType = {
    id_cat_estatus: number
    clave: number
    descripcion: number
    valor: number
    _all: number
  }


  export type Cat_estatusAvgAggregateInputType = {
    id_cat_estatus?: true
    valor?: true
  }

  export type Cat_estatusSumAggregateInputType = {
    id_cat_estatus?: true
    valor?: true
  }

  export type Cat_estatusMinAggregateInputType = {
    id_cat_estatus?: true
    clave?: true
    descripcion?: true
    valor?: true
  }

  export type Cat_estatusMaxAggregateInputType = {
    id_cat_estatus?: true
    clave?: true
    descripcion?: true
    valor?: true
  }

  export type Cat_estatusCountAggregateInputType = {
    id_cat_estatus?: true
    clave?: true
    descripcion?: true
    valor?: true
    _all?: true
  }

  export type Cat_estatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cat_estatus to aggregate.
     */
    where?: cat_estatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cat_estatuses to fetch.
     */
    orderBy?: cat_estatusOrderByWithRelationInput | cat_estatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cat_estatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cat_estatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cat_estatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cat_estatuses
    **/
    _count?: true | Cat_estatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Cat_estatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Cat_estatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Cat_estatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Cat_estatusMaxAggregateInputType
  }

  export type GetCat_estatusAggregateType<T extends Cat_estatusAggregateArgs> = {
        [P in keyof T & keyof AggregateCat_estatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCat_estatus[P]>
      : GetScalarType<T[P], AggregateCat_estatus[P]>
  }




  export type cat_estatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cat_estatusWhereInput
    orderBy?: cat_estatusOrderByWithAggregationInput | cat_estatusOrderByWithAggregationInput[]
    by: Cat_estatusScalarFieldEnum[] | Cat_estatusScalarFieldEnum
    having?: cat_estatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Cat_estatusCountAggregateInputType | true
    _avg?: Cat_estatusAvgAggregateInputType
    _sum?: Cat_estatusSumAggregateInputType
    _min?: Cat_estatusMinAggregateInputType
    _max?: Cat_estatusMaxAggregateInputType
  }

  export type Cat_estatusGroupByOutputType = {
    id_cat_estatus: number
    clave: string
    descripcion: string
    valor: number
    _count: Cat_estatusCountAggregateOutputType | null
    _avg: Cat_estatusAvgAggregateOutputType | null
    _sum: Cat_estatusSumAggregateOutputType | null
    _min: Cat_estatusMinAggregateOutputType | null
    _max: Cat_estatusMaxAggregateOutputType | null
  }

  type GetCat_estatusGroupByPayload<T extends cat_estatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Cat_estatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Cat_estatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Cat_estatusGroupByOutputType[P]>
            : GetScalarType<T[P], Cat_estatusGroupByOutputType[P]>
        }
      >
    >


  export type cat_estatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_cat_estatus?: boolean
    clave?: boolean
    descripcion?: boolean
    valor?: boolean
    pedidos?: boolean | cat_estatus$pedidosArgs<ExtArgs>
    _count?: boolean | Cat_estatusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cat_estatus"]>



  export type cat_estatusSelectScalar = {
    id_cat_estatus?: boolean
    clave?: boolean
    descripcion?: boolean
    valor?: boolean
  }

  export type cat_estatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_cat_estatus" | "clave" | "descripcion" | "valor", ExtArgs["result"]["cat_estatus"]>
  export type cat_estatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | cat_estatus$pedidosArgs<ExtArgs>
    _count?: boolean | Cat_estatusCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $cat_estatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cat_estatus"
    objects: {
      pedidos: Prisma.$pedidosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_cat_estatus: number
      clave: string
      descripcion: string
      valor: number
    }, ExtArgs["result"]["cat_estatus"]>
    composites: {}
  }

  type cat_estatusGetPayload<S extends boolean | null | undefined | cat_estatusDefaultArgs> = $Result.GetResult<Prisma.$cat_estatusPayload, S>

  type cat_estatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cat_estatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Cat_estatusCountAggregateInputType | true
    }

  export interface cat_estatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cat_estatus'], meta: { name: 'cat_estatus' } }
    /**
     * Find zero or one Cat_estatus that matches the filter.
     * @param {cat_estatusFindUniqueArgs} args - Arguments to find a Cat_estatus
     * @example
     * // Get one Cat_estatus
     * const cat_estatus = await prisma.cat_estatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cat_estatusFindUniqueArgs>(args: SelectSubset<T, cat_estatusFindUniqueArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cat_estatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cat_estatusFindUniqueOrThrowArgs} args - Arguments to find a Cat_estatus
     * @example
     * // Get one Cat_estatus
     * const cat_estatus = await prisma.cat_estatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cat_estatusFindUniqueOrThrowArgs>(args: SelectSubset<T, cat_estatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cat_estatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cat_estatusFindFirstArgs} args - Arguments to find a Cat_estatus
     * @example
     * // Get one Cat_estatus
     * const cat_estatus = await prisma.cat_estatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cat_estatusFindFirstArgs>(args?: SelectSubset<T, cat_estatusFindFirstArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cat_estatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cat_estatusFindFirstOrThrowArgs} args - Arguments to find a Cat_estatus
     * @example
     * // Get one Cat_estatus
     * const cat_estatus = await prisma.cat_estatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cat_estatusFindFirstOrThrowArgs>(args?: SelectSubset<T, cat_estatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cat_estatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cat_estatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cat_estatuses
     * const cat_estatuses = await prisma.cat_estatus.findMany()
     * 
     * // Get first 10 Cat_estatuses
     * const cat_estatuses = await prisma.cat_estatus.findMany({ take: 10 })
     * 
     * // Only select the `id_cat_estatus`
     * const cat_estatusWithId_cat_estatusOnly = await prisma.cat_estatus.findMany({ select: { id_cat_estatus: true } })
     * 
     */
    findMany<T extends cat_estatusFindManyArgs>(args?: SelectSubset<T, cat_estatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cat_estatus.
     * @param {cat_estatusCreateArgs} args - Arguments to create a Cat_estatus.
     * @example
     * // Create one Cat_estatus
     * const Cat_estatus = await prisma.cat_estatus.create({
     *   data: {
     *     // ... data to create a Cat_estatus
     *   }
     * })
     * 
     */
    create<T extends cat_estatusCreateArgs>(args: SelectSubset<T, cat_estatusCreateArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cat_estatuses.
     * @param {cat_estatusCreateManyArgs} args - Arguments to create many Cat_estatuses.
     * @example
     * // Create many Cat_estatuses
     * const cat_estatus = await prisma.cat_estatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cat_estatusCreateManyArgs>(args?: SelectSubset<T, cat_estatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cat_estatus.
     * @param {cat_estatusDeleteArgs} args - Arguments to delete one Cat_estatus.
     * @example
     * // Delete one Cat_estatus
     * const Cat_estatus = await prisma.cat_estatus.delete({
     *   where: {
     *     // ... filter to delete one Cat_estatus
     *   }
     * })
     * 
     */
    delete<T extends cat_estatusDeleteArgs>(args: SelectSubset<T, cat_estatusDeleteArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cat_estatus.
     * @param {cat_estatusUpdateArgs} args - Arguments to update one Cat_estatus.
     * @example
     * // Update one Cat_estatus
     * const cat_estatus = await prisma.cat_estatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cat_estatusUpdateArgs>(args: SelectSubset<T, cat_estatusUpdateArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cat_estatuses.
     * @param {cat_estatusDeleteManyArgs} args - Arguments to filter Cat_estatuses to delete.
     * @example
     * // Delete a few Cat_estatuses
     * const { count } = await prisma.cat_estatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cat_estatusDeleteManyArgs>(args?: SelectSubset<T, cat_estatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cat_estatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cat_estatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cat_estatuses
     * const cat_estatus = await prisma.cat_estatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cat_estatusUpdateManyArgs>(args: SelectSubset<T, cat_estatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cat_estatus.
     * @param {cat_estatusUpsertArgs} args - Arguments to update or create a Cat_estatus.
     * @example
     * // Update or create a Cat_estatus
     * const cat_estatus = await prisma.cat_estatus.upsert({
     *   create: {
     *     // ... data to create a Cat_estatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cat_estatus we want to update
     *   }
     * })
     */
    upsert<T extends cat_estatusUpsertArgs>(args: SelectSubset<T, cat_estatusUpsertArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cat_estatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cat_estatusCountArgs} args - Arguments to filter Cat_estatuses to count.
     * @example
     * // Count the number of Cat_estatuses
     * const count = await prisma.cat_estatus.count({
     *   where: {
     *     // ... the filter for the Cat_estatuses we want to count
     *   }
     * })
    **/
    count<T extends cat_estatusCountArgs>(
      args?: Subset<T, cat_estatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Cat_estatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cat_estatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Cat_estatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Cat_estatusAggregateArgs>(args: Subset<T, Cat_estatusAggregateArgs>): Prisma.PrismaPromise<GetCat_estatusAggregateType<T>>

    /**
     * Group by Cat_estatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cat_estatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cat_estatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cat_estatusGroupByArgs['orderBy'] }
        : { orderBy?: cat_estatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cat_estatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCat_estatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cat_estatus model
   */
  readonly fields: cat_estatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cat_estatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cat_estatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends cat_estatus$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, cat_estatus$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cat_estatus model
   */
  interface cat_estatusFieldRefs {
    readonly id_cat_estatus: FieldRef<"cat_estatus", 'Int'>
    readonly clave: FieldRef<"cat_estatus", 'String'>
    readonly descripcion: FieldRef<"cat_estatus", 'String'>
    readonly valor: FieldRef<"cat_estatus", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * cat_estatus findUnique
   */
  export type cat_estatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * Filter, which cat_estatus to fetch.
     */
    where: cat_estatusWhereUniqueInput
  }

  /**
   * cat_estatus findUniqueOrThrow
   */
  export type cat_estatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * Filter, which cat_estatus to fetch.
     */
    where: cat_estatusWhereUniqueInput
  }

  /**
   * cat_estatus findFirst
   */
  export type cat_estatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * Filter, which cat_estatus to fetch.
     */
    where?: cat_estatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cat_estatuses to fetch.
     */
    orderBy?: cat_estatusOrderByWithRelationInput | cat_estatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cat_estatuses.
     */
    cursor?: cat_estatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cat_estatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cat_estatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cat_estatuses.
     */
    distinct?: Cat_estatusScalarFieldEnum | Cat_estatusScalarFieldEnum[]
  }

  /**
   * cat_estatus findFirstOrThrow
   */
  export type cat_estatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * Filter, which cat_estatus to fetch.
     */
    where?: cat_estatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cat_estatuses to fetch.
     */
    orderBy?: cat_estatusOrderByWithRelationInput | cat_estatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cat_estatuses.
     */
    cursor?: cat_estatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cat_estatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cat_estatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cat_estatuses.
     */
    distinct?: Cat_estatusScalarFieldEnum | Cat_estatusScalarFieldEnum[]
  }

  /**
   * cat_estatus findMany
   */
  export type cat_estatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * Filter, which cat_estatuses to fetch.
     */
    where?: cat_estatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cat_estatuses to fetch.
     */
    orderBy?: cat_estatusOrderByWithRelationInput | cat_estatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cat_estatuses.
     */
    cursor?: cat_estatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cat_estatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cat_estatuses.
     */
    skip?: number
    distinct?: Cat_estatusScalarFieldEnum | Cat_estatusScalarFieldEnum[]
  }

  /**
   * cat_estatus create
   */
  export type cat_estatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * The data needed to create a cat_estatus.
     */
    data: XOR<cat_estatusCreateInput, cat_estatusUncheckedCreateInput>
  }

  /**
   * cat_estatus createMany
   */
  export type cat_estatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cat_estatuses.
     */
    data: cat_estatusCreateManyInput | cat_estatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cat_estatus update
   */
  export type cat_estatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * The data needed to update a cat_estatus.
     */
    data: XOR<cat_estatusUpdateInput, cat_estatusUncheckedUpdateInput>
    /**
     * Choose, which cat_estatus to update.
     */
    where: cat_estatusWhereUniqueInput
  }

  /**
   * cat_estatus updateMany
   */
  export type cat_estatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cat_estatuses.
     */
    data: XOR<cat_estatusUpdateManyMutationInput, cat_estatusUncheckedUpdateManyInput>
    /**
     * Filter which cat_estatuses to update
     */
    where?: cat_estatusWhereInput
    /**
     * Limit how many cat_estatuses to update.
     */
    limit?: number
  }

  /**
   * cat_estatus upsert
   */
  export type cat_estatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * The filter to search for the cat_estatus to update in case it exists.
     */
    where: cat_estatusWhereUniqueInput
    /**
     * In case the cat_estatus found by the `where` argument doesn't exist, create a new cat_estatus with this data.
     */
    create: XOR<cat_estatusCreateInput, cat_estatusUncheckedCreateInput>
    /**
     * In case the cat_estatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cat_estatusUpdateInput, cat_estatusUncheckedUpdateInput>
  }

  /**
   * cat_estatus delete
   */
  export type cat_estatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
    /**
     * Filter which cat_estatus to delete.
     */
    where: cat_estatusWhereUniqueInput
  }

  /**
   * cat_estatus deleteMany
   */
  export type cat_estatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cat_estatuses to delete
     */
    where?: cat_estatusWhereInput
    /**
     * Limit how many cat_estatuses to delete.
     */
    limit?: number
  }

  /**
   * cat_estatus.pedidos
   */
  export type cat_estatus$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    cursor?: pedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * cat_estatus without action
   */
  export type cat_estatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cat_estatus
     */
    select?: cat_estatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cat_estatus
     */
    omit?: cat_estatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cat_estatusInclude<ExtArgs> | null
  }


  /**
   * Model configuracion_cron
   */

  export type AggregateConfiguracion_cron = {
    _count: Configuracion_cronCountAggregateOutputType | null
    _avg: Configuracion_cronAvgAggregateOutputType | null
    _sum: Configuracion_cronSumAggregateOutputType | null
    _min: Configuracion_cronMinAggregateOutputType | null
    _max: Configuracion_cronMaxAggregateOutputType | null
  }

  export type Configuracion_cronAvgAggregateOutputType = {
    id: number | null
  }

  export type Configuracion_cronSumAggregateOutputType = {
    id: number | null
  }

  export type Configuracion_cronMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    expresion_cron: string | null
  }

  export type Configuracion_cronMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    expresion_cron: string | null
  }

  export type Configuracion_cronCountAggregateOutputType = {
    id: number
    nombre: number
    expresion_cron: number
    _all: number
  }


  export type Configuracion_cronAvgAggregateInputType = {
    id?: true
  }

  export type Configuracion_cronSumAggregateInputType = {
    id?: true
  }

  export type Configuracion_cronMinAggregateInputType = {
    id?: true
    nombre?: true
    expresion_cron?: true
  }

  export type Configuracion_cronMaxAggregateInputType = {
    id?: true
    nombre?: true
    expresion_cron?: true
  }

  export type Configuracion_cronCountAggregateInputType = {
    id?: true
    nombre?: true
    expresion_cron?: true
    _all?: true
  }

  export type Configuracion_cronAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which configuracion_cron to aggregate.
     */
    where?: configuracion_cronWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_crons to fetch.
     */
    orderBy?: configuracion_cronOrderByWithRelationInput | configuracion_cronOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: configuracion_cronWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_crons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_crons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned configuracion_crons
    **/
    _count?: true | Configuracion_cronCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Configuracion_cronAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Configuracion_cronSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Configuracion_cronMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Configuracion_cronMaxAggregateInputType
  }

  export type GetConfiguracion_cronAggregateType<T extends Configuracion_cronAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguracion_cron]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguracion_cron[P]>
      : GetScalarType<T[P], AggregateConfiguracion_cron[P]>
  }




  export type configuracion_cronGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: configuracion_cronWhereInput
    orderBy?: configuracion_cronOrderByWithAggregationInput | configuracion_cronOrderByWithAggregationInput[]
    by: Configuracion_cronScalarFieldEnum[] | Configuracion_cronScalarFieldEnum
    having?: configuracion_cronScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Configuracion_cronCountAggregateInputType | true
    _avg?: Configuracion_cronAvgAggregateInputType
    _sum?: Configuracion_cronSumAggregateInputType
    _min?: Configuracion_cronMinAggregateInputType
    _max?: Configuracion_cronMaxAggregateInputType
  }

  export type Configuracion_cronGroupByOutputType = {
    id: number
    nombre: string | null
    expresion_cron: string | null
    _count: Configuracion_cronCountAggregateOutputType | null
    _avg: Configuracion_cronAvgAggregateOutputType | null
    _sum: Configuracion_cronSumAggregateOutputType | null
    _min: Configuracion_cronMinAggregateOutputType | null
    _max: Configuracion_cronMaxAggregateOutputType | null
  }

  type GetConfiguracion_cronGroupByPayload<T extends configuracion_cronGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Configuracion_cronGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Configuracion_cronGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Configuracion_cronGroupByOutputType[P]>
            : GetScalarType<T[P], Configuracion_cronGroupByOutputType[P]>
        }
      >
    >


  export type configuracion_cronSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    expresion_cron?: boolean
  }, ExtArgs["result"]["configuracion_cron"]>



  export type configuracion_cronSelectScalar = {
    id?: boolean
    nombre?: boolean
    expresion_cron?: boolean
  }

  export type configuracion_cronOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "expresion_cron", ExtArgs["result"]["configuracion_cron"]>

  export type $configuracion_cronPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "configuracion_cron"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string | null
      expresion_cron: string | null
    }, ExtArgs["result"]["configuracion_cron"]>
    composites: {}
  }

  type configuracion_cronGetPayload<S extends boolean | null | undefined | configuracion_cronDefaultArgs> = $Result.GetResult<Prisma.$configuracion_cronPayload, S>

  type configuracion_cronCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<configuracion_cronFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Configuracion_cronCountAggregateInputType | true
    }

  export interface configuracion_cronDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['configuracion_cron'], meta: { name: 'configuracion_cron' } }
    /**
     * Find zero or one Configuracion_cron that matches the filter.
     * @param {configuracion_cronFindUniqueArgs} args - Arguments to find a Configuracion_cron
     * @example
     * // Get one Configuracion_cron
     * const configuracion_cron = await prisma.configuracion_cron.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends configuracion_cronFindUniqueArgs>(args: SelectSubset<T, configuracion_cronFindUniqueArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuracion_cron that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {configuracion_cronFindUniqueOrThrowArgs} args - Arguments to find a Configuracion_cron
     * @example
     * // Get one Configuracion_cron
     * const configuracion_cron = await prisma.configuracion_cron.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends configuracion_cronFindUniqueOrThrowArgs>(args: SelectSubset<T, configuracion_cronFindUniqueOrThrowArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion_cron that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_cronFindFirstArgs} args - Arguments to find a Configuracion_cron
     * @example
     * // Get one Configuracion_cron
     * const configuracion_cron = await prisma.configuracion_cron.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends configuracion_cronFindFirstArgs>(args?: SelectSubset<T, configuracion_cronFindFirstArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion_cron that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_cronFindFirstOrThrowArgs} args - Arguments to find a Configuracion_cron
     * @example
     * // Get one Configuracion_cron
     * const configuracion_cron = await prisma.configuracion_cron.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends configuracion_cronFindFirstOrThrowArgs>(args?: SelectSubset<T, configuracion_cronFindFirstOrThrowArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configuracion_crons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_cronFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configuracion_crons
     * const configuracion_crons = await prisma.configuracion_cron.findMany()
     * 
     * // Get first 10 Configuracion_crons
     * const configuracion_crons = await prisma.configuracion_cron.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configuracion_cronWithIdOnly = await prisma.configuracion_cron.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends configuracion_cronFindManyArgs>(args?: SelectSubset<T, configuracion_cronFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuracion_cron.
     * @param {configuracion_cronCreateArgs} args - Arguments to create a Configuracion_cron.
     * @example
     * // Create one Configuracion_cron
     * const Configuracion_cron = await prisma.configuracion_cron.create({
     *   data: {
     *     // ... data to create a Configuracion_cron
     *   }
     * })
     * 
     */
    create<T extends configuracion_cronCreateArgs>(args: SelectSubset<T, configuracion_cronCreateArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configuracion_crons.
     * @param {configuracion_cronCreateManyArgs} args - Arguments to create many Configuracion_crons.
     * @example
     * // Create many Configuracion_crons
     * const configuracion_cron = await prisma.configuracion_cron.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends configuracion_cronCreateManyArgs>(args?: SelectSubset<T, configuracion_cronCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Configuracion_cron.
     * @param {configuracion_cronDeleteArgs} args - Arguments to delete one Configuracion_cron.
     * @example
     * // Delete one Configuracion_cron
     * const Configuracion_cron = await prisma.configuracion_cron.delete({
     *   where: {
     *     // ... filter to delete one Configuracion_cron
     *   }
     * })
     * 
     */
    delete<T extends configuracion_cronDeleteArgs>(args: SelectSubset<T, configuracion_cronDeleteArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuracion_cron.
     * @param {configuracion_cronUpdateArgs} args - Arguments to update one Configuracion_cron.
     * @example
     * // Update one Configuracion_cron
     * const configuracion_cron = await prisma.configuracion_cron.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends configuracion_cronUpdateArgs>(args: SelectSubset<T, configuracion_cronUpdateArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configuracion_crons.
     * @param {configuracion_cronDeleteManyArgs} args - Arguments to filter Configuracion_crons to delete.
     * @example
     * // Delete a few Configuracion_crons
     * const { count } = await prisma.configuracion_cron.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends configuracion_cronDeleteManyArgs>(args?: SelectSubset<T, configuracion_cronDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configuracion_crons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_cronUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configuracion_crons
     * const configuracion_cron = await prisma.configuracion_cron.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends configuracion_cronUpdateManyArgs>(args: SelectSubset<T, configuracion_cronUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Configuracion_cron.
     * @param {configuracion_cronUpsertArgs} args - Arguments to update or create a Configuracion_cron.
     * @example
     * // Update or create a Configuracion_cron
     * const configuracion_cron = await prisma.configuracion_cron.upsert({
     *   create: {
     *     // ... data to create a Configuracion_cron
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuracion_cron we want to update
     *   }
     * })
     */
    upsert<T extends configuracion_cronUpsertArgs>(args: SelectSubset<T, configuracion_cronUpsertArgs<ExtArgs>>): Prisma__configuracion_cronClient<$Result.GetResult<Prisma.$configuracion_cronPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configuracion_crons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_cronCountArgs} args - Arguments to filter Configuracion_crons to count.
     * @example
     * // Count the number of Configuracion_crons
     * const count = await prisma.configuracion_cron.count({
     *   where: {
     *     // ... the filter for the Configuracion_crons we want to count
     *   }
     * })
    **/
    count<T extends configuracion_cronCountArgs>(
      args?: Subset<T, configuracion_cronCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Configuracion_cronCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuracion_cron.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Configuracion_cronAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Configuracion_cronAggregateArgs>(args: Subset<T, Configuracion_cronAggregateArgs>): Prisma.PrismaPromise<GetConfiguracion_cronAggregateType<T>>

    /**
     * Group by Configuracion_cron.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_cronGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends configuracion_cronGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: configuracion_cronGroupByArgs['orderBy'] }
        : { orderBy?: configuracion_cronGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, configuracion_cronGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfiguracion_cronGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the configuracion_cron model
   */
  readonly fields: configuracion_cronFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for configuracion_cron.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__configuracion_cronClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the configuracion_cron model
   */
  interface configuracion_cronFieldRefs {
    readonly id: FieldRef<"configuracion_cron", 'Int'>
    readonly nombre: FieldRef<"configuracion_cron", 'String'>
    readonly expresion_cron: FieldRef<"configuracion_cron", 'String'>
  }
    

  // Custom InputTypes
  /**
   * configuracion_cron findUnique
   */
  export type configuracion_cronFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_cron to fetch.
     */
    where: configuracion_cronWhereUniqueInput
  }

  /**
   * configuracion_cron findUniqueOrThrow
   */
  export type configuracion_cronFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_cron to fetch.
     */
    where: configuracion_cronWhereUniqueInput
  }

  /**
   * configuracion_cron findFirst
   */
  export type configuracion_cronFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_cron to fetch.
     */
    where?: configuracion_cronWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_crons to fetch.
     */
    orderBy?: configuracion_cronOrderByWithRelationInput | configuracion_cronOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for configuracion_crons.
     */
    cursor?: configuracion_cronWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_crons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_crons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of configuracion_crons.
     */
    distinct?: Configuracion_cronScalarFieldEnum | Configuracion_cronScalarFieldEnum[]
  }

  /**
   * configuracion_cron findFirstOrThrow
   */
  export type configuracion_cronFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_cron to fetch.
     */
    where?: configuracion_cronWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_crons to fetch.
     */
    orderBy?: configuracion_cronOrderByWithRelationInput | configuracion_cronOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for configuracion_crons.
     */
    cursor?: configuracion_cronWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_crons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_crons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of configuracion_crons.
     */
    distinct?: Configuracion_cronScalarFieldEnum | Configuracion_cronScalarFieldEnum[]
  }

  /**
   * configuracion_cron findMany
   */
  export type configuracion_cronFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_crons to fetch.
     */
    where?: configuracion_cronWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_crons to fetch.
     */
    orderBy?: configuracion_cronOrderByWithRelationInput | configuracion_cronOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing configuracion_crons.
     */
    cursor?: configuracion_cronWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_crons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_crons.
     */
    skip?: number
    distinct?: Configuracion_cronScalarFieldEnum | Configuracion_cronScalarFieldEnum[]
  }

  /**
   * configuracion_cron create
   */
  export type configuracion_cronCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * The data needed to create a configuracion_cron.
     */
    data?: XOR<configuracion_cronCreateInput, configuracion_cronUncheckedCreateInput>
  }

  /**
   * configuracion_cron createMany
   */
  export type configuracion_cronCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many configuracion_crons.
     */
    data: configuracion_cronCreateManyInput | configuracion_cronCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * configuracion_cron update
   */
  export type configuracion_cronUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * The data needed to update a configuracion_cron.
     */
    data: XOR<configuracion_cronUpdateInput, configuracion_cronUncheckedUpdateInput>
    /**
     * Choose, which configuracion_cron to update.
     */
    where: configuracion_cronWhereUniqueInput
  }

  /**
   * configuracion_cron updateMany
   */
  export type configuracion_cronUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update configuracion_crons.
     */
    data: XOR<configuracion_cronUpdateManyMutationInput, configuracion_cronUncheckedUpdateManyInput>
    /**
     * Filter which configuracion_crons to update
     */
    where?: configuracion_cronWhereInput
    /**
     * Limit how many configuracion_crons to update.
     */
    limit?: number
  }

  /**
   * configuracion_cron upsert
   */
  export type configuracion_cronUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * The filter to search for the configuracion_cron to update in case it exists.
     */
    where: configuracion_cronWhereUniqueInput
    /**
     * In case the configuracion_cron found by the `where` argument doesn't exist, create a new configuracion_cron with this data.
     */
    create: XOR<configuracion_cronCreateInput, configuracion_cronUncheckedCreateInput>
    /**
     * In case the configuracion_cron was found with the provided `where` argument, update it with this data.
     */
    update: XOR<configuracion_cronUpdateInput, configuracion_cronUncheckedUpdateInput>
  }

  /**
   * configuracion_cron delete
   */
  export type configuracion_cronDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
    /**
     * Filter which configuracion_cron to delete.
     */
    where: configuracion_cronWhereUniqueInput
  }

  /**
   * configuracion_cron deleteMany
   */
  export type configuracion_cronDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which configuracion_crons to delete
     */
    where?: configuracion_cronWhereInput
    /**
     * Limit how many configuracion_crons to delete.
     */
    limit?: number
  }

  /**
   * configuracion_cron without action
   */
  export type configuracion_cronDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_cron
     */
    select?: configuracion_cronSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_cron
     */
    omit?: configuracion_cronOmit<ExtArgs> | null
  }


  /**
   * Model configuracion_general
   */

  export type AggregateConfiguracion_general = {
    _count: Configuracion_generalCountAggregateOutputType | null
    _avg: Configuracion_generalAvgAggregateOutputType | null
    _sum: Configuracion_generalSumAggregateOutputType | null
    _min: Configuracion_generalMinAggregateOutputType | null
    _max: Configuracion_generalMaxAggregateOutputType | null
  }

  export type Configuracion_generalAvgAggregateOutputType = {
    id: number | null
  }

  export type Configuracion_generalSumAggregateOutputType = {
    id: number | null
  }

  export type Configuracion_generalMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    valor: string | null
  }

  export type Configuracion_generalMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    valor: string | null
  }

  export type Configuracion_generalCountAggregateOutputType = {
    id: number
    nombre: number
    valor: number
    _all: number
  }


  export type Configuracion_generalAvgAggregateInputType = {
    id?: true
  }

  export type Configuracion_generalSumAggregateInputType = {
    id?: true
  }

  export type Configuracion_generalMinAggregateInputType = {
    id?: true
    nombre?: true
    valor?: true
  }

  export type Configuracion_generalMaxAggregateInputType = {
    id?: true
    nombre?: true
    valor?: true
  }

  export type Configuracion_generalCountAggregateInputType = {
    id?: true
    nombre?: true
    valor?: true
    _all?: true
  }

  export type Configuracion_generalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which configuracion_general to aggregate.
     */
    where?: configuracion_generalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_generals to fetch.
     */
    orderBy?: configuracion_generalOrderByWithRelationInput | configuracion_generalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: configuracion_generalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_generals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_generals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned configuracion_generals
    **/
    _count?: true | Configuracion_generalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Configuracion_generalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Configuracion_generalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Configuracion_generalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Configuracion_generalMaxAggregateInputType
  }

  export type GetConfiguracion_generalAggregateType<T extends Configuracion_generalAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguracion_general]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguracion_general[P]>
      : GetScalarType<T[P], AggregateConfiguracion_general[P]>
  }




  export type configuracion_generalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: configuracion_generalWhereInput
    orderBy?: configuracion_generalOrderByWithAggregationInput | configuracion_generalOrderByWithAggregationInput[]
    by: Configuracion_generalScalarFieldEnum[] | Configuracion_generalScalarFieldEnum
    having?: configuracion_generalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Configuracion_generalCountAggregateInputType | true
    _avg?: Configuracion_generalAvgAggregateInputType
    _sum?: Configuracion_generalSumAggregateInputType
    _min?: Configuracion_generalMinAggregateInputType
    _max?: Configuracion_generalMaxAggregateInputType
  }

  export type Configuracion_generalGroupByOutputType = {
    id: number
    nombre: string | null
    valor: string | null
    _count: Configuracion_generalCountAggregateOutputType | null
    _avg: Configuracion_generalAvgAggregateOutputType | null
    _sum: Configuracion_generalSumAggregateOutputType | null
    _min: Configuracion_generalMinAggregateOutputType | null
    _max: Configuracion_generalMaxAggregateOutputType | null
  }

  type GetConfiguracion_generalGroupByPayload<T extends configuracion_generalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Configuracion_generalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Configuracion_generalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Configuracion_generalGroupByOutputType[P]>
            : GetScalarType<T[P], Configuracion_generalGroupByOutputType[P]>
        }
      >
    >


  export type configuracion_generalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    valor?: boolean
  }, ExtArgs["result"]["configuracion_general"]>



  export type configuracion_generalSelectScalar = {
    id?: boolean
    nombre?: boolean
    valor?: boolean
  }

  export type configuracion_generalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "valor", ExtArgs["result"]["configuracion_general"]>

  export type $configuracion_generalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "configuracion_general"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string | null
      valor: string | null
    }, ExtArgs["result"]["configuracion_general"]>
    composites: {}
  }

  type configuracion_generalGetPayload<S extends boolean | null | undefined | configuracion_generalDefaultArgs> = $Result.GetResult<Prisma.$configuracion_generalPayload, S>

  type configuracion_generalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<configuracion_generalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Configuracion_generalCountAggregateInputType | true
    }

  export interface configuracion_generalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['configuracion_general'], meta: { name: 'configuracion_general' } }
    /**
     * Find zero or one Configuracion_general that matches the filter.
     * @param {configuracion_generalFindUniqueArgs} args - Arguments to find a Configuracion_general
     * @example
     * // Get one Configuracion_general
     * const configuracion_general = await prisma.configuracion_general.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends configuracion_generalFindUniqueArgs>(args: SelectSubset<T, configuracion_generalFindUniqueArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuracion_general that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {configuracion_generalFindUniqueOrThrowArgs} args - Arguments to find a Configuracion_general
     * @example
     * // Get one Configuracion_general
     * const configuracion_general = await prisma.configuracion_general.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends configuracion_generalFindUniqueOrThrowArgs>(args: SelectSubset<T, configuracion_generalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion_general that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_generalFindFirstArgs} args - Arguments to find a Configuracion_general
     * @example
     * // Get one Configuracion_general
     * const configuracion_general = await prisma.configuracion_general.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends configuracion_generalFindFirstArgs>(args?: SelectSubset<T, configuracion_generalFindFirstArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion_general that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_generalFindFirstOrThrowArgs} args - Arguments to find a Configuracion_general
     * @example
     * // Get one Configuracion_general
     * const configuracion_general = await prisma.configuracion_general.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends configuracion_generalFindFirstOrThrowArgs>(args?: SelectSubset<T, configuracion_generalFindFirstOrThrowArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configuracion_generals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_generalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configuracion_generals
     * const configuracion_generals = await prisma.configuracion_general.findMany()
     * 
     * // Get first 10 Configuracion_generals
     * const configuracion_generals = await prisma.configuracion_general.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configuracion_generalWithIdOnly = await prisma.configuracion_general.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends configuracion_generalFindManyArgs>(args?: SelectSubset<T, configuracion_generalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuracion_general.
     * @param {configuracion_generalCreateArgs} args - Arguments to create a Configuracion_general.
     * @example
     * // Create one Configuracion_general
     * const Configuracion_general = await prisma.configuracion_general.create({
     *   data: {
     *     // ... data to create a Configuracion_general
     *   }
     * })
     * 
     */
    create<T extends configuracion_generalCreateArgs>(args: SelectSubset<T, configuracion_generalCreateArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configuracion_generals.
     * @param {configuracion_generalCreateManyArgs} args - Arguments to create many Configuracion_generals.
     * @example
     * // Create many Configuracion_generals
     * const configuracion_general = await prisma.configuracion_general.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends configuracion_generalCreateManyArgs>(args?: SelectSubset<T, configuracion_generalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Configuracion_general.
     * @param {configuracion_generalDeleteArgs} args - Arguments to delete one Configuracion_general.
     * @example
     * // Delete one Configuracion_general
     * const Configuracion_general = await prisma.configuracion_general.delete({
     *   where: {
     *     // ... filter to delete one Configuracion_general
     *   }
     * })
     * 
     */
    delete<T extends configuracion_generalDeleteArgs>(args: SelectSubset<T, configuracion_generalDeleteArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuracion_general.
     * @param {configuracion_generalUpdateArgs} args - Arguments to update one Configuracion_general.
     * @example
     * // Update one Configuracion_general
     * const configuracion_general = await prisma.configuracion_general.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends configuracion_generalUpdateArgs>(args: SelectSubset<T, configuracion_generalUpdateArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configuracion_generals.
     * @param {configuracion_generalDeleteManyArgs} args - Arguments to filter Configuracion_generals to delete.
     * @example
     * // Delete a few Configuracion_generals
     * const { count } = await prisma.configuracion_general.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends configuracion_generalDeleteManyArgs>(args?: SelectSubset<T, configuracion_generalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configuracion_generals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_generalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configuracion_generals
     * const configuracion_general = await prisma.configuracion_general.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends configuracion_generalUpdateManyArgs>(args: SelectSubset<T, configuracion_generalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Configuracion_general.
     * @param {configuracion_generalUpsertArgs} args - Arguments to update or create a Configuracion_general.
     * @example
     * // Update or create a Configuracion_general
     * const configuracion_general = await prisma.configuracion_general.upsert({
     *   create: {
     *     // ... data to create a Configuracion_general
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuracion_general we want to update
     *   }
     * })
     */
    upsert<T extends configuracion_generalUpsertArgs>(args: SelectSubset<T, configuracion_generalUpsertArgs<ExtArgs>>): Prisma__configuracion_generalClient<$Result.GetResult<Prisma.$configuracion_generalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configuracion_generals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_generalCountArgs} args - Arguments to filter Configuracion_generals to count.
     * @example
     * // Count the number of Configuracion_generals
     * const count = await prisma.configuracion_general.count({
     *   where: {
     *     // ... the filter for the Configuracion_generals we want to count
     *   }
     * })
    **/
    count<T extends configuracion_generalCountArgs>(
      args?: Subset<T, configuracion_generalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Configuracion_generalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuracion_general.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Configuracion_generalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Configuracion_generalAggregateArgs>(args: Subset<T, Configuracion_generalAggregateArgs>): Prisma.PrismaPromise<GetConfiguracion_generalAggregateType<T>>

    /**
     * Group by Configuracion_general.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_generalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends configuracion_generalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: configuracion_generalGroupByArgs['orderBy'] }
        : { orderBy?: configuracion_generalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, configuracion_generalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfiguracion_generalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the configuracion_general model
   */
  readonly fields: configuracion_generalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for configuracion_general.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__configuracion_generalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the configuracion_general model
   */
  interface configuracion_generalFieldRefs {
    readonly id: FieldRef<"configuracion_general", 'Int'>
    readonly nombre: FieldRef<"configuracion_general", 'String'>
    readonly valor: FieldRef<"configuracion_general", 'String'>
  }
    

  // Custom InputTypes
  /**
   * configuracion_general findUnique
   */
  export type configuracion_generalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_general to fetch.
     */
    where: configuracion_generalWhereUniqueInput
  }

  /**
   * configuracion_general findUniqueOrThrow
   */
  export type configuracion_generalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_general to fetch.
     */
    where: configuracion_generalWhereUniqueInput
  }

  /**
   * configuracion_general findFirst
   */
  export type configuracion_generalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_general to fetch.
     */
    where?: configuracion_generalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_generals to fetch.
     */
    orderBy?: configuracion_generalOrderByWithRelationInput | configuracion_generalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for configuracion_generals.
     */
    cursor?: configuracion_generalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_generals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_generals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of configuracion_generals.
     */
    distinct?: Configuracion_generalScalarFieldEnum | Configuracion_generalScalarFieldEnum[]
  }

  /**
   * configuracion_general findFirstOrThrow
   */
  export type configuracion_generalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_general to fetch.
     */
    where?: configuracion_generalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_generals to fetch.
     */
    orderBy?: configuracion_generalOrderByWithRelationInput | configuracion_generalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for configuracion_generals.
     */
    cursor?: configuracion_generalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_generals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_generals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of configuracion_generals.
     */
    distinct?: Configuracion_generalScalarFieldEnum | Configuracion_generalScalarFieldEnum[]
  }

  /**
   * configuracion_general findMany
   */
  export type configuracion_generalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_generals to fetch.
     */
    where?: configuracion_generalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_generals to fetch.
     */
    orderBy?: configuracion_generalOrderByWithRelationInput | configuracion_generalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing configuracion_generals.
     */
    cursor?: configuracion_generalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_generals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_generals.
     */
    skip?: number
    distinct?: Configuracion_generalScalarFieldEnum | Configuracion_generalScalarFieldEnum[]
  }

  /**
   * configuracion_general create
   */
  export type configuracion_generalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * The data needed to create a configuracion_general.
     */
    data?: XOR<configuracion_generalCreateInput, configuracion_generalUncheckedCreateInput>
  }

  /**
   * configuracion_general createMany
   */
  export type configuracion_generalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many configuracion_generals.
     */
    data: configuracion_generalCreateManyInput | configuracion_generalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * configuracion_general update
   */
  export type configuracion_generalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * The data needed to update a configuracion_general.
     */
    data: XOR<configuracion_generalUpdateInput, configuracion_generalUncheckedUpdateInput>
    /**
     * Choose, which configuracion_general to update.
     */
    where: configuracion_generalWhereUniqueInput
  }

  /**
   * configuracion_general updateMany
   */
  export type configuracion_generalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update configuracion_generals.
     */
    data: XOR<configuracion_generalUpdateManyMutationInput, configuracion_generalUncheckedUpdateManyInput>
    /**
     * Filter which configuracion_generals to update
     */
    where?: configuracion_generalWhereInput
    /**
     * Limit how many configuracion_generals to update.
     */
    limit?: number
  }

  /**
   * configuracion_general upsert
   */
  export type configuracion_generalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * The filter to search for the configuracion_general to update in case it exists.
     */
    where: configuracion_generalWhereUniqueInput
    /**
     * In case the configuracion_general found by the `where` argument doesn't exist, create a new configuracion_general with this data.
     */
    create: XOR<configuracion_generalCreateInput, configuracion_generalUncheckedCreateInput>
    /**
     * In case the configuracion_general was found with the provided `where` argument, update it with this data.
     */
    update: XOR<configuracion_generalUpdateInput, configuracion_generalUncheckedUpdateInput>
  }

  /**
   * configuracion_general delete
   */
  export type configuracion_generalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
    /**
     * Filter which configuracion_general to delete.
     */
    where: configuracion_generalWhereUniqueInput
  }

  /**
   * configuracion_general deleteMany
   */
  export type configuracion_generalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which configuracion_generals to delete
     */
    where?: configuracion_generalWhereInput
    /**
     * Limit how many configuracion_generals to delete.
     */
    limit?: number
  }

  /**
   * configuracion_general without action
   */
  export type configuracion_generalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_general
     */
    select?: configuracion_generalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_general
     */
    omit?: configuracion_generalOmit<ExtArgs> | null
  }


  /**
   * Model pedidos
   */

  export type AggregatePedidos = {
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  export type PedidosAvgAggregateOutputType = {
    id_pedido: number | null
    id_alumno: number | null
    sku: number | null
    id_cat_estatus: number | null
    ciclo: number | null
    mes: number | null
    anio: number | null
    pago: Decimal | null
    monto_real_pago: Decimal | null
  }

  export type PedidosSumAggregateOutputType = {
    id_pedido: number | null
    id_alumno: number | null
    sku: number | null
    id_cat_estatus: number | null
    ciclo: number | null
    mes: number | null
    anio: number | null
    pago: Decimal | null
    monto_real_pago: Decimal | null
  }

  export type PedidosMinAggregateOutputType = {
    id_pedido: number | null
    id_alumno: number | null
    identificador_pago: string | null
    identificador_pedido: string | null
    sku: number | null
    id_cat_estatus: number | null
    tipo_pago: string | null
    producto_servicio_motivo_pago: string | null
    concepto_pago: string | null
    ciclo: number | null
    mes: number | null
    anio: number | null
    pago: Decimal | null
    fecha_vigencia_pago: Date | null
    link_de_pago: string | null
    concepto: string | null
    transaccion_Id: string | null
    fecha_carga: Date | null
    fecha_pago: Date | null
    monto_real_pago: Decimal | null
  }

  export type PedidosMaxAggregateOutputType = {
    id_pedido: number | null
    id_alumno: number | null
    identificador_pago: string | null
    identificador_pedido: string | null
    sku: number | null
    id_cat_estatus: number | null
    tipo_pago: string | null
    producto_servicio_motivo_pago: string | null
    concepto_pago: string | null
    ciclo: number | null
    mes: number | null
    anio: number | null
    pago: Decimal | null
    fecha_vigencia_pago: Date | null
    link_de_pago: string | null
    concepto: string | null
    transaccion_Id: string | null
    fecha_carga: Date | null
    fecha_pago: Date | null
    monto_real_pago: Decimal | null
  }

  export type PedidosCountAggregateOutputType = {
    id_pedido: number
    id_alumno: number
    identificador_pago: number
    identificador_pedido: number
    sku: number
    id_cat_estatus: number
    tipo_pago: number
    producto_servicio_motivo_pago: number
    concepto_pago: number
    ciclo: number
    mes: number
    anio: number
    pago: number
    fecha_vigencia_pago: number
    link_de_pago: number
    concepto: number
    transaccion_Id: number
    fecha_carga: number
    fecha_pago: number
    monto_real_pago: number
    _all: number
  }


  export type PedidosAvgAggregateInputType = {
    id_pedido?: true
    id_alumno?: true
    sku?: true
    id_cat_estatus?: true
    ciclo?: true
    mes?: true
    anio?: true
    pago?: true
    monto_real_pago?: true
  }

  export type PedidosSumAggregateInputType = {
    id_pedido?: true
    id_alumno?: true
    sku?: true
    id_cat_estatus?: true
    ciclo?: true
    mes?: true
    anio?: true
    pago?: true
    monto_real_pago?: true
  }

  export type PedidosMinAggregateInputType = {
    id_pedido?: true
    id_alumno?: true
    identificador_pago?: true
    identificador_pedido?: true
    sku?: true
    id_cat_estatus?: true
    tipo_pago?: true
    producto_servicio_motivo_pago?: true
    concepto_pago?: true
    ciclo?: true
    mes?: true
    anio?: true
    pago?: true
    fecha_vigencia_pago?: true
    link_de_pago?: true
    concepto?: true
    transaccion_Id?: true
    fecha_carga?: true
    fecha_pago?: true
    monto_real_pago?: true
  }

  export type PedidosMaxAggregateInputType = {
    id_pedido?: true
    id_alumno?: true
    identificador_pago?: true
    identificador_pedido?: true
    sku?: true
    id_cat_estatus?: true
    tipo_pago?: true
    producto_servicio_motivo_pago?: true
    concepto_pago?: true
    ciclo?: true
    mes?: true
    anio?: true
    pago?: true
    fecha_vigencia_pago?: true
    link_de_pago?: true
    concepto?: true
    transaccion_Id?: true
    fecha_carga?: true
    fecha_pago?: true
    monto_real_pago?: true
  }

  export type PedidosCountAggregateInputType = {
    id_pedido?: true
    id_alumno?: true
    identificador_pago?: true
    identificador_pedido?: true
    sku?: true
    id_cat_estatus?: true
    tipo_pago?: true
    producto_servicio_motivo_pago?: true
    concepto_pago?: true
    ciclo?: true
    mes?: true
    anio?: true
    pago?: true
    fecha_vigencia_pago?: true
    link_de_pago?: true
    concepto?: true
    transaccion_Id?: true
    fecha_carga?: true
    fecha_pago?: true
    monto_real_pago?: true
    _all?: true
  }

  export type PedidosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedidos to aggregate.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pedidos
    **/
    _count?: true | PedidosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidosMaxAggregateInputType
  }

  export type GetPedidosAggregateType<T extends PedidosAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidos[P]>
      : GetScalarType<T[P], AggregatePedidos[P]>
  }




  export type pedidosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithAggregationInput | pedidosOrderByWithAggregationInput[]
    by: PedidosScalarFieldEnum[] | PedidosScalarFieldEnum
    having?: pedidosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidosCountAggregateInputType | true
    _avg?: PedidosAvgAggregateInputType
    _sum?: PedidosSumAggregateInputType
    _min?: PedidosMinAggregateInputType
    _max?: PedidosMaxAggregateInputType
  }

  export type PedidosGroupByOutputType = {
    id_pedido: number
    id_alumno: number
    identificador_pago: string | null
    identificador_pedido: string | null
    sku: number | null
    id_cat_estatus: number
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago: Decimal | null
    fecha_vigencia_pago: Date | null
    link_de_pago: string | null
    concepto: string | null
    transaccion_Id: string | null
    fecha_carga: Date | null
    fecha_pago: Date | null
    monto_real_pago: Decimal | null
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  type GetPedidosGroupByPayload<T extends pedidosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidosGroupByOutputType[P]>
            : GetScalarType<T[P], PedidosGroupByOutputType[P]>
        }
      >
    >


  export type pedidosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_pedido?: boolean
    id_alumno?: boolean
    identificador_pago?: boolean
    identificador_pedido?: boolean
    sku?: boolean
    id_cat_estatus?: boolean
    tipo_pago?: boolean
    producto_servicio_motivo_pago?: boolean
    concepto_pago?: boolean
    ciclo?: boolean
    mes?: boolean
    anio?: boolean
    pago?: boolean
    fecha_vigencia_pago?: boolean
    link_de_pago?: boolean
    concepto?: boolean
    transaccion_Id?: boolean
    fecha_carga?: boolean
    fecha_pago?: boolean
    monto_real_pago?: boolean
    alumno?: boolean | alumnoDefaultArgs<ExtArgs>
    cat_estatus?: boolean | cat_estatusDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>



  export type pedidosSelectScalar = {
    id_pedido?: boolean
    id_alumno?: boolean
    identificador_pago?: boolean
    identificador_pedido?: boolean
    sku?: boolean
    id_cat_estatus?: boolean
    tipo_pago?: boolean
    producto_servicio_motivo_pago?: boolean
    concepto_pago?: boolean
    ciclo?: boolean
    mes?: boolean
    anio?: boolean
    pago?: boolean
    fecha_vigencia_pago?: boolean
    link_de_pago?: boolean
    concepto?: boolean
    transaccion_Id?: boolean
    fecha_carga?: boolean
    fecha_pago?: boolean
    monto_real_pago?: boolean
  }

  export type pedidosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_pedido" | "id_alumno" | "identificador_pago" | "identificador_pedido" | "sku" | "id_cat_estatus" | "tipo_pago" | "producto_servicio_motivo_pago" | "concepto_pago" | "ciclo" | "mes" | "anio" | "pago" | "fecha_vigencia_pago" | "link_de_pago" | "concepto" | "transaccion_Id" | "fecha_carga" | "fecha_pago" | "monto_real_pago", ExtArgs["result"]["pedidos"]>
  export type pedidosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alumno?: boolean | alumnoDefaultArgs<ExtArgs>
    cat_estatus?: boolean | cat_estatusDefaultArgs<ExtArgs>
  }

  export type $pedidosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pedidos"
    objects: {
      alumno: Prisma.$alumnoPayload<ExtArgs>
      cat_estatus: Prisma.$cat_estatusPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_pedido: number
      id_alumno: number
      identificador_pago: string | null
      identificador_pedido: string | null
      sku: number | null
      id_cat_estatus: number
      tipo_pago: string
      producto_servicio_motivo_pago: string
      concepto_pago: string
      ciclo: number
      mes: number
      anio: number
      pago: Prisma.Decimal | null
      fecha_vigencia_pago: Date | null
      link_de_pago: string | null
      concepto: string | null
      transaccion_Id: string | null
      fecha_carga: Date | null
      fecha_pago: Date | null
      monto_real_pago: Prisma.Decimal | null
    }, ExtArgs["result"]["pedidos"]>
    composites: {}
  }

  type pedidosGetPayload<S extends boolean | null | undefined | pedidosDefaultArgs> = $Result.GetResult<Prisma.$pedidosPayload, S>

  type pedidosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pedidosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidosCountAggregateInputType | true
    }

  export interface pedidosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pedidos'], meta: { name: 'pedidos' } }
    /**
     * Find zero or one Pedidos that matches the filter.
     * @param {pedidosFindUniqueArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pedidosFindUniqueArgs>(args: SelectSubset<T, pedidosFindUniqueArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedidos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pedidosFindUniqueOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pedidosFindUniqueOrThrowArgs>(args: SelectSubset<T, pedidosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindFirstArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pedidosFindFirstArgs>(args?: SelectSubset<T, pedidosFindFirstArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindFirstOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pedidosFindFirstOrThrowArgs>(args?: SelectSubset<T, pedidosFindFirstOrThrowArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedidos.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedidos.findMany({ take: 10 })
     * 
     * // Only select the `id_pedido`
     * const pedidosWithId_pedidoOnly = await prisma.pedidos.findMany({ select: { id_pedido: true } })
     * 
     */
    findMany<T extends pedidosFindManyArgs>(args?: SelectSubset<T, pedidosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedidos.
     * @param {pedidosCreateArgs} args - Arguments to create a Pedidos.
     * @example
     * // Create one Pedidos
     * const Pedidos = await prisma.pedidos.create({
     *   data: {
     *     // ... data to create a Pedidos
     *   }
     * })
     * 
     */
    create<T extends pedidosCreateArgs>(args: SelectSubset<T, pedidosCreateArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {pedidosCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pedidosCreateManyArgs>(args?: SelectSubset<T, pedidosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pedidos.
     * @param {pedidosDeleteArgs} args - Arguments to delete one Pedidos.
     * @example
     * // Delete one Pedidos
     * const Pedidos = await prisma.pedidos.delete({
     *   where: {
     *     // ... filter to delete one Pedidos
     *   }
     * })
     * 
     */
    delete<T extends pedidosDeleteArgs>(args: SelectSubset<T, pedidosDeleteArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedidos.
     * @param {pedidosUpdateArgs} args - Arguments to update one Pedidos.
     * @example
     * // Update one Pedidos
     * const pedidos = await prisma.pedidos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pedidosUpdateArgs>(args: SelectSubset<T, pedidosUpdateArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {pedidosDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedidos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pedidosDeleteManyArgs>(args?: SelectSubset<T, pedidosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pedidosUpdateManyArgs>(args: SelectSubset<T, pedidosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pedidos.
     * @param {pedidosUpsertArgs} args - Arguments to update or create a Pedidos.
     * @example
     * // Update or create a Pedidos
     * const pedidos = await prisma.pedidos.upsert({
     *   create: {
     *     // ... data to create a Pedidos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedidos we want to update
     *   }
     * })
     */
    upsert<T extends pedidosUpsertArgs>(args: SelectSubset<T, pedidosUpsertArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedidos.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends pedidosCountArgs>(
      args?: Subset<T, pedidosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidosAggregateArgs>(args: Subset<T, PedidosAggregateArgs>): Prisma.PrismaPromise<GetPedidosAggregateType<T>>

    /**
     * Group by Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pedidosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pedidosGroupByArgs['orderBy'] }
        : { orderBy?: pedidosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pedidosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pedidos model
   */
  readonly fields: pedidosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pedidos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pedidosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alumno<T extends alumnoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, alumnoDefaultArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cat_estatus<T extends cat_estatusDefaultArgs<ExtArgs> = {}>(args?: Subset<T, cat_estatusDefaultArgs<ExtArgs>>): Prisma__cat_estatusClient<$Result.GetResult<Prisma.$cat_estatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pedidos model
   */
  interface pedidosFieldRefs {
    readonly id_pedido: FieldRef<"pedidos", 'Int'>
    readonly id_alumno: FieldRef<"pedidos", 'Int'>
    readonly identificador_pago: FieldRef<"pedidos", 'String'>
    readonly identificador_pedido: FieldRef<"pedidos", 'String'>
    readonly sku: FieldRef<"pedidos", 'Int'>
    readonly id_cat_estatus: FieldRef<"pedidos", 'Int'>
    readonly tipo_pago: FieldRef<"pedidos", 'String'>
    readonly producto_servicio_motivo_pago: FieldRef<"pedidos", 'String'>
    readonly concepto_pago: FieldRef<"pedidos", 'String'>
    readonly ciclo: FieldRef<"pedidos", 'Int'>
    readonly mes: FieldRef<"pedidos", 'Int'>
    readonly anio: FieldRef<"pedidos", 'Int'>
    readonly pago: FieldRef<"pedidos", 'Decimal'>
    readonly fecha_vigencia_pago: FieldRef<"pedidos", 'DateTime'>
    readonly link_de_pago: FieldRef<"pedidos", 'String'>
    readonly concepto: FieldRef<"pedidos", 'String'>
    readonly transaccion_Id: FieldRef<"pedidos", 'String'>
    readonly fecha_carga: FieldRef<"pedidos", 'DateTime'>
    readonly fecha_pago: FieldRef<"pedidos", 'DateTime'>
    readonly monto_real_pago: FieldRef<"pedidos", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * pedidos findUnique
   */
  export type pedidosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos findUniqueOrThrow
   */
  export type pedidosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos findFirst
   */
  export type pedidosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos findFirstOrThrow
   */
  export type pedidosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos findMany
   */
  export type pedidosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos create
   */
  export type pedidosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The data needed to create a pedidos.
     */
    data: XOR<pedidosCreateInput, pedidosUncheckedCreateInput>
  }

  /**
   * pedidos createMany
   */
  export type pedidosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pedidos.
     */
    data: pedidosCreateManyInput | pedidosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pedidos update
   */
  export type pedidosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The data needed to update a pedidos.
     */
    data: XOR<pedidosUpdateInput, pedidosUncheckedUpdateInput>
    /**
     * Choose, which pedidos to update.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos updateMany
   */
  export type pedidosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pedidos.
     */
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyInput>
    /**
     * Filter which pedidos to update
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to update.
     */
    limit?: number
  }

  /**
   * pedidos upsert
   */
  export type pedidosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The filter to search for the pedidos to update in case it exists.
     */
    where: pedidosWhereUniqueInput
    /**
     * In case the pedidos found by the `where` argument doesn't exist, create a new pedidos with this data.
     */
    create: XOR<pedidosCreateInput, pedidosUncheckedCreateInput>
    /**
     * In case the pedidos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pedidosUpdateInput, pedidosUncheckedUpdateInput>
  }

  /**
   * pedidos delete
   */
  export type pedidosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter which pedidos to delete.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos deleteMany
   */
  export type pedidosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedidos to delete
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to delete.
     */
    limit?: number
  }

  /**
   * pedidos without action
   */
  export type pedidosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
  }


  /**
   * Model tarjetas
   */

  export type AggregateTarjetas = {
    _count: TarjetasCountAggregateOutputType | null
    _avg: TarjetasAvgAggregateOutputType | null
    _sum: TarjetasSumAggregateOutputType | null
    _min: TarjetasMinAggregateOutputType | null
    _max: TarjetasMaxAggregateOutputType | null
  }

  export type TarjetasAvgAggregateOutputType = {
    id: number | null
    id_alumno: number | null
  }

  export type TarjetasSumAggregateOutputType = {
    id: number | null
    id_alumno: number | null
  }

  export type TarjetasMinAggregateOutputType = {
    id: number | null
    numero_tarjeta: string | null
    token: string | null
    id_alumno: number | null
    nombre_tarjeta: string | null
    tipo: string | null
    activa: boolean | null
    titular: string | null
    vencimiento: string | null
    eliminada: boolean | null
    telefono: string | null
    ciudad: string | null
    postal: string | null
  }

  export type TarjetasMaxAggregateOutputType = {
    id: number | null
    numero_tarjeta: string | null
    token: string | null
    id_alumno: number | null
    nombre_tarjeta: string | null
    tipo: string | null
    activa: boolean | null
    titular: string | null
    vencimiento: string | null
    eliminada: boolean | null
    telefono: string | null
    ciudad: string | null
    postal: string | null
  }

  export type TarjetasCountAggregateOutputType = {
    id: number
    numero_tarjeta: number
    token: number
    id_alumno: number
    nombre_tarjeta: number
    tipo: number
    activa: number
    titular: number
    vencimiento: number
    eliminada: number
    telefono: number
    ciudad: number
    postal: number
    _all: number
  }


  export type TarjetasAvgAggregateInputType = {
    id?: true
    id_alumno?: true
  }

  export type TarjetasSumAggregateInputType = {
    id?: true
    id_alumno?: true
  }

  export type TarjetasMinAggregateInputType = {
    id?: true
    numero_tarjeta?: true
    token?: true
    id_alumno?: true
    nombre_tarjeta?: true
    tipo?: true
    activa?: true
    titular?: true
    vencimiento?: true
    eliminada?: true
    telefono?: true
    ciudad?: true
    postal?: true
  }

  export type TarjetasMaxAggregateInputType = {
    id?: true
    numero_tarjeta?: true
    token?: true
    id_alumno?: true
    nombre_tarjeta?: true
    tipo?: true
    activa?: true
    titular?: true
    vencimiento?: true
    eliminada?: true
    telefono?: true
    ciudad?: true
    postal?: true
  }

  export type TarjetasCountAggregateInputType = {
    id?: true
    numero_tarjeta?: true
    token?: true
    id_alumno?: true
    nombre_tarjeta?: true
    tipo?: true
    activa?: true
    titular?: true
    vencimiento?: true
    eliminada?: true
    telefono?: true
    ciudad?: true
    postal?: true
    _all?: true
  }

  export type TarjetasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tarjetas to aggregate.
     */
    where?: tarjetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tarjetas to fetch.
     */
    orderBy?: tarjetasOrderByWithRelationInput | tarjetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tarjetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tarjetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tarjetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tarjetas
    **/
    _count?: true | TarjetasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TarjetasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TarjetasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TarjetasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TarjetasMaxAggregateInputType
  }

  export type GetTarjetasAggregateType<T extends TarjetasAggregateArgs> = {
        [P in keyof T & keyof AggregateTarjetas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTarjetas[P]>
      : GetScalarType<T[P], AggregateTarjetas[P]>
  }




  export type tarjetasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tarjetasWhereInput
    orderBy?: tarjetasOrderByWithAggregationInput | tarjetasOrderByWithAggregationInput[]
    by: TarjetasScalarFieldEnum[] | TarjetasScalarFieldEnum
    having?: tarjetasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TarjetasCountAggregateInputType | true
    _avg?: TarjetasAvgAggregateInputType
    _sum?: TarjetasSumAggregateInputType
    _min?: TarjetasMinAggregateInputType
    _max?: TarjetasMaxAggregateInputType
  }

  export type TarjetasGroupByOutputType = {
    id: number
    numero_tarjeta: string
    token: string
    id_alumno: number
    nombre_tarjeta: string
    tipo: string
    activa: boolean
    titular: string
    vencimiento: string
    eliminada: boolean
    telefono: string
    ciudad: string
    postal: string
    _count: TarjetasCountAggregateOutputType | null
    _avg: TarjetasAvgAggregateOutputType | null
    _sum: TarjetasSumAggregateOutputType | null
    _min: TarjetasMinAggregateOutputType | null
    _max: TarjetasMaxAggregateOutputType | null
  }

  type GetTarjetasGroupByPayload<T extends tarjetasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TarjetasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TarjetasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TarjetasGroupByOutputType[P]>
            : GetScalarType<T[P], TarjetasGroupByOutputType[P]>
        }
      >
    >


  export type tarjetasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero_tarjeta?: boolean
    token?: boolean
    id_alumno?: boolean
    nombre_tarjeta?: boolean
    tipo?: boolean
    activa?: boolean
    titular?: boolean
    vencimiento?: boolean
    eliminada?: boolean
    telefono?: boolean
    ciudad?: boolean
    postal?: boolean
    alumno?: boolean | alumnoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tarjetas"]>



  export type tarjetasSelectScalar = {
    id?: boolean
    numero_tarjeta?: boolean
    token?: boolean
    id_alumno?: boolean
    nombre_tarjeta?: boolean
    tipo?: boolean
    activa?: boolean
    titular?: boolean
    vencimiento?: boolean
    eliminada?: boolean
    telefono?: boolean
    ciudad?: boolean
    postal?: boolean
  }

  export type tarjetasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero_tarjeta" | "token" | "id_alumno" | "nombre_tarjeta" | "tipo" | "activa" | "titular" | "vencimiento" | "eliminada" | "telefono" | "ciudad" | "postal", ExtArgs["result"]["tarjetas"]>
  export type tarjetasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alumno?: boolean | alumnoDefaultArgs<ExtArgs>
  }

  export type $tarjetasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tarjetas"
    objects: {
      alumno: Prisma.$alumnoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numero_tarjeta: string
      token: string
      id_alumno: number
      nombre_tarjeta: string
      tipo: string
      activa: boolean
      titular: string
      vencimiento: string
      eliminada: boolean
      telefono: string
      ciudad: string
      postal: string
    }, ExtArgs["result"]["tarjetas"]>
    composites: {}
  }

  type tarjetasGetPayload<S extends boolean | null | undefined | tarjetasDefaultArgs> = $Result.GetResult<Prisma.$tarjetasPayload, S>

  type tarjetasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tarjetasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TarjetasCountAggregateInputType | true
    }

  export interface tarjetasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tarjetas'], meta: { name: 'tarjetas' } }
    /**
     * Find zero or one Tarjetas that matches the filter.
     * @param {tarjetasFindUniqueArgs} args - Arguments to find a Tarjetas
     * @example
     * // Get one Tarjetas
     * const tarjetas = await prisma.tarjetas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tarjetasFindUniqueArgs>(args: SelectSubset<T, tarjetasFindUniqueArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tarjetas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tarjetasFindUniqueOrThrowArgs} args - Arguments to find a Tarjetas
     * @example
     * // Get one Tarjetas
     * const tarjetas = await prisma.tarjetas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tarjetasFindUniqueOrThrowArgs>(args: SelectSubset<T, tarjetasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tarjetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tarjetasFindFirstArgs} args - Arguments to find a Tarjetas
     * @example
     * // Get one Tarjetas
     * const tarjetas = await prisma.tarjetas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tarjetasFindFirstArgs>(args?: SelectSubset<T, tarjetasFindFirstArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tarjetas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tarjetasFindFirstOrThrowArgs} args - Arguments to find a Tarjetas
     * @example
     * // Get one Tarjetas
     * const tarjetas = await prisma.tarjetas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tarjetasFindFirstOrThrowArgs>(args?: SelectSubset<T, tarjetasFindFirstOrThrowArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tarjetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tarjetasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tarjetas
     * const tarjetas = await prisma.tarjetas.findMany()
     * 
     * // Get first 10 Tarjetas
     * const tarjetas = await prisma.tarjetas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tarjetasWithIdOnly = await prisma.tarjetas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tarjetasFindManyArgs>(args?: SelectSubset<T, tarjetasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tarjetas.
     * @param {tarjetasCreateArgs} args - Arguments to create a Tarjetas.
     * @example
     * // Create one Tarjetas
     * const Tarjetas = await prisma.tarjetas.create({
     *   data: {
     *     // ... data to create a Tarjetas
     *   }
     * })
     * 
     */
    create<T extends tarjetasCreateArgs>(args: SelectSubset<T, tarjetasCreateArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tarjetas.
     * @param {tarjetasCreateManyArgs} args - Arguments to create many Tarjetas.
     * @example
     * // Create many Tarjetas
     * const tarjetas = await prisma.tarjetas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tarjetasCreateManyArgs>(args?: SelectSubset<T, tarjetasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tarjetas.
     * @param {tarjetasDeleteArgs} args - Arguments to delete one Tarjetas.
     * @example
     * // Delete one Tarjetas
     * const Tarjetas = await prisma.tarjetas.delete({
     *   where: {
     *     // ... filter to delete one Tarjetas
     *   }
     * })
     * 
     */
    delete<T extends tarjetasDeleteArgs>(args: SelectSubset<T, tarjetasDeleteArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tarjetas.
     * @param {tarjetasUpdateArgs} args - Arguments to update one Tarjetas.
     * @example
     * // Update one Tarjetas
     * const tarjetas = await prisma.tarjetas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tarjetasUpdateArgs>(args: SelectSubset<T, tarjetasUpdateArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tarjetas.
     * @param {tarjetasDeleteManyArgs} args - Arguments to filter Tarjetas to delete.
     * @example
     * // Delete a few Tarjetas
     * const { count } = await prisma.tarjetas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tarjetasDeleteManyArgs>(args?: SelectSubset<T, tarjetasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tarjetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tarjetasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tarjetas
     * const tarjetas = await prisma.tarjetas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tarjetasUpdateManyArgs>(args: SelectSubset<T, tarjetasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tarjetas.
     * @param {tarjetasUpsertArgs} args - Arguments to update or create a Tarjetas.
     * @example
     * // Update or create a Tarjetas
     * const tarjetas = await prisma.tarjetas.upsert({
     *   create: {
     *     // ... data to create a Tarjetas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tarjetas we want to update
     *   }
     * })
     */
    upsert<T extends tarjetasUpsertArgs>(args: SelectSubset<T, tarjetasUpsertArgs<ExtArgs>>): Prisma__tarjetasClient<$Result.GetResult<Prisma.$tarjetasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tarjetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tarjetasCountArgs} args - Arguments to filter Tarjetas to count.
     * @example
     * // Count the number of Tarjetas
     * const count = await prisma.tarjetas.count({
     *   where: {
     *     // ... the filter for the Tarjetas we want to count
     *   }
     * })
    **/
    count<T extends tarjetasCountArgs>(
      args?: Subset<T, tarjetasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TarjetasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tarjetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TarjetasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TarjetasAggregateArgs>(args: Subset<T, TarjetasAggregateArgs>): Prisma.PrismaPromise<GetTarjetasAggregateType<T>>

    /**
     * Group by Tarjetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tarjetasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tarjetasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tarjetasGroupByArgs['orderBy'] }
        : { orderBy?: tarjetasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tarjetasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTarjetasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tarjetas model
   */
  readonly fields: tarjetasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tarjetas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tarjetasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alumno<T extends alumnoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, alumnoDefaultArgs<ExtArgs>>): Prisma__alumnoClient<$Result.GetResult<Prisma.$alumnoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tarjetas model
   */
  interface tarjetasFieldRefs {
    readonly id: FieldRef<"tarjetas", 'Int'>
    readonly numero_tarjeta: FieldRef<"tarjetas", 'String'>
    readonly token: FieldRef<"tarjetas", 'String'>
    readonly id_alumno: FieldRef<"tarjetas", 'Int'>
    readonly nombre_tarjeta: FieldRef<"tarjetas", 'String'>
    readonly tipo: FieldRef<"tarjetas", 'String'>
    readonly activa: FieldRef<"tarjetas", 'Boolean'>
    readonly titular: FieldRef<"tarjetas", 'String'>
    readonly vencimiento: FieldRef<"tarjetas", 'String'>
    readonly eliminada: FieldRef<"tarjetas", 'Boolean'>
    readonly telefono: FieldRef<"tarjetas", 'String'>
    readonly ciudad: FieldRef<"tarjetas", 'String'>
    readonly postal: FieldRef<"tarjetas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tarjetas findUnique
   */
  export type tarjetasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * Filter, which tarjetas to fetch.
     */
    where: tarjetasWhereUniqueInput
  }

  /**
   * tarjetas findUniqueOrThrow
   */
  export type tarjetasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * Filter, which tarjetas to fetch.
     */
    where: tarjetasWhereUniqueInput
  }

  /**
   * tarjetas findFirst
   */
  export type tarjetasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * Filter, which tarjetas to fetch.
     */
    where?: tarjetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tarjetas to fetch.
     */
    orderBy?: tarjetasOrderByWithRelationInput | tarjetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tarjetas.
     */
    cursor?: tarjetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tarjetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tarjetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tarjetas.
     */
    distinct?: TarjetasScalarFieldEnum | TarjetasScalarFieldEnum[]
  }

  /**
   * tarjetas findFirstOrThrow
   */
  export type tarjetasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * Filter, which tarjetas to fetch.
     */
    where?: tarjetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tarjetas to fetch.
     */
    orderBy?: tarjetasOrderByWithRelationInput | tarjetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tarjetas.
     */
    cursor?: tarjetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tarjetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tarjetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tarjetas.
     */
    distinct?: TarjetasScalarFieldEnum | TarjetasScalarFieldEnum[]
  }

  /**
   * tarjetas findMany
   */
  export type tarjetasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * Filter, which tarjetas to fetch.
     */
    where?: tarjetasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tarjetas to fetch.
     */
    orderBy?: tarjetasOrderByWithRelationInput | tarjetasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tarjetas.
     */
    cursor?: tarjetasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tarjetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tarjetas.
     */
    skip?: number
    distinct?: TarjetasScalarFieldEnum | TarjetasScalarFieldEnum[]
  }

  /**
   * tarjetas create
   */
  export type tarjetasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * The data needed to create a tarjetas.
     */
    data: XOR<tarjetasCreateInput, tarjetasUncheckedCreateInput>
  }

  /**
   * tarjetas createMany
   */
  export type tarjetasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tarjetas.
     */
    data: tarjetasCreateManyInput | tarjetasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tarjetas update
   */
  export type tarjetasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * The data needed to update a tarjetas.
     */
    data: XOR<tarjetasUpdateInput, tarjetasUncheckedUpdateInput>
    /**
     * Choose, which tarjetas to update.
     */
    where: tarjetasWhereUniqueInput
  }

  /**
   * tarjetas updateMany
   */
  export type tarjetasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tarjetas.
     */
    data: XOR<tarjetasUpdateManyMutationInput, tarjetasUncheckedUpdateManyInput>
    /**
     * Filter which tarjetas to update
     */
    where?: tarjetasWhereInput
    /**
     * Limit how many tarjetas to update.
     */
    limit?: number
  }

  /**
   * tarjetas upsert
   */
  export type tarjetasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * The filter to search for the tarjetas to update in case it exists.
     */
    where: tarjetasWhereUniqueInput
    /**
     * In case the tarjetas found by the `where` argument doesn't exist, create a new tarjetas with this data.
     */
    create: XOR<tarjetasCreateInput, tarjetasUncheckedCreateInput>
    /**
     * In case the tarjetas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tarjetasUpdateInput, tarjetasUncheckedUpdateInput>
  }

  /**
   * tarjetas delete
   */
  export type tarjetasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
    /**
     * Filter which tarjetas to delete.
     */
    where: tarjetasWhereUniqueInput
  }

  /**
   * tarjetas deleteMany
   */
  export type tarjetasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tarjetas to delete
     */
    where?: tarjetasWhereInput
    /**
     * Limit how many tarjetas to delete.
     */
    limit?: number
  }

  /**
   * tarjetas without action
   */
  export type tarjetasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tarjetas
     */
    select?: tarjetasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tarjetas
     */
    omit?: tarjetasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tarjetasInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AlumnoScalarFieldEnum: {
    id_alumno: 'id_alumno',
    matricula: 'matricula',
    nombre: 'nombre',
    apellido_paterno: 'apellido_paterno',
    apellido_materno: 'apellido_materno',
    email: 'email',
    celular: 'celular',
    open_pay_id: 'open_pay_id',
    fecha_alta: 'fecha_alta',
    fecha_modificacion: 'fecha_modificacion'
  };

  export type AlumnoScalarFieldEnum = (typeof AlumnoScalarFieldEnum)[keyof typeof AlumnoScalarFieldEnum]


  export const Cat_estatusScalarFieldEnum: {
    id_cat_estatus: 'id_cat_estatus',
    clave: 'clave',
    descripcion: 'descripcion',
    valor: 'valor'
  };

  export type Cat_estatusScalarFieldEnum = (typeof Cat_estatusScalarFieldEnum)[keyof typeof Cat_estatusScalarFieldEnum]


  export const Configuracion_cronScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    expresion_cron: 'expresion_cron'
  };

  export type Configuracion_cronScalarFieldEnum = (typeof Configuracion_cronScalarFieldEnum)[keyof typeof Configuracion_cronScalarFieldEnum]


  export const Configuracion_generalScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    valor: 'valor'
  };

  export type Configuracion_generalScalarFieldEnum = (typeof Configuracion_generalScalarFieldEnum)[keyof typeof Configuracion_generalScalarFieldEnum]


  export const PedidosScalarFieldEnum: {
    id_pedido: 'id_pedido',
    id_alumno: 'id_alumno',
    identificador_pago: 'identificador_pago',
    identificador_pedido: 'identificador_pedido',
    sku: 'sku',
    id_cat_estatus: 'id_cat_estatus',
    tipo_pago: 'tipo_pago',
    producto_servicio_motivo_pago: 'producto_servicio_motivo_pago',
    concepto_pago: 'concepto_pago',
    ciclo: 'ciclo',
    mes: 'mes',
    anio: 'anio',
    pago: 'pago',
    fecha_vigencia_pago: 'fecha_vigencia_pago',
    link_de_pago: 'link_de_pago',
    concepto: 'concepto',
    transaccion_Id: 'transaccion_Id',
    fecha_carga: 'fecha_carga',
    fecha_pago: 'fecha_pago',
    monto_real_pago: 'monto_real_pago'
  };

  export type PedidosScalarFieldEnum = (typeof PedidosScalarFieldEnum)[keyof typeof PedidosScalarFieldEnum]


  export const TarjetasScalarFieldEnum: {
    id: 'id',
    numero_tarjeta: 'numero_tarjeta',
    token: 'token',
    id_alumno: 'id_alumno',
    nombre_tarjeta: 'nombre_tarjeta',
    tipo: 'tipo',
    activa: 'activa',
    titular: 'titular',
    vencimiento: 'vencimiento',
    eliminada: 'eliminada',
    telefono: 'telefono',
    ciudad: 'ciudad',
    postal: 'postal'
  };

  export type TarjetasScalarFieldEnum = (typeof TarjetasScalarFieldEnum)[keyof typeof TarjetasScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const alumnoOrderByRelevanceFieldEnum: {
    matricula: 'matricula',
    nombre: 'nombre',
    apellido_paterno: 'apellido_paterno',
    apellido_materno: 'apellido_materno',
    email: 'email',
    celular: 'celular',
    open_pay_id: 'open_pay_id'
  };

  export type alumnoOrderByRelevanceFieldEnum = (typeof alumnoOrderByRelevanceFieldEnum)[keyof typeof alumnoOrderByRelevanceFieldEnum]


  export const cat_estatusOrderByRelevanceFieldEnum: {
    clave: 'clave',
    descripcion: 'descripcion'
  };

  export type cat_estatusOrderByRelevanceFieldEnum = (typeof cat_estatusOrderByRelevanceFieldEnum)[keyof typeof cat_estatusOrderByRelevanceFieldEnum]


  export const configuracion_cronOrderByRelevanceFieldEnum: {
    nombre: 'nombre',
    expresion_cron: 'expresion_cron'
  };

  export type configuracion_cronOrderByRelevanceFieldEnum = (typeof configuracion_cronOrderByRelevanceFieldEnum)[keyof typeof configuracion_cronOrderByRelevanceFieldEnum]


  export const configuracion_generalOrderByRelevanceFieldEnum: {
    nombre: 'nombre',
    valor: 'valor'
  };

  export type configuracion_generalOrderByRelevanceFieldEnum = (typeof configuracion_generalOrderByRelevanceFieldEnum)[keyof typeof configuracion_generalOrderByRelevanceFieldEnum]


  export const pedidosOrderByRelevanceFieldEnum: {
    identificador_pago: 'identificador_pago',
    identificador_pedido: 'identificador_pedido',
    tipo_pago: 'tipo_pago',
    producto_servicio_motivo_pago: 'producto_servicio_motivo_pago',
    concepto_pago: 'concepto_pago',
    link_de_pago: 'link_de_pago',
    concepto: 'concepto',
    transaccion_Id: 'transaccion_Id'
  };

  export type pedidosOrderByRelevanceFieldEnum = (typeof pedidosOrderByRelevanceFieldEnum)[keyof typeof pedidosOrderByRelevanceFieldEnum]


  export const tarjetasOrderByRelevanceFieldEnum: {
    numero_tarjeta: 'numero_tarjeta',
    token: 'token',
    nombre_tarjeta: 'nombre_tarjeta',
    tipo: 'tipo',
    titular: 'titular',
    vencimiento: 'vencimiento',
    telefono: 'telefono',
    ciudad: 'ciudad',
    postal: 'postal'
  };

  export type tarjetasOrderByRelevanceFieldEnum = (typeof tarjetasOrderByRelevanceFieldEnum)[keyof typeof tarjetasOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type alumnoWhereInput = {
    AND?: alumnoWhereInput | alumnoWhereInput[]
    OR?: alumnoWhereInput[]
    NOT?: alumnoWhereInput | alumnoWhereInput[]
    id_alumno?: IntFilter<"alumno"> | number
    matricula?: StringFilter<"alumno"> | string
    nombre?: StringFilter<"alumno"> | string
    apellido_paterno?: StringFilter<"alumno"> | string
    apellido_materno?: StringNullableFilter<"alumno"> | string | null
    email?: StringFilter<"alumno"> | string
    celular?: StringFilter<"alumno"> | string
    open_pay_id?: StringNullableFilter<"alumno"> | string | null
    fecha_alta?: DateTimeFilter<"alumno"> | Date | string
    fecha_modificacion?: DateTimeFilter<"alumno"> | Date | string
    pedidos?: PedidosListRelationFilter
    tarjetas?: TarjetasListRelationFilter
  }

  export type alumnoOrderByWithRelationInput = {
    id_alumno?: SortOrder
    matricula?: SortOrder
    nombre?: SortOrder
    apellido_paterno?: SortOrder
    apellido_materno?: SortOrderInput | SortOrder
    email?: SortOrder
    celular?: SortOrder
    open_pay_id?: SortOrderInput | SortOrder
    fecha_alta?: SortOrder
    fecha_modificacion?: SortOrder
    pedidos?: pedidosOrderByRelationAggregateInput
    tarjetas?: tarjetasOrderByRelationAggregateInput
    _relevance?: alumnoOrderByRelevanceInput
  }

  export type alumnoWhereUniqueInput = Prisma.AtLeast<{
    id_alumno?: number
    matricula?: string
    AND?: alumnoWhereInput | alumnoWhereInput[]
    OR?: alumnoWhereInput[]
    NOT?: alumnoWhereInput | alumnoWhereInput[]
    nombre?: StringFilter<"alumno"> | string
    apellido_paterno?: StringFilter<"alumno"> | string
    apellido_materno?: StringNullableFilter<"alumno"> | string | null
    email?: StringFilter<"alumno"> | string
    celular?: StringFilter<"alumno"> | string
    open_pay_id?: StringNullableFilter<"alumno"> | string | null
    fecha_alta?: DateTimeFilter<"alumno"> | Date | string
    fecha_modificacion?: DateTimeFilter<"alumno"> | Date | string
    pedidos?: PedidosListRelationFilter
    tarjetas?: TarjetasListRelationFilter
  }, "id_alumno" | "matricula">

  export type alumnoOrderByWithAggregationInput = {
    id_alumno?: SortOrder
    matricula?: SortOrder
    nombre?: SortOrder
    apellido_paterno?: SortOrder
    apellido_materno?: SortOrderInput | SortOrder
    email?: SortOrder
    celular?: SortOrder
    open_pay_id?: SortOrderInput | SortOrder
    fecha_alta?: SortOrder
    fecha_modificacion?: SortOrder
    _count?: alumnoCountOrderByAggregateInput
    _avg?: alumnoAvgOrderByAggregateInput
    _max?: alumnoMaxOrderByAggregateInput
    _min?: alumnoMinOrderByAggregateInput
    _sum?: alumnoSumOrderByAggregateInput
  }

  export type alumnoScalarWhereWithAggregatesInput = {
    AND?: alumnoScalarWhereWithAggregatesInput | alumnoScalarWhereWithAggregatesInput[]
    OR?: alumnoScalarWhereWithAggregatesInput[]
    NOT?: alumnoScalarWhereWithAggregatesInput | alumnoScalarWhereWithAggregatesInput[]
    id_alumno?: IntWithAggregatesFilter<"alumno"> | number
    matricula?: StringWithAggregatesFilter<"alumno"> | string
    nombre?: StringWithAggregatesFilter<"alumno"> | string
    apellido_paterno?: StringWithAggregatesFilter<"alumno"> | string
    apellido_materno?: StringNullableWithAggregatesFilter<"alumno"> | string | null
    email?: StringWithAggregatesFilter<"alumno"> | string
    celular?: StringWithAggregatesFilter<"alumno"> | string
    open_pay_id?: StringNullableWithAggregatesFilter<"alumno"> | string | null
    fecha_alta?: DateTimeWithAggregatesFilter<"alumno"> | Date | string
    fecha_modificacion?: DateTimeWithAggregatesFilter<"alumno"> | Date | string
  }

  export type cat_estatusWhereInput = {
    AND?: cat_estatusWhereInput | cat_estatusWhereInput[]
    OR?: cat_estatusWhereInput[]
    NOT?: cat_estatusWhereInput | cat_estatusWhereInput[]
    id_cat_estatus?: IntFilter<"cat_estatus"> | number
    clave?: StringFilter<"cat_estatus"> | string
    descripcion?: StringFilter<"cat_estatus"> | string
    valor?: IntFilter<"cat_estatus"> | number
    pedidos?: PedidosListRelationFilter
  }

  export type cat_estatusOrderByWithRelationInput = {
    id_cat_estatus?: SortOrder
    clave?: SortOrder
    descripcion?: SortOrder
    valor?: SortOrder
    pedidos?: pedidosOrderByRelationAggregateInput
    _relevance?: cat_estatusOrderByRelevanceInput
  }

  export type cat_estatusWhereUniqueInput = Prisma.AtLeast<{
    id_cat_estatus?: number
    AND?: cat_estatusWhereInput | cat_estatusWhereInput[]
    OR?: cat_estatusWhereInput[]
    NOT?: cat_estatusWhereInput | cat_estatusWhereInput[]
    clave?: StringFilter<"cat_estatus"> | string
    descripcion?: StringFilter<"cat_estatus"> | string
    valor?: IntFilter<"cat_estatus"> | number
    pedidos?: PedidosListRelationFilter
  }, "id_cat_estatus">

  export type cat_estatusOrderByWithAggregationInput = {
    id_cat_estatus?: SortOrder
    clave?: SortOrder
    descripcion?: SortOrder
    valor?: SortOrder
    _count?: cat_estatusCountOrderByAggregateInput
    _avg?: cat_estatusAvgOrderByAggregateInput
    _max?: cat_estatusMaxOrderByAggregateInput
    _min?: cat_estatusMinOrderByAggregateInput
    _sum?: cat_estatusSumOrderByAggregateInput
  }

  export type cat_estatusScalarWhereWithAggregatesInput = {
    AND?: cat_estatusScalarWhereWithAggregatesInput | cat_estatusScalarWhereWithAggregatesInput[]
    OR?: cat_estatusScalarWhereWithAggregatesInput[]
    NOT?: cat_estatusScalarWhereWithAggregatesInput | cat_estatusScalarWhereWithAggregatesInput[]
    id_cat_estatus?: IntWithAggregatesFilter<"cat_estatus"> | number
    clave?: StringWithAggregatesFilter<"cat_estatus"> | string
    descripcion?: StringWithAggregatesFilter<"cat_estatus"> | string
    valor?: IntWithAggregatesFilter<"cat_estatus"> | number
  }

  export type configuracion_cronWhereInput = {
    AND?: configuracion_cronWhereInput | configuracion_cronWhereInput[]
    OR?: configuracion_cronWhereInput[]
    NOT?: configuracion_cronWhereInput | configuracion_cronWhereInput[]
    id?: IntFilter<"configuracion_cron"> | number
    nombre?: StringNullableFilter<"configuracion_cron"> | string | null
    expresion_cron?: StringNullableFilter<"configuracion_cron"> | string | null
  }

  export type configuracion_cronOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    expresion_cron?: SortOrderInput | SortOrder
    _relevance?: configuracion_cronOrderByRelevanceInput
  }

  export type configuracion_cronWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: configuracion_cronWhereInput | configuracion_cronWhereInput[]
    OR?: configuracion_cronWhereInput[]
    NOT?: configuracion_cronWhereInput | configuracion_cronWhereInput[]
    nombre?: StringNullableFilter<"configuracion_cron"> | string | null
    expresion_cron?: StringNullableFilter<"configuracion_cron"> | string | null
  }, "id">

  export type configuracion_cronOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    expresion_cron?: SortOrderInput | SortOrder
    _count?: configuracion_cronCountOrderByAggregateInput
    _avg?: configuracion_cronAvgOrderByAggregateInput
    _max?: configuracion_cronMaxOrderByAggregateInput
    _min?: configuracion_cronMinOrderByAggregateInput
    _sum?: configuracion_cronSumOrderByAggregateInput
  }

  export type configuracion_cronScalarWhereWithAggregatesInput = {
    AND?: configuracion_cronScalarWhereWithAggregatesInput | configuracion_cronScalarWhereWithAggregatesInput[]
    OR?: configuracion_cronScalarWhereWithAggregatesInput[]
    NOT?: configuracion_cronScalarWhereWithAggregatesInput | configuracion_cronScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"configuracion_cron"> | number
    nombre?: StringNullableWithAggregatesFilter<"configuracion_cron"> | string | null
    expresion_cron?: StringNullableWithAggregatesFilter<"configuracion_cron"> | string | null
  }

  export type configuracion_generalWhereInput = {
    AND?: configuracion_generalWhereInput | configuracion_generalWhereInput[]
    OR?: configuracion_generalWhereInput[]
    NOT?: configuracion_generalWhereInput | configuracion_generalWhereInput[]
    id?: IntFilter<"configuracion_general"> | number
    nombre?: StringNullableFilter<"configuracion_general"> | string | null
    valor?: StringNullableFilter<"configuracion_general"> | string | null
  }

  export type configuracion_generalOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    valor?: SortOrderInput | SortOrder
    _relevance?: configuracion_generalOrderByRelevanceInput
  }

  export type configuracion_generalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: configuracion_generalWhereInput | configuracion_generalWhereInput[]
    OR?: configuracion_generalWhereInput[]
    NOT?: configuracion_generalWhereInput | configuracion_generalWhereInput[]
    nombre?: StringNullableFilter<"configuracion_general"> | string | null
    valor?: StringNullableFilter<"configuracion_general"> | string | null
  }, "id">

  export type configuracion_generalOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    valor?: SortOrderInput | SortOrder
    _count?: configuracion_generalCountOrderByAggregateInput
    _avg?: configuracion_generalAvgOrderByAggregateInput
    _max?: configuracion_generalMaxOrderByAggregateInput
    _min?: configuracion_generalMinOrderByAggregateInput
    _sum?: configuracion_generalSumOrderByAggregateInput
  }

  export type configuracion_generalScalarWhereWithAggregatesInput = {
    AND?: configuracion_generalScalarWhereWithAggregatesInput | configuracion_generalScalarWhereWithAggregatesInput[]
    OR?: configuracion_generalScalarWhereWithAggregatesInput[]
    NOT?: configuracion_generalScalarWhereWithAggregatesInput | configuracion_generalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"configuracion_general"> | number
    nombre?: StringNullableWithAggregatesFilter<"configuracion_general"> | string | null
    valor?: StringNullableWithAggregatesFilter<"configuracion_general"> | string | null
  }

  export type pedidosWhereInput = {
    AND?: pedidosWhereInput | pedidosWhereInput[]
    OR?: pedidosWhereInput[]
    NOT?: pedidosWhereInput | pedidosWhereInput[]
    id_pedido?: IntFilter<"pedidos"> | number
    id_alumno?: IntFilter<"pedidos"> | number
    identificador_pago?: StringNullableFilter<"pedidos"> | string | null
    identificador_pedido?: StringNullableFilter<"pedidos"> | string | null
    sku?: IntNullableFilter<"pedidos"> | number | null
    id_cat_estatus?: IntFilter<"pedidos"> | number
    tipo_pago?: StringFilter<"pedidos"> | string
    producto_servicio_motivo_pago?: StringFilter<"pedidos"> | string
    concepto_pago?: StringFilter<"pedidos"> | string
    ciclo?: IntFilter<"pedidos"> | number
    mes?: IntFilter<"pedidos"> | number
    anio?: IntFilter<"pedidos"> | number
    pago?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    link_de_pago?: StringNullableFilter<"pedidos"> | string | null
    concepto?: StringNullableFilter<"pedidos"> | string | null
    transaccion_Id?: StringNullableFilter<"pedidos"> | string | null
    fecha_carga?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    fecha_pago?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    monto_real_pago?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    alumno?: XOR<AlumnoScalarRelationFilter, alumnoWhereInput>
    cat_estatus?: XOR<Cat_estatusScalarRelationFilter, cat_estatusWhereInput>
  }

  export type pedidosOrderByWithRelationInput = {
    id_pedido?: SortOrder
    id_alumno?: SortOrder
    identificador_pago?: SortOrderInput | SortOrder
    identificador_pedido?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    id_cat_estatus?: SortOrder
    tipo_pago?: SortOrder
    producto_servicio_motivo_pago?: SortOrder
    concepto_pago?: SortOrder
    ciclo?: SortOrder
    mes?: SortOrder
    anio?: SortOrder
    pago?: SortOrderInput | SortOrder
    fecha_vigencia_pago?: SortOrderInput | SortOrder
    link_de_pago?: SortOrderInput | SortOrder
    concepto?: SortOrderInput | SortOrder
    transaccion_Id?: SortOrderInput | SortOrder
    fecha_carga?: SortOrderInput | SortOrder
    fecha_pago?: SortOrderInput | SortOrder
    monto_real_pago?: SortOrderInput | SortOrder
    alumno?: alumnoOrderByWithRelationInput
    cat_estatus?: cat_estatusOrderByWithRelationInput
    _relevance?: pedidosOrderByRelevanceInput
  }

  export type pedidosWhereUniqueInput = Prisma.AtLeast<{
    id_pedido?: number
    AND?: pedidosWhereInput | pedidosWhereInput[]
    OR?: pedidosWhereInput[]
    NOT?: pedidosWhereInput | pedidosWhereInput[]
    id_alumno?: IntFilter<"pedidos"> | number
    identificador_pago?: StringNullableFilter<"pedidos"> | string | null
    identificador_pedido?: StringNullableFilter<"pedidos"> | string | null
    sku?: IntNullableFilter<"pedidos"> | number | null
    id_cat_estatus?: IntFilter<"pedidos"> | number
    tipo_pago?: StringFilter<"pedidos"> | string
    producto_servicio_motivo_pago?: StringFilter<"pedidos"> | string
    concepto_pago?: StringFilter<"pedidos"> | string
    ciclo?: IntFilter<"pedidos"> | number
    mes?: IntFilter<"pedidos"> | number
    anio?: IntFilter<"pedidos"> | number
    pago?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    link_de_pago?: StringNullableFilter<"pedidos"> | string | null
    concepto?: StringNullableFilter<"pedidos"> | string | null
    transaccion_Id?: StringNullableFilter<"pedidos"> | string | null
    fecha_carga?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    fecha_pago?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    monto_real_pago?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    alumno?: XOR<AlumnoScalarRelationFilter, alumnoWhereInput>
    cat_estatus?: XOR<Cat_estatusScalarRelationFilter, cat_estatusWhereInput>
  }, "id_pedido">

  export type pedidosOrderByWithAggregationInput = {
    id_pedido?: SortOrder
    id_alumno?: SortOrder
    identificador_pago?: SortOrderInput | SortOrder
    identificador_pedido?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    id_cat_estatus?: SortOrder
    tipo_pago?: SortOrder
    producto_servicio_motivo_pago?: SortOrder
    concepto_pago?: SortOrder
    ciclo?: SortOrder
    mes?: SortOrder
    anio?: SortOrder
    pago?: SortOrderInput | SortOrder
    fecha_vigencia_pago?: SortOrderInput | SortOrder
    link_de_pago?: SortOrderInput | SortOrder
    concepto?: SortOrderInput | SortOrder
    transaccion_Id?: SortOrderInput | SortOrder
    fecha_carga?: SortOrderInput | SortOrder
    fecha_pago?: SortOrderInput | SortOrder
    monto_real_pago?: SortOrderInput | SortOrder
    _count?: pedidosCountOrderByAggregateInput
    _avg?: pedidosAvgOrderByAggregateInput
    _max?: pedidosMaxOrderByAggregateInput
    _min?: pedidosMinOrderByAggregateInput
    _sum?: pedidosSumOrderByAggregateInput
  }

  export type pedidosScalarWhereWithAggregatesInput = {
    AND?: pedidosScalarWhereWithAggregatesInput | pedidosScalarWhereWithAggregatesInput[]
    OR?: pedidosScalarWhereWithAggregatesInput[]
    NOT?: pedidosScalarWhereWithAggregatesInput | pedidosScalarWhereWithAggregatesInput[]
    id_pedido?: IntWithAggregatesFilter<"pedidos"> | number
    id_alumno?: IntWithAggregatesFilter<"pedidos"> | number
    identificador_pago?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    identificador_pedido?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    sku?: IntNullableWithAggregatesFilter<"pedidos"> | number | null
    id_cat_estatus?: IntWithAggregatesFilter<"pedidos"> | number
    tipo_pago?: StringWithAggregatesFilter<"pedidos"> | string
    producto_servicio_motivo_pago?: StringWithAggregatesFilter<"pedidos"> | string
    concepto_pago?: StringWithAggregatesFilter<"pedidos"> | string
    ciclo?: IntWithAggregatesFilter<"pedidos"> | number
    mes?: IntWithAggregatesFilter<"pedidos"> | number
    anio?: IntWithAggregatesFilter<"pedidos"> | number
    pago?: DecimalNullableWithAggregatesFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: DateTimeNullableWithAggregatesFilter<"pedidos"> | Date | string | null
    link_de_pago?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    concepto?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    transaccion_Id?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    fecha_carga?: DateTimeNullableWithAggregatesFilter<"pedidos"> | Date | string | null
    fecha_pago?: DateTimeNullableWithAggregatesFilter<"pedidos"> | Date | string | null
    monto_real_pago?: DecimalNullableWithAggregatesFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
  }

  export type tarjetasWhereInput = {
    AND?: tarjetasWhereInput | tarjetasWhereInput[]
    OR?: tarjetasWhereInput[]
    NOT?: tarjetasWhereInput | tarjetasWhereInput[]
    id?: IntFilter<"tarjetas"> | number
    numero_tarjeta?: StringFilter<"tarjetas"> | string
    token?: StringFilter<"tarjetas"> | string
    id_alumno?: IntFilter<"tarjetas"> | number
    nombre_tarjeta?: StringFilter<"tarjetas"> | string
    tipo?: StringFilter<"tarjetas"> | string
    activa?: BoolFilter<"tarjetas"> | boolean
    titular?: StringFilter<"tarjetas"> | string
    vencimiento?: StringFilter<"tarjetas"> | string
    eliminada?: BoolFilter<"tarjetas"> | boolean
    telefono?: StringFilter<"tarjetas"> | string
    ciudad?: StringFilter<"tarjetas"> | string
    postal?: StringFilter<"tarjetas"> | string
    alumno?: XOR<AlumnoScalarRelationFilter, alumnoWhereInput>
  }

  export type tarjetasOrderByWithRelationInput = {
    id?: SortOrder
    numero_tarjeta?: SortOrder
    token?: SortOrder
    id_alumno?: SortOrder
    nombre_tarjeta?: SortOrder
    tipo?: SortOrder
    activa?: SortOrder
    titular?: SortOrder
    vencimiento?: SortOrder
    eliminada?: SortOrder
    telefono?: SortOrder
    ciudad?: SortOrder
    postal?: SortOrder
    alumno?: alumnoOrderByWithRelationInput
    _relevance?: tarjetasOrderByRelevanceInput
  }

  export type tarjetasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: tarjetasWhereInput | tarjetasWhereInput[]
    OR?: tarjetasWhereInput[]
    NOT?: tarjetasWhereInput | tarjetasWhereInput[]
    numero_tarjeta?: StringFilter<"tarjetas"> | string
    token?: StringFilter<"tarjetas"> | string
    id_alumno?: IntFilter<"tarjetas"> | number
    nombre_tarjeta?: StringFilter<"tarjetas"> | string
    tipo?: StringFilter<"tarjetas"> | string
    activa?: BoolFilter<"tarjetas"> | boolean
    titular?: StringFilter<"tarjetas"> | string
    vencimiento?: StringFilter<"tarjetas"> | string
    eliminada?: BoolFilter<"tarjetas"> | boolean
    telefono?: StringFilter<"tarjetas"> | string
    ciudad?: StringFilter<"tarjetas"> | string
    postal?: StringFilter<"tarjetas"> | string
    alumno?: XOR<AlumnoScalarRelationFilter, alumnoWhereInput>
  }, "id">

  export type tarjetasOrderByWithAggregationInput = {
    id?: SortOrder
    numero_tarjeta?: SortOrder
    token?: SortOrder
    id_alumno?: SortOrder
    nombre_tarjeta?: SortOrder
    tipo?: SortOrder
    activa?: SortOrder
    titular?: SortOrder
    vencimiento?: SortOrder
    eliminada?: SortOrder
    telefono?: SortOrder
    ciudad?: SortOrder
    postal?: SortOrder
    _count?: tarjetasCountOrderByAggregateInput
    _avg?: tarjetasAvgOrderByAggregateInput
    _max?: tarjetasMaxOrderByAggregateInput
    _min?: tarjetasMinOrderByAggregateInput
    _sum?: tarjetasSumOrderByAggregateInput
  }

  export type tarjetasScalarWhereWithAggregatesInput = {
    AND?: tarjetasScalarWhereWithAggregatesInput | tarjetasScalarWhereWithAggregatesInput[]
    OR?: tarjetasScalarWhereWithAggregatesInput[]
    NOT?: tarjetasScalarWhereWithAggregatesInput | tarjetasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"tarjetas"> | number
    numero_tarjeta?: StringWithAggregatesFilter<"tarjetas"> | string
    token?: StringWithAggregatesFilter<"tarjetas"> | string
    id_alumno?: IntWithAggregatesFilter<"tarjetas"> | number
    nombre_tarjeta?: StringWithAggregatesFilter<"tarjetas"> | string
    tipo?: StringWithAggregatesFilter<"tarjetas"> | string
    activa?: BoolWithAggregatesFilter<"tarjetas"> | boolean
    titular?: StringWithAggregatesFilter<"tarjetas"> | string
    vencimiento?: StringWithAggregatesFilter<"tarjetas"> | string
    eliminada?: BoolWithAggregatesFilter<"tarjetas"> | boolean
    telefono?: StringWithAggregatesFilter<"tarjetas"> | string
    ciudad?: StringWithAggregatesFilter<"tarjetas"> | string
    postal?: StringWithAggregatesFilter<"tarjetas"> | string
  }

  export type alumnoCreateInput = {
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno?: string | null
    email: string
    celular: string
    open_pay_id?: string | null
    fecha_alta: Date | string
    fecha_modificacion: Date | string
    pedidos?: pedidosCreateNestedManyWithoutAlumnoInput
    tarjetas?: tarjetasCreateNestedManyWithoutAlumnoInput
  }

  export type alumnoUncheckedCreateInput = {
    id_alumno?: number
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno?: string | null
    email: string
    celular: string
    open_pay_id?: string | null
    fecha_alta: Date | string
    fecha_modificacion: Date | string
    pedidos?: pedidosUncheckedCreateNestedManyWithoutAlumnoInput
    tarjetas?: tarjetasUncheckedCreateNestedManyWithoutAlumnoInput
  }

  export type alumnoUpdateInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: pedidosUpdateManyWithoutAlumnoNestedInput
    tarjetas?: tarjetasUpdateManyWithoutAlumnoNestedInput
  }

  export type alumnoUncheckedUpdateInput = {
    id_alumno?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: pedidosUncheckedUpdateManyWithoutAlumnoNestedInput
    tarjetas?: tarjetasUncheckedUpdateManyWithoutAlumnoNestedInput
  }

  export type alumnoCreateManyInput = {
    id_alumno?: number
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno?: string | null
    email: string
    celular: string
    open_pay_id?: string | null
    fecha_alta: Date | string
    fecha_modificacion: Date | string
  }

  export type alumnoUpdateManyMutationInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type alumnoUncheckedUpdateManyInput = {
    id_alumno?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cat_estatusCreateInput = {
    clave: string
    descripcion: string
    valor: number
    pedidos?: pedidosCreateNestedManyWithoutCat_estatusInput
  }

  export type cat_estatusUncheckedCreateInput = {
    id_cat_estatus?: number
    clave: string
    descripcion: string
    valor: number
    pedidos?: pedidosUncheckedCreateNestedManyWithoutCat_estatusInput
  }

  export type cat_estatusUpdateInput = {
    clave?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    valor?: IntFieldUpdateOperationsInput | number
    pedidos?: pedidosUpdateManyWithoutCat_estatusNestedInput
  }

  export type cat_estatusUncheckedUpdateInput = {
    id_cat_estatus?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    valor?: IntFieldUpdateOperationsInput | number
    pedidos?: pedidosUncheckedUpdateManyWithoutCat_estatusNestedInput
  }

  export type cat_estatusCreateManyInput = {
    id_cat_estatus?: number
    clave: string
    descripcion: string
    valor: number
  }

  export type cat_estatusUpdateManyMutationInput = {
    clave?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    valor?: IntFieldUpdateOperationsInput | number
  }

  export type cat_estatusUncheckedUpdateManyInput = {
    id_cat_estatus?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    valor?: IntFieldUpdateOperationsInput | number
  }

  export type configuracion_cronCreateInput = {
    nombre?: string | null
    expresion_cron?: string | null
  }

  export type configuracion_cronUncheckedCreateInput = {
    id?: number
    nombre?: string | null
    expresion_cron?: string | null
  }

  export type configuracion_cronUpdateInput = {
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    expresion_cron?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type configuracion_cronUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    expresion_cron?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type configuracion_cronCreateManyInput = {
    id?: number
    nombre?: string | null
    expresion_cron?: string | null
  }

  export type configuracion_cronUpdateManyMutationInput = {
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    expresion_cron?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type configuracion_cronUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    expresion_cron?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type configuracion_generalCreateInput = {
    nombre?: string | null
    valor?: string | null
  }

  export type configuracion_generalUncheckedCreateInput = {
    id?: number
    nombre?: string | null
    valor?: string | null
  }

  export type configuracion_generalUpdateInput = {
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type configuracion_generalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type configuracion_generalCreateManyInput = {
    id?: number
    nombre?: string | null
    valor?: string | null
  }

  export type configuracion_generalUpdateManyMutationInput = {
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type configuracion_generalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pedidosCreateInput = {
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
    alumno: alumnoCreateNestedOneWithoutPedidosInput
    cat_estatus: cat_estatusCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateInput = {
    id_pedido?: number
    id_alumno: number
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    id_cat_estatus: number
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosUpdateInput = {
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alumno?: alumnoUpdateOneRequiredWithoutPedidosNestedInput
    cat_estatus?: cat_estatusUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateInput = {
    id_pedido?: IntFieldUpdateOperationsInput | number
    id_alumno?: IntFieldUpdateOperationsInput | number
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    id_cat_estatus?: IntFieldUpdateOperationsInput | number
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosCreateManyInput = {
    id_pedido?: number
    id_alumno: number
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    id_cat_estatus: number
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosUpdateManyMutationInput = {
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosUncheckedUpdateManyInput = {
    id_pedido?: IntFieldUpdateOperationsInput | number
    id_alumno?: IntFieldUpdateOperationsInput | number
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    id_cat_estatus?: IntFieldUpdateOperationsInput | number
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type tarjetasCreateInput = {
    numero_tarjeta: string
    token: string
    nombre_tarjeta: string
    tipo: string
    activa?: boolean
    titular: string
    vencimiento: string
    eliminada?: boolean
    telefono: string
    ciudad: string
    postal: string
    alumno: alumnoCreateNestedOneWithoutTarjetasInput
  }

  export type tarjetasUncheckedCreateInput = {
    id?: number
    numero_tarjeta: string
    token: string
    id_alumno: number
    nombre_tarjeta: string
    tipo: string
    activa?: boolean
    titular: string
    vencimiento: string
    eliminada?: boolean
    telefono: string
    ciudad: string
    postal: string
  }

  export type tarjetasUpdateInput = {
    numero_tarjeta?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    nombre_tarjeta?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activa?: BoolFieldUpdateOperationsInput | boolean
    titular?: StringFieldUpdateOperationsInput | string
    vencimiento?: StringFieldUpdateOperationsInput | string
    eliminada?: BoolFieldUpdateOperationsInput | boolean
    telefono?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
    alumno?: alumnoUpdateOneRequiredWithoutTarjetasNestedInput
  }

  export type tarjetasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero_tarjeta?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    id_alumno?: IntFieldUpdateOperationsInput | number
    nombre_tarjeta?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activa?: BoolFieldUpdateOperationsInput | boolean
    titular?: StringFieldUpdateOperationsInput | string
    vencimiento?: StringFieldUpdateOperationsInput | string
    eliminada?: BoolFieldUpdateOperationsInput | boolean
    telefono?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
  }

  export type tarjetasCreateManyInput = {
    id?: number
    numero_tarjeta: string
    token: string
    id_alumno: number
    nombre_tarjeta: string
    tipo: string
    activa?: boolean
    titular: string
    vencimiento: string
    eliminada?: boolean
    telefono: string
    ciudad: string
    postal: string
  }

  export type tarjetasUpdateManyMutationInput = {
    numero_tarjeta?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    nombre_tarjeta?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activa?: BoolFieldUpdateOperationsInput | boolean
    titular?: StringFieldUpdateOperationsInput | string
    vencimiento?: StringFieldUpdateOperationsInput | string
    eliminada?: BoolFieldUpdateOperationsInput | boolean
    telefono?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
  }

  export type tarjetasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero_tarjeta?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    id_alumno?: IntFieldUpdateOperationsInput | number
    nombre_tarjeta?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activa?: BoolFieldUpdateOperationsInput | boolean
    titular?: StringFieldUpdateOperationsInput | string
    vencimiento?: StringFieldUpdateOperationsInput | string
    eliminada?: BoolFieldUpdateOperationsInput | boolean
    telefono?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PedidosListRelationFilter = {
    every?: pedidosWhereInput
    some?: pedidosWhereInput
    none?: pedidosWhereInput
  }

  export type TarjetasListRelationFilter = {
    every?: tarjetasWhereInput
    some?: tarjetasWhereInput
    none?: tarjetasWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type pedidosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tarjetasOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type alumnoOrderByRelevanceInput = {
    fields: alumnoOrderByRelevanceFieldEnum | alumnoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type alumnoCountOrderByAggregateInput = {
    id_alumno?: SortOrder
    matricula?: SortOrder
    nombre?: SortOrder
    apellido_paterno?: SortOrder
    apellido_materno?: SortOrder
    email?: SortOrder
    celular?: SortOrder
    open_pay_id?: SortOrder
    fecha_alta?: SortOrder
    fecha_modificacion?: SortOrder
  }

  export type alumnoAvgOrderByAggregateInput = {
    id_alumno?: SortOrder
  }

  export type alumnoMaxOrderByAggregateInput = {
    id_alumno?: SortOrder
    matricula?: SortOrder
    nombre?: SortOrder
    apellido_paterno?: SortOrder
    apellido_materno?: SortOrder
    email?: SortOrder
    celular?: SortOrder
    open_pay_id?: SortOrder
    fecha_alta?: SortOrder
    fecha_modificacion?: SortOrder
  }

  export type alumnoMinOrderByAggregateInput = {
    id_alumno?: SortOrder
    matricula?: SortOrder
    nombre?: SortOrder
    apellido_paterno?: SortOrder
    apellido_materno?: SortOrder
    email?: SortOrder
    celular?: SortOrder
    open_pay_id?: SortOrder
    fecha_alta?: SortOrder
    fecha_modificacion?: SortOrder
  }

  export type alumnoSumOrderByAggregateInput = {
    id_alumno?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type cat_estatusOrderByRelevanceInput = {
    fields: cat_estatusOrderByRelevanceFieldEnum | cat_estatusOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type cat_estatusCountOrderByAggregateInput = {
    id_cat_estatus?: SortOrder
    clave?: SortOrder
    descripcion?: SortOrder
    valor?: SortOrder
  }

  export type cat_estatusAvgOrderByAggregateInput = {
    id_cat_estatus?: SortOrder
    valor?: SortOrder
  }

  export type cat_estatusMaxOrderByAggregateInput = {
    id_cat_estatus?: SortOrder
    clave?: SortOrder
    descripcion?: SortOrder
    valor?: SortOrder
  }

  export type cat_estatusMinOrderByAggregateInput = {
    id_cat_estatus?: SortOrder
    clave?: SortOrder
    descripcion?: SortOrder
    valor?: SortOrder
  }

  export type cat_estatusSumOrderByAggregateInput = {
    id_cat_estatus?: SortOrder
    valor?: SortOrder
  }

  export type configuracion_cronOrderByRelevanceInput = {
    fields: configuracion_cronOrderByRelevanceFieldEnum | configuracion_cronOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type configuracion_cronCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    expresion_cron?: SortOrder
  }

  export type configuracion_cronAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type configuracion_cronMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    expresion_cron?: SortOrder
  }

  export type configuracion_cronMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    expresion_cron?: SortOrder
  }

  export type configuracion_cronSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type configuracion_generalOrderByRelevanceInput = {
    fields: configuracion_generalOrderByRelevanceFieldEnum | configuracion_generalOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type configuracion_generalCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    valor?: SortOrder
  }

  export type configuracion_generalAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type configuracion_generalMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    valor?: SortOrder
  }

  export type configuracion_generalMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    valor?: SortOrder
  }

  export type configuracion_generalSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AlumnoScalarRelationFilter = {
    is?: alumnoWhereInput
    isNot?: alumnoWhereInput
  }

  export type Cat_estatusScalarRelationFilter = {
    is?: cat_estatusWhereInput
    isNot?: cat_estatusWhereInput
  }

  export type pedidosOrderByRelevanceInput = {
    fields: pedidosOrderByRelevanceFieldEnum | pedidosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type pedidosCountOrderByAggregateInput = {
    id_pedido?: SortOrder
    id_alumno?: SortOrder
    identificador_pago?: SortOrder
    identificador_pedido?: SortOrder
    sku?: SortOrder
    id_cat_estatus?: SortOrder
    tipo_pago?: SortOrder
    producto_servicio_motivo_pago?: SortOrder
    concepto_pago?: SortOrder
    ciclo?: SortOrder
    mes?: SortOrder
    anio?: SortOrder
    pago?: SortOrder
    fecha_vigencia_pago?: SortOrder
    link_de_pago?: SortOrder
    concepto?: SortOrder
    transaccion_Id?: SortOrder
    fecha_carga?: SortOrder
    fecha_pago?: SortOrder
    monto_real_pago?: SortOrder
  }

  export type pedidosAvgOrderByAggregateInput = {
    id_pedido?: SortOrder
    id_alumno?: SortOrder
    sku?: SortOrder
    id_cat_estatus?: SortOrder
    ciclo?: SortOrder
    mes?: SortOrder
    anio?: SortOrder
    pago?: SortOrder
    monto_real_pago?: SortOrder
  }

  export type pedidosMaxOrderByAggregateInput = {
    id_pedido?: SortOrder
    id_alumno?: SortOrder
    identificador_pago?: SortOrder
    identificador_pedido?: SortOrder
    sku?: SortOrder
    id_cat_estatus?: SortOrder
    tipo_pago?: SortOrder
    producto_servicio_motivo_pago?: SortOrder
    concepto_pago?: SortOrder
    ciclo?: SortOrder
    mes?: SortOrder
    anio?: SortOrder
    pago?: SortOrder
    fecha_vigencia_pago?: SortOrder
    link_de_pago?: SortOrder
    concepto?: SortOrder
    transaccion_Id?: SortOrder
    fecha_carga?: SortOrder
    fecha_pago?: SortOrder
    monto_real_pago?: SortOrder
  }

  export type pedidosMinOrderByAggregateInput = {
    id_pedido?: SortOrder
    id_alumno?: SortOrder
    identificador_pago?: SortOrder
    identificador_pedido?: SortOrder
    sku?: SortOrder
    id_cat_estatus?: SortOrder
    tipo_pago?: SortOrder
    producto_servicio_motivo_pago?: SortOrder
    concepto_pago?: SortOrder
    ciclo?: SortOrder
    mes?: SortOrder
    anio?: SortOrder
    pago?: SortOrder
    fecha_vigencia_pago?: SortOrder
    link_de_pago?: SortOrder
    concepto?: SortOrder
    transaccion_Id?: SortOrder
    fecha_carga?: SortOrder
    fecha_pago?: SortOrder
    monto_real_pago?: SortOrder
  }

  export type pedidosSumOrderByAggregateInput = {
    id_pedido?: SortOrder
    id_alumno?: SortOrder
    sku?: SortOrder
    id_cat_estatus?: SortOrder
    ciclo?: SortOrder
    mes?: SortOrder
    anio?: SortOrder
    pago?: SortOrder
    monto_real_pago?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type tarjetasOrderByRelevanceInput = {
    fields: tarjetasOrderByRelevanceFieldEnum | tarjetasOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type tarjetasCountOrderByAggregateInput = {
    id?: SortOrder
    numero_tarjeta?: SortOrder
    token?: SortOrder
    id_alumno?: SortOrder
    nombre_tarjeta?: SortOrder
    tipo?: SortOrder
    activa?: SortOrder
    titular?: SortOrder
    vencimiento?: SortOrder
    eliminada?: SortOrder
    telefono?: SortOrder
    ciudad?: SortOrder
    postal?: SortOrder
  }

  export type tarjetasAvgOrderByAggregateInput = {
    id?: SortOrder
    id_alumno?: SortOrder
  }

  export type tarjetasMaxOrderByAggregateInput = {
    id?: SortOrder
    numero_tarjeta?: SortOrder
    token?: SortOrder
    id_alumno?: SortOrder
    nombre_tarjeta?: SortOrder
    tipo?: SortOrder
    activa?: SortOrder
    titular?: SortOrder
    vencimiento?: SortOrder
    eliminada?: SortOrder
    telefono?: SortOrder
    ciudad?: SortOrder
    postal?: SortOrder
  }

  export type tarjetasMinOrderByAggregateInput = {
    id?: SortOrder
    numero_tarjeta?: SortOrder
    token?: SortOrder
    id_alumno?: SortOrder
    nombre_tarjeta?: SortOrder
    tipo?: SortOrder
    activa?: SortOrder
    titular?: SortOrder
    vencimiento?: SortOrder
    eliminada?: SortOrder
    telefono?: SortOrder
    ciudad?: SortOrder
    postal?: SortOrder
  }

  export type tarjetasSumOrderByAggregateInput = {
    id?: SortOrder
    id_alumno?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type pedidosCreateNestedManyWithoutAlumnoInput = {
    create?: XOR<pedidosCreateWithoutAlumnoInput, pedidosUncheckedCreateWithoutAlumnoInput> | pedidosCreateWithoutAlumnoInput[] | pedidosUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutAlumnoInput | pedidosCreateOrConnectWithoutAlumnoInput[]
    createMany?: pedidosCreateManyAlumnoInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type tarjetasCreateNestedManyWithoutAlumnoInput = {
    create?: XOR<tarjetasCreateWithoutAlumnoInput, tarjetasUncheckedCreateWithoutAlumnoInput> | tarjetasCreateWithoutAlumnoInput[] | tarjetasUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: tarjetasCreateOrConnectWithoutAlumnoInput | tarjetasCreateOrConnectWithoutAlumnoInput[]
    createMany?: tarjetasCreateManyAlumnoInputEnvelope
    connect?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
  }

  export type pedidosUncheckedCreateNestedManyWithoutAlumnoInput = {
    create?: XOR<pedidosCreateWithoutAlumnoInput, pedidosUncheckedCreateWithoutAlumnoInput> | pedidosCreateWithoutAlumnoInput[] | pedidosUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutAlumnoInput | pedidosCreateOrConnectWithoutAlumnoInput[]
    createMany?: pedidosCreateManyAlumnoInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type tarjetasUncheckedCreateNestedManyWithoutAlumnoInput = {
    create?: XOR<tarjetasCreateWithoutAlumnoInput, tarjetasUncheckedCreateWithoutAlumnoInput> | tarjetasCreateWithoutAlumnoInput[] | tarjetasUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: tarjetasCreateOrConnectWithoutAlumnoInput | tarjetasCreateOrConnectWithoutAlumnoInput[]
    createMany?: tarjetasCreateManyAlumnoInputEnvelope
    connect?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type pedidosUpdateManyWithoutAlumnoNestedInput = {
    create?: XOR<pedidosCreateWithoutAlumnoInput, pedidosUncheckedCreateWithoutAlumnoInput> | pedidosCreateWithoutAlumnoInput[] | pedidosUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutAlumnoInput | pedidosCreateOrConnectWithoutAlumnoInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutAlumnoInput | pedidosUpsertWithWhereUniqueWithoutAlumnoInput[]
    createMany?: pedidosCreateManyAlumnoInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutAlumnoInput | pedidosUpdateWithWhereUniqueWithoutAlumnoInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutAlumnoInput | pedidosUpdateManyWithWhereWithoutAlumnoInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type tarjetasUpdateManyWithoutAlumnoNestedInput = {
    create?: XOR<tarjetasCreateWithoutAlumnoInput, tarjetasUncheckedCreateWithoutAlumnoInput> | tarjetasCreateWithoutAlumnoInput[] | tarjetasUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: tarjetasCreateOrConnectWithoutAlumnoInput | tarjetasCreateOrConnectWithoutAlumnoInput[]
    upsert?: tarjetasUpsertWithWhereUniqueWithoutAlumnoInput | tarjetasUpsertWithWhereUniqueWithoutAlumnoInput[]
    createMany?: tarjetasCreateManyAlumnoInputEnvelope
    set?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    disconnect?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    delete?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    connect?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    update?: tarjetasUpdateWithWhereUniqueWithoutAlumnoInput | tarjetasUpdateWithWhereUniqueWithoutAlumnoInput[]
    updateMany?: tarjetasUpdateManyWithWhereWithoutAlumnoInput | tarjetasUpdateManyWithWhereWithoutAlumnoInput[]
    deleteMany?: tarjetasScalarWhereInput | tarjetasScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type pedidosUncheckedUpdateManyWithoutAlumnoNestedInput = {
    create?: XOR<pedidosCreateWithoutAlumnoInput, pedidosUncheckedCreateWithoutAlumnoInput> | pedidosCreateWithoutAlumnoInput[] | pedidosUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutAlumnoInput | pedidosCreateOrConnectWithoutAlumnoInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutAlumnoInput | pedidosUpsertWithWhereUniqueWithoutAlumnoInput[]
    createMany?: pedidosCreateManyAlumnoInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutAlumnoInput | pedidosUpdateWithWhereUniqueWithoutAlumnoInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutAlumnoInput | pedidosUpdateManyWithWhereWithoutAlumnoInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type tarjetasUncheckedUpdateManyWithoutAlumnoNestedInput = {
    create?: XOR<tarjetasCreateWithoutAlumnoInput, tarjetasUncheckedCreateWithoutAlumnoInput> | tarjetasCreateWithoutAlumnoInput[] | tarjetasUncheckedCreateWithoutAlumnoInput[]
    connectOrCreate?: tarjetasCreateOrConnectWithoutAlumnoInput | tarjetasCreateOrConnectWithoutAlumnoInput[]
    upsert?: tarjetasUpsertWithWhereUniqueWithoutAlumnoInput | tarjetasUpsertWithWhereUniqueWithoutAlumnoInput[]
    createMany?: tarjetasCreateManyAlumnoInputEnvelope
    set?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    disconnect?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    delete?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    connect?: tarjetasWhereUniqueInput | tarjetasWhereUniqueInput[]
    update?: tarjetasUpdateWithWhereUniqueWithoutAlumnoInput | tarjetasUpdateWithWhereUniqueWithoutAlumnoInput[]
    updateMany?: tarjetasUpdateManyWithWhereWithoutAlumnoInput | tarjetasUpdateManyWithWhereWithoutAlumnoInput[]
    deleteMany?: tarjetasScalarWhereInput | tarjetasScalarWhereInput[]
  }

  export type pedidosCreateNestedManyWithoutCat_estatusInput = {
    create?: XOR<pedidosCreateWithoutCat_estatusInput, pedidosUncheckedCreateWithoutCat_estatusInput> | pedidosCreateWithoutCat_estatusInput[] | pedidosUncheckedCreateWithoutCat_estatusInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutCat_estatusInput | pedidosCreateOrConnectWithoutCat_estatusInput[]
    createMany?: pedidosCreateManyCat_estatusInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type pedidosUncheckedCreateNestedManyWithoutCat_estatusInput = {
    create?: XOR<pedidosCreateWithoutCat_estatusInput, pedidosUncheckedCreateWithoutCat_estatusInput> | pedidosCreateWithoutCat_estatusInput[] | pedidosUncheckedCreateWithoutCat_estatusInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutCat_estatusInput | pedidosCreateOrConnectWithoutCat_estatusInput[]
    createMany?: pedidosCreateManyCat_estatusInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type pedidosUpdateManyWithoutCat_estatusNestedInput = {
    create?: XOR<pedidosCreateWithoutCat_estatusInput, pedidosUncheckedCreateWithoutCat_estatusInput> | pedidosCreateWithoutCat_estatusInput[] | pedidosUncheckedCreateWithoutCat_estatusInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutCat_estatusInput | pedidosCreateOrConnectWithoutCat_estatusInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutCat_estatusInput | pedidosUpsertWithWhereUniqueWithoutCat_estatusInput[]
    createMany?: pedidosCreateManyCat_estatusInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutCat_estatusInput | pedidosUpdateWithWhereUniqueWithoutCat_estatusInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutCat_estatusInput | pedidosUpdateManyWithWhereWithoutCat_estatusInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type pedidosUncheckedUpdateManyWithoutCat_estatusNestedInput = {
    create?: XOR<pedidosCreateWithoutCat_estatusInput, pedidosUncheckedCreateWithoutCat_estatusInput> | pedidosCreateWithoutCat_estatusInput[] | pedidosUncheckedCreateWithoutCat_estatusInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutCat_estatusInput | pedidosCreateOrConnectWithoutCat_estatusInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutCat_estatusInput | pedidosUpsertWithWhereUniqueWithoutCat_estatusInput[]
    createMany?: pedidosCreateManyCat_estatusInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutCat_estatusInput | pedidosUpdateWithWhereUniqueWithoutCat_estatusInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutCat_estatusInput | pedidosUpdateManyWithWhereWithoutCat_estatusInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type alumnoCreateNestedOneWithoutPedidosInput = {
    create?: XOR<alumnoCreateWithoutPedidosInput, alumnoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: alumnoCreateOrConnectWithoutPedidosInput
    connect?: alumnoWhereUniqueInput
  }

  export type cat_estatusCreateNestedOneWithoutPedidosInput = {
    create?: XOR<cat_estatusCreateWithoutPedidosInput, cat_estatusUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: cat_estatusCreateOrConnectWithoutPedidosInput
    connect?: cat_estatusWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type alumnoUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<alumnoCreateWithoutPedidosInput, alumnoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: alumnoCreateOrConnectWithoutPedidosInput
    upsert?: alumnoUpsertWithoutPedidosInput
    connect?: alumnoWhereUniqueInput
    update?: XOR<XOR<alumnoUpdateToOneWithWhereWithoutPedidosInput, alumnoUpdateWithoutPedidosInput>, alumnoUncheckedUpdateWithoutPedidosInput>
  }

  export type cat_estatusUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<cat_estatusCreateWithoutPedidosInput, cat_estatusUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: cat_estatusCreateOrConnectWithoutPedidosInput
    upsert?: cat_estatusUpsertWithoutPedidosInput
    connect?: cat_estatusWhereUniqueInput
    update?: XOR<XOR<cat_estatusUpdateToOneWithWhereWithoutPedidosInput, cat_estatusUpdateWithoutPedidosInput>, cat_estatusUncheckedUpdateWithoutPedidosInput>
  }

  export type alumnoCreateNestedOneWithoutTarjetasInput = {
    create?: XOR<alumnoCreateWithoutTarjetasInput, alumnoUncheckedCreateWithoutTarjetasInput>
    connectOrCreate?: alumnoCreateOrConnectWithoutTarjetasInput
    connect?: alumnoWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type alumnoUpdateOneRequiredWithoutTarjetasNestedInput = {
    create?: XOR<alumnoCreateWithoutTarjetasInput, alumnoUncheckedCreateWithoutTarjetasInput>
    connectOrCreate?: alumnoCreateOrConnectWithoutTarjetasInput
    upsert?: alumnoUpsertWithoutTarjetasInput
    connect?: alumnoWhereUniqueInput
    update?: XOR<XOR<alumnoUpdateToOneWithWhereWithoutTarjetasInput, alumnoUpdateWithoutTarjetasInput>, alumnoUncheckedUpdateWithoutTarjetasInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type pedidosCreateWithoutAlumnoInput = {
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
    cat_estatus: cat_estatusCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateWithoutAlumnoInput = {
    id_pedido?: number
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    id_cat_estatus: number
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosCreateOrConnectWithoutAlumnoInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutAlumnoInput, pedidosUncheckedCreateWithoutAlumnoInput>
  }

  export type pedidosCreateManyAlumnoInputEnvelope = {
    data: pedidosCreateManyAlumnoInput | pedidosCreateManyAlumnoInput[]
    skipDuplicates?: boolean
  }

  export type tarjetasCreateWithoutAlumnoInput = {
    numero_tarjeta: string
    token: string
    nombre_tarjeta: string
    tipo: string
    activa?: boolean
    titular: string
    vencimiento: string
    eliminada?: boolean
    telefono: string
    ciudad: string
    postal: string
  }

  export type tarjetasUncheckedCreateWithoutAlumnoInput = {
    id?: number
    numero_tarjeta: string
    token: string
    nombre_tarjeta: string
    tipo: string
    activa?: boolean
    titular: string
    vencimiento: string
    eliminada?: boolean
    telefono: string
    ciudad: string
    postal: string
  }

  export type tarjetasCreateOrConnectWithoutAlumnoInput = {
    where: tarjetasWhereUniqueInput
    create: XOR<tarjetasCreateWithoutAlumnoInput, tarjetasUncheckedCreateWithoutAlumnoInput>
  }

  export type tarjetasCreateManyAlumnoInputEnvelope = {
    data: tarjetasCreateManyAlumnoInput | tarjetasCreateManyAlumnoInput[]
    skipDuplicates?: boolean
  }

  export type pedidosUpsertWithWhereUniqueWithoutAlumnoInput = {
    where: pedidosWhereUniqueInput
    update: XOR<pedidosUpdateWithoutAlumnoInput, pedidosUncheckedUpdateWithoutAlumnoInput>
    create: XOR<pedidosCreateWithoutAlumnoInput, pedidosUncheckedCreateWithoutAlumnoInput>
  }

  export type pedidosUpdateWithWhereUniqueWithoutAlumnoInput = {
    where: pedidosWhereUniqueInput
    data: XOR<pedidosUpdateWithoutAlumnoInput, pedidosUncheckedUpdateWithoutAlumnoInput>
  }

  export type pedidosUpdateManyWithWhereWithoutAlumnoInput = {
    where: pedidosScalarWhereInput
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyWithoutAlumnoInput>
  }

  export type pedidosScalarWhereInput = {
    AND?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
    OR?: pedidosScalarWhereInput[]
    NOT?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
    id_pedido?: IntFilter<"pedidos"> | number
    id_alumno?: IntFilter<"pedidos"> | number
    identificador_pago?: StringNullableFilter<"pedidos"> | string | null
    identificador_pedido?: StringNullableFilter<"pedidos"> | string | null
    sku?: IntNullableFilter<"pedidos"> | number | null
    id_cat_estatus?: IntFilter<"pedidos"> | number
    tipo_pago?: StringFilter<"pedidos"> | string
    producto_servicio_motivo_pago?: StringFilter<"pedidos"> | string
    concepto_pago?: StringFilter<"pedidos"> | string
    ciclo?: IntFilter<"pedidos"> | number
    mes?: IntFilter<"pedidos"> | number
    anio?: IntFilter<"pedidos"> | number
    pago?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    link_de_pago?: StringNullableFilter<"pedidos"> | string | null
    concepto?: StringNullableFilter<"pedidos"> | string | null
    transaccion_Id?: StringNullableFilter<"pedidos"> | string | null
    fecha_carga?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    fecha_pago?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    monto_real_pago?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
  }

  export type tarjetasUpsertWithWhereUniqueWithoutAlumnoInput = {
    where: tarjetasWhereUniqueInput
    update: XOR<tarjetasUpdateWithoutAlumnoInput, tarjetasUncheckedUpdateWithoutAlumnoInput>
    create: XOR<tarjetasCreateWithoutAlumnoInput, tarjetasUncheckedCreateWithoutAlumnoInput>
  }

  export type tarjetasUpdateWithWhereUniqueWithoutAlumnoInput = {
    where: tarjetasWhereUniqueInput
    data: XOR<tarjetasUpdateWithoutAlumnoInput, tarjetasUncheckedUpdateWithoutAlumnoInput>
  }

  export type tarjetasUpdateManyWithWhereWithoutAlumnoInput = {
    where: tarjetasScalarWhereInput
    data: XOR<tarjetasUpdateManyMutationInput, tarjetasUncheckedUpdateManyWithoutAlumnoInput>
  }

  export type tarjetasScalarWhereInput = {
    AND?: tarjetasScalarWhereInput | tarjetasScalarWhereInput[]
    OR?: tarjetasScalarWhereInput[]
    NOT?: tarjetasScalarWhereInput | tarjetasScalarWhereInput[]
    id?: IntFilter<"tarjetas"> | number
    numero_tarjeta?: StringFilter<"tarjetas"> | string
    token?: StringFilter<"tarjetas"> | string
    id_alumno?: IntFilter<"tarjetas"> | number
    nombre_tarjeta?: StringFilter<"tarjetas"> | string
    tipo?: StringFilter<"tarjetas"> | string
    activa?: BoolFilter<"tarjetas"> | boolean
    titular?: StringFilter<"tarjetas"> | string
    vencimiento?: StringFilter<"tarjetas"> | string
    eliminada?: BoolFilter<"tarjetas"> | boolean
    telefono?: StringFilter<"tarjetas"> | string
    ciudad?: StringFilter<"tarjetas"> | string
    postal?: StringFilter<"tarjetas"> | string
  }

  export type pedidosCreateWithoutCat_estatusInput = {
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
    alumno: alumnoCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateWithoutCat_estatusInput = {
    id_pedido?: number
    id_alumno: number
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosCreateOrConnectWithoutCat_estatusInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutCat_estatusInput, pedidosUncheckedCreateWithoutCat_estatusInput>
  }

  export type pedidosCreateManyCat_estatusInputEnvelope = {
    data: pedidosCreateManyCat_estatusInput | pedidosCreateManyCat_estatusInput[]
    skipDuplicates?: boolean
  }

  export type pedidosUpsertWithWhereUniqueWithoutCat_estatusInput = {
    where: pedidosWhereUniqueInput
    update: XOR<pedidosUpdateWithoutCat_estatusInput, pedidosUncheckedUpdateWithoutCat_estatusInput>
    create: XOR<pedidosCreateWithoutCat_estatusInput, pedidosUncheckedCreateWithoutCat_estatusInput>
  }

  export type pedidosUpdateWithWhereUniqueWithoutCat_estatusInput = {
    where: pedidosWhereUniqueInput
    data: XOR<pedidosUpdateWithoutCat_estatusInput, pedidosUncheckedUpdateWithoutCat_estatusInput>
  }

  export type pedidosUpdateManyWithWhereWithoutCat_estatusInput = {
    where: pedidosScalarWhereInput
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyWithoutCat_estatusInput>
  }

  export type alumnoCreateWithoutPedidosInput = {
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno?: string | null
    email: string
    celular: string
    open_pay_id?: string | null
    fecha_alta: Date | string
    fecha_modificacion: Date | string
    tarjetas?: tarjetasCreateNestedManyWithoutAlumnoInput
  }

  export type alumnoUncheckedCreateWithoutPedidosInput = {
    id_alumno?: number
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno?: string | null
    email: string
    celular: string
    open_pay_id?: string | null
    fecha_alta: Date | string
    fecha_modificacion: Date | string
    tarjetas?: tarjetasUncheckedCreateNestedManyWithoutAlumnoInput
  }

  export type alumnoCreateOrConnectWithoutPedidosInput = {
    where: alumnoWhereUniqueInput
    create: XOR<alumnoCreateWithoutPedidosInput, alumnoUncheckedCreateWithoutPedidosInput>
  }

  export type cat_estatusCreateWithoutPedidosInput = {
    clave: string
    descripcion: string
    valor: number
  }

  export type cat_estatusUncheckedCreateWithoutPedidosInput = {
    id_cat_estatus?: number
    clave: string
    descripcion: string
    valor: number
  }

  export type cat_estatusCreateOrConnectWithoutPedidosInput = {
    where: cat_estatusWhereUniqueInput
    create: XOR<cat_estatusCreateWithoutPedidosInput, cat_estatusUncheckedCreateWithoutPedidosInput>
  }

  export type alumnoUpsertWithoutPedidosInput = {
    update: XOR<alumnoUpdateWithoutPedidosInput, alumnoUncheckedUpdateWithoutPedidosInput>
    create: XOR<alumnoCreateWithoutPedidosInput, alumnoUncheckedCreateWithoutPedidosInput>
    where?: alumnoWhereInput
  }

  export type alumnoUpdateToOneWithWhereWithoutPedidosInput = {
    where?: alumnoWhereInput
    data: XOR<alumnoUpdateWithoutPedidosInput, alumnoUncheckedUpdateWithoutPedidosInput>
  }

  export type alumnoUpdateWithoutPedidosInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
    tarjetas?: tarjetasUpdateManyWithoutAlumnoNestedInput
  }

  export type alumnoUncheckedUpdateWithoutPedidosInput = {
    id_alumno?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
    tarjetas?: tarjetasUncheckedUpdateManyWithoutAlumnoNestedInput
  }

  export type cat_estatusUpsertWithoutPedidosInput = {
    update: XOR<cat_estatusUpdateWithoutPedidosInput, cat_estatusUncheckedUpdateWithoutPedidosInput>
    create: XOR<cat_estatusCreateWithoutPedidosInput, cat_estatusUncheckedCreateWithoutPedidosInput>
    where?: cat_estatusWhereInput
  }

  export type cat_estatusUpdateToOneWithWhereWithoutPedidosInput = {
    where?: cat_estatusWhereInput
    data: XOR<cat_estatusUpdateWithoutPedidosInput, cat_estatusUncheckedUpdateWithoutPedidosInput>
  }

  export type cat_estatusUpdateWithoutPedidosInput = {
    clave?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    valor?: IntFieldUpdateOperationsInput | number
  }

  export type cat_estatusUncheckedUpdateWithoutPedidosInput = {
    id_cat_estatus?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    valor?: IntFieldUpdateOperationsInput | number
  }

  export type alumnoCreateWithoutTarjetasInput = {
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno?: string | null
    email: string
    celular: string
    open_pay_id?: string | null
    fecha_alta: Date | string
    fecha_modificacion: Date | string
    pedidos?: pedidosCreateNestedManyWithoutAlumnoInput
  }

  export type alumnoUncheckedCreateWithoutTarjetasInput = {
    id_alumno?: number
    matricula: string
    nombre: string
    apellido_paterno: string
    apellido_materno?: string | null
    email: string
    celular: string
    open_pay_id?: string | null
    fecha_alta: Date | string
    fecha_modificacion: Date | string
    pedidos?: pedidosUncheckedCreateNestedManyWithoutAlumnoInput
  }

  export type alumnoCreateOrConnectWithoutTarjetasInput = {
    where: alumnoWhereUniqueInput
    create: XOR<alumnoCreateWithoutTarjetasInput, alumnoUncheckedCreateWithoutTarjetasInput>
  }

  export type alumnoUpsertWithoutTarjetasInput = {
    update: XOR<alumnoUpdateWithoutTarjetasInput, alumnoUncheckedUpdateWithoutTarjetasInput>
    create: XOR<alumnoCreateWithoutTarjetasInput, alumnoUncheckedCreateWithoutTarjetasInput>
    where?: alumnoWhereInput
  }

  export type alumnoUpdateToOneWithWhereWithoutTarjetasInput = {
    where?: alumnoWhereInput
    data: XOR<alumnoUpdateWithoutTarjetasInput, alumnoUncheckedUpdateWithoutTarjetasInput>
  }

  export type alumnoUpdateWithoutTarjetasInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: pedidosUpdateManyWithoutAlumnoNestedInput
  }

  export type alumnoUncheckedUpdateWithoutTarjetasInput = {
    id_alumno?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido_paterno?: StringFieldUpdateOperationsInput | string
    apellido_materno?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    open_pay_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_alta?: DateTimeFieldUpdateOperationsInput | Date | string
    fecha_modificacion?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: pedidosUncheckedUpdateManyWithoutAlumnoNestedInput
  }

  export type pedidosCreateManyAlumnoInput = {
    id_pedido?: number
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    id_cat_estatus: number
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
  }

  export type tarjetasCreateManyAlumnoInput = {
    id?: number
    numero_tarjeta: string
    token: string
    nombre_tarjeta: string
    tipo: string
    activa?: boolean
    titular: string
    vencimiento: string
    eliminada?: boolean
    telefono: string
    ciudad: string
    postal: string
  }

  export type pedidosUpdateWithoutAlumnoInput = {
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cat_estatus?: cat_estatusUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateWithoutAlumnoInput = {
    id_pedido?: IntFieldUpdateOperationsInput | number
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    id_cat_estatus?: IntFieldUpdateOperationsInput | number
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosUncheckedUpdateManyWithoutAlumnoInput = {
    id_pedido?: IntFieldUpdateOperationsInput | number
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    id_cat_estatus?: IntFieldUpdateOperationsInput | number
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type tarjetasUpdateWithoutAlumnoInput = {
    numero_tarjeta?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    nombre_tarjeta?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activa?: BoolFieldUpdateOperationsInput | boolean
    titular?: StringFieldUpdateOperationsInput | string
    vencimiento?: StringFieldUpdateOperationsInput | string
    eliminada?: BoolFieldUpdateOperationsInput | boolean
    telefono?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
  }

  export type tarjetasUncheckedUpdateWithoutAlumnoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero_tarjeta?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    nombre_tarjeta?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activa?: BoolFieldUpdateOperationsInput | boolean
    titular?: StringFieldUpdateOperationsInput | string
    vencimiento?: StringFieldUpdateOperationsInput | string
    eliminada?: BoolFieldUpdateOperationsInput | boolean
    telefono?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
  }

  export type tarjetasUncheckedUpdateManyWithoutAlumnoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero_tarjeta?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    nombre_tarjeta?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activa?: BoolFieldUpdateOperationsInput | boolean
    titular?: StringFieldUpdateOperationsInput | string
    vencimiento?: StringFieldUpdateOperationsInput | string
    eliminada?: BoolFieldUpdateOperationsInput | boolean
    telefono?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    postal?: StringFieldUpdateOperationsInput | string
  }

  export type pedidosCreateManyCat_estatusInput = {
    id_pedido?: number
    id_alumno: number
    identificador_pago?: string | null
    identificador_pedido?: string | null
    sku?: number | null
    tipo_pago: string
    producto_servicio_motivo_pago: string
    concepto_pago: string
    ciclo: number
    mes: number
    anio: number
    pago?: Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: Date | string | null
    link_de_pago?: string | null
    concepto?: string | null
    transaccion_Id?: string | null
    fecha_carga?: Date | string | null
    fecha_pago?: Date | string | null
    monto_real_pago?: Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosUpdateWithoutCat_estatusInput = {
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alumno?: alumnoUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateWithoutCat_estatusInput = {
    id_pedido?: IntFieldUpdateOperationsInput | number
    id_alumno?: IntFieldUpdateOperationsInput | number
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type pedidosUncheckedUpdateManyWithoutCat_estatusInput = {
    id_pedido?: IntFieldUpdateOperationsInput | number
    id_alumno?: IntFieldUpdateOperationsInput | number
    identificador_pago?: NullableStringFieldUpdateOperationsInput | string | null
    identificador_pedido?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableIntFieldUpdateOperationsInput | number | null
    tipo_pago?: StringFieldUpdateOperationsInput | string
    producto_servicio_motivo_pago?: StringFieldUpdateOperationsInput | string
    concepto_pago?: StringFieldUpdateOperationsInput | string
    ciclo?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    anio?: IntFieldUpdateOperationsInput | number
    pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fecha_vigencia_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link_de_pago?: NullableStringFieldUpdateOperationsInput | string | null
    concepto?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion_Id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_carga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monto_real_pago?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}