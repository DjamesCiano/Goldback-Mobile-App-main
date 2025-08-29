export interface IDSMEnvelop<T> {
    code: DSMEnvelopeCodeEnum;
    statusCode?: string;
    httpStatus?: number; // System.Net.HttpStatusCode is an enum, using number to represent it
    errorMessage?: string;
    notes?: string;
    payload?: T;
}
export enum DSMEnvelopeCodeEnum {
    _SUCCESS = 0, // Used to be GEN_COMMON_00001
    GEN_COMMON_00001 = 1,

    // Security
    API_COMMON_01000 = 1000,
    API_COMMON_01001 = 1001,

    // Application Validation
    API_APPVLD_02000 = 2000,
    API_APPVLD_02001 = 2001,

    // Database
    API_DATABASE_03020 = 3020,

    // Facade
    API_FACADE_04000 = 4000,
    API_FACADE_04010 = 4010,  // General error for facades
    API_FACADE_04020 = 4020,  // Not found

    // Repo
    API_REPOS_05001 = 5001,  // General error for repos
    API_REPOS_05010 = 5010,  // Item not found

    // Services
    API_SERVICES_06001 = 6001, // General error for services
}