/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * Film
 * A Film resource is a single film.
 */
export type Film = Item & {
  /** An array of people resource URLs that are in this film. */
  characters?: string[];
  /** The name of the director of this film. */
  director?: string;
  /** The episode number of this film. */
  episode_id?: number;
  /** The opening paragraphs at the beginning of this film. */
  opening_crawl?: string;
  /** An array of planet resource URLs that are in this film. */
  planets?: string[];
  /** The name(s) of the producer(s) of this film. Comma separated. */
  producer?: string;
  /** The ISO 8601 date format of film release at original creator country. */
  release_date?: string;
  /** An array of species resource URLs that are in this film. */
  species?: string[];
  /** An array of starship resource URLs that are in this film. */
  starships?: string[];
  /** The title of this film. */
  title?: string;
  /** An array of vehicle resource URLs that are in this film. */
  vehicles?: string[];
};

/** FilmList */
export type FilmList = List & {
  /** The list of films */
  results?: Film[];
};

/** Item */
export interface Item {
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: string;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: string;
  /** The hypermedia URL of this resource. */
  url?: string;
}

/** List */
export interface List {
  /** Total count of records in this list. Note that the IDs are not sequential, you should not make any assumptions about the range of valid IDs based on this value. */
  count?: number;
  /** The URL to the next page, or `null` if there is no next page. */
  next?: string;
  /** The URL to the previous page, or `null` if there is no previous page. */
  previous?: string;
}

/**
 * Person
 * A People resource is an individual person or character within the Star Wars universe.
 */
export type Person = Item & {
  /** The birth year of the person, using the in-universe standard of **BBY** or **ABY** - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
  birth_year?: string;
  /** The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye. */
  eye_color?: string;
  /** An array of film resource URLs that this person has been in. */
  films?: string[];
  /** The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender. */
  gender?: string;
  /** The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair. */
  hair_color?: string;
  /** The height of the person in centimeters. */
  height?: string;
  /** The URL of a planet resource, a planet that this person was born on or inhabits. */
  homeworld?: string;
  /** The mass of the person in kilograms. */
  mass?: string;
  /** The name of this person. */
  name?: string;
  /** The skin color of this person. */
  skin_color?: string;
  /** An array of species resource URLs that this person belongs to. */
  species?: string[];
  /** An array of vehicle resource URLs that this person has piloted. */
  starships?: string[];
  /** An array of starship resource URLs that this person has piloted. */
  vehicles?: string[];
};

/** PersonList */
export type PersonList = List & {
  /** The list of people */
  results?: Person[];
};

/**
 * Planet
 * A Planet resource is a large mass, planet or planetoid in the Star Wars Universe, at the time of 0 ABY.
 */
export type Planet = Item & {
  /** The climate of this planet. Comma separated if diverse. */
  climate?: string;
  /** The diameter of this planet in kilometers. */
  diameter?: string;
  /** An array of Film URL Resources that this planet has appeared in. */
  films?: string[];
  /** A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
  gravity?: string;
  /** The name of this planet. */
  name?: string;
  /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
  orbital_period?: string;
  /** The average population of sentient beings inhabiting this planet. */
  population?: string;
  /** An array of People URL Resources that live on this planet. */
  residents?: string[];
  /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
  rotation_period?: string;
  /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
  surface_water?: string;
  /** The terrain of this planet. Comma separated if diverse. */
  terrain?: string;
};

/** PlanetList */
export type PlanetList = List & {
  /** The list of planets */
  results?: Planet[];
};

/**
 * Root
 * The Root resource provides information on all available resources within the API.
 */
export interface Root {
  /** The URL root for Film resources */
  films?: string;
  /** The URL root for People resources */
  people?: string;
  /** The URL root for Planet resources */
  planets?: string;
  /** The URL root for Species resources */
  species?: string;
  /** The URL root for Starships resources */
  starships?: string;
  /** The URL root for Vehicles resources */
  vehicles?: string;
}

/**
 * Species
 * A Species resource is a type of person or character within the Star Wars Universe.
 */
export type Species = Item & {
  /** The average height of this species in centimeters. */
  average_height?: string;
  /** The average lifespan of this species in years. */
  average_lifespan?: string;
  /** The classification of this species, such as "mammal" or "reptile". */
  classification?: string;
  /** The designation of this species, such as "sentient". */
  designation?: string;
  /** A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes. */
  eye_colors?: string;
  /** An array of Film URL Resources that this species has appeared in. */
  films?: string[];
  /** A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair. */
  hair_colors?: string;
  /** The URL of a planet resource, a planet that this species originates from. */
  homeworld?: string;
  /** The language commonly spoken by this species. */
  language?: string;
  /** The name of this species. */
  name?: string;
  /** An array of People URL Resources that are a part of this species. */
  people?: string[];
  /** A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin. */
  skin_colors?: string;
};

/** SpeciesList */
export type SpeciesList = List & {
  /** The list of species */
  results?: Species[];
};

/**
 * Starship
 * A Starship resource is a single transport craft that has hyperdrive capability.
 */
export type Starship = Item & {
  /** The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth. */
  MGLT?: string;
  /** The maximum number of kilograms that this starship can transport. */
  cargo_capacity?: string;
  /** The maximum length of time that this starship can provide consumables for its entire crew without having to resupply. */
  consumables?: string;
  /** The cost of this starship new, in galactic credits. */
  cost_in_credits?: string;
  /** The number of personnel needed to run or pilot this starship. */
  crew?: string;
  /** An array of Film URL Resources that this starship has appeared in. */
  films?: string[];
  /** The class of this starships hyperdrive. */
  hyperdrive_rating?: string;
  /** The length of this starship in meters. */
  length?: string;
  /** The manufacturer of this starship. Comma separated if more than one. */
  manufacturer?: string;
  /** The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight. */
  max_atmosphering_speed?: string;
  /** The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station". */
  model?: string;
  /** The name of this starship. The common name, such as "Death Star". */
  name?: string;
  /** The number of non-essential people this starship can transport. */
  passengers?: string;
  /** An array of People URL Resources that this starship has been piloted by. */
  pilots?: string[];
  /** The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation" */
  starship_class?: string;
};

/** StarshipList */
export type StarshipList = List & {
  /** The list of starships */
  results?: Starship[];
};

/**
 * Vehicle
 * A Vehicle resource is a single transport craft that does not have hyperdrive capability.
 */
export type Vehicle = Item & {
  /** The maximum number of kilograms that this vehicle can transport. */
  cargo_capacity?: string;
  /** The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply. */
  consumables?: string;
  /** The cost of this vehicle new, in Galactic Credits. */
  cost_in_credits?: string;
  /** The number of personnel needed to run or pilot this vehicle. */
  crew?: string;
  /** An array of Film URL Resources that this vehicle has appeared in. */
  films?: string[];
  /** The length of this vehicle in meters. */
  length?: string;
  /** The manufacturer of this vehicle. Comma separated if more than one. */
  manufacturer?: string;
  /** The maximum speed of this vehicle in the atmosphere. */
  max_atmosphering_speed?: string;
  /** The model or official name of this vehicle. Such as "All-Terrain Attack Transport". */
  model?: string;
  /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike". */
  name?: string;
  /** The number of non-essential people this vehicle can transport. */
  passengers?: string;
  /** An array of People URL Resources that this vehicle has been piloted by. */
  pilots?: string[];
  /** The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
  vehicle_class?: string;
};

/** VehicleList */
export type VehicleList = List & {
  /** The list of vehicles */
  results?: Vehicle[];
};

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://swapi.profiq.com";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Elixir SWAPI
 * @version 0.1.0
 * @baseUrl https://swapi.profiq.com
 *
 * The Star Wars API, reimplemented in Elixir
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags root
     * @name SwapiWebRootControllerIndex
     * @summary Get URL roots for all available resources
     * @request GET:/api
     */
    swapiWebRootControllerIndex: (params: RequestParams = {}) =>
      this.request<Root, any>({
        path: `/api`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags films
     * @name SwapiWebFilmControllerIndex
     * @summary Get all the film resources
     * @request GET:/api/films
     */
    swapiWebFilmControllerIndex: (
      query?: {
        /** One or more search terms, which should be whitespace and/or comma separated. If multiple search terms are used then objects will be returned in the list only if all the provided terms are matched. Searches may contain quoted phrases with spaces, each phrase is considered as a single search term. */
        search?: string;
        /**
         * Page number. Cannot be used together with `offset`.
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Offset of the first item. Cannot be used together with `page`.
         * @min 0
         */
        offset?: number;
        /**
         * Maximum number of items to return in the response.
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FilmList, any>({
        path: `/api/films`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags films
     * @name SwapiWebFilmControllerShow
     * @summary Get a specific film resource
     * @request GET:/api/films/{id}
     */
    swapiWebFilmControllerShow: (id: number, params: RequestParams = {}) =>
      this.request<Film, any>({
        path: `/api/films/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name SwapiWebPersonControllerIndex
     * @summary Get all people resources
     * @request GET:/api/people
     */
    swapiWebPersonControllerIndex: (
      query?: {
        /** One or more search terms, which should be whitespace and/or comma separated. If multiple search terms are used then objects will be returned in the list only if all the provided terms are matched. Searches may contain quoted phrases with spaces, each phrase is considered as a single search term. */
        search?: string;
        /**
         * Page number. Cannot be used together with `offset`.
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Offset of the first item. Cannot be used together with `page`.
         * @min 0
         */
        offset?: number;
        /**
         * Maximum number of items to return in the response.
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonList, any>({
        path: `/api/people`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name SwapiWebPersonControllerShow
     * @summary Get a specific people resource
     * @request GET:/api/people/{id}
     */
    swapiWebPersonControllerShow: (id: number, params: RequestParams = {}) =>
      this.request<Person, any>({
        path: `/api/people/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags planets
     * @name SwapiWebPlanetControllerIndex
     * @summary Get all planet resources
     * @request GET:/api/planets
     */
    swapiWebPlanetControllerIndex: (
      query?: {
        /** One or more search terms, which should be whitespace and/or comma separated. If multiple search terms are used then objects will be returned in the list only if all the provided terms are matched. Searches may contain quoted phrases with spaces, each phrase is considered as a single search term. */
        search?: string;
        /**
         * Page number. Cannot be used together with `offset`.
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Offset of the first item. Cannot be used together with `page`.
         * @min 0
         */
        offset?: number;
        /**
         * Maximum number of items to return in the response.
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PlanetList, any>({
        path: `/api/planets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags planets
     * @name SwapiWebPlanetControllerShow
     * @summary Get a specific planet resource
     * @request GET:/api/planets/{id}
     */
    swapiWebPlanetControllerShow: (id: number, params: RequestParams = {}) =>
      this.request<Planet, any>({
        path: `/api/planets/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags species
     * @name SwapiWebSpeciesControllerIndex
     * @summary Get all species resources
     * @request GET:/api/species
     */
    swapiWebSpeciesControllerIndex: (
      query?: {
        /** One or more search terms, which should be whitespace and/or comma separated. If multiple search terms are used then objects will be returned in the list only if all the provided terms are matched. Searches may contain quoted phrases with spaces, each phrase is considered as a single search term. */
        search?: string;
        /**
         * Page number. Cannot be used together with `offset`.
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Offset of the first item. Cannot be used together with `page`.
         * @min 0
         */
        offset?: number;
        /**
         * Maximum number of items to return in the response.
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SpeciesList, any>({
        path: `/api/species`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags species
     * @name SwapiWebSpeciesControllerShow
     * @summary Get a specific species resource
     * @request GET:/api/species/{id}
     */
    swapiWebSpeciesControllerShow: (id: number, params: RequestParams = {}) =>
      this.request<Species, any>({
        path: `/api/species/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags starships
     * @name SwapiWebStarshipControllerIndex
     * @summary Get all starship resources
     * @request GET:/api/starships
     */
    swapiWebStarshipControllerIndex: (
      query?: {
        /** One or more search terms, which should be whitespace and/or comma separated. If multiple search terms are used then objects will be returned in the list only if all the provided terms are matched. Searches may contain quoted phrases with spaces, each phrase is considered as a single search term. */
        search?: string;
        /**
         * Page number. Cannot be used together with `offset`.
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Offset of the first item. Cannot be used together with `page`.
         * @min 0
         */
        offset?: number;
        /**
         * Maximum number of items to return in the response.
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<StarshipList, any>({
        path: `/api/starships`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags starships
     * @name SwapiWebStarshipControllerShow
     * @summary Get a specific starship resource
     * @request GET:/api/starships/{id}
     */
    swapiWebStarshipControllerShow: (id: number, params: RequestParams = {}) =>
      this.request<Starship, any>({
        path: `/api/starships/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicles
     * @name SwapiWebVehicleControllerIndex
     * @summary Get all vehicle resources
     * @request GET:/api/vehicles
     */
    swapiWebVehicleControllerIndex: (
      query?: {
        /** One or more search terms, which should be whitespace and/or comma separated. If multiple search terms are used then objects will be returned in the list only if all the provided terms are matched. Searches may contain quoted phrases with spaces, each phrase is considered as a single search term. */
        search?: string;
        /**
         * Page number. Cannot be used together with `offset`.
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Offset of the first item. Cannot be used together with `page`.
         * @min 0
         */
        offset?: number;
        /**
         * Maximum number of items to return in the response.
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<VehicleList, any>({
        path: `/api/vehicles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicles
     * @name SwapiWebVehicleControllerShow
     * @summary Get a specific vehicle resource
     * @request GET:/api/vehicles/{id}
     */
    swapiWebVehicleControllerShow: (id: number, params: RequestParams = {}) =>
      this.request<Vehicle, any>({
        path: `/api/vehicles/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
