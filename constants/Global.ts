import { Quotes } from "@/models/Quotes";

const API_URL = "https://gbcapi.gbdomainapi.xyz/GBCalculatorSettingsAPICSharpProdV1";

//const API_URL = "http://192.168.1.4:7072/api";
 
const INITIAL_SOURCE: keyof Quotes = "USDUSD";

const OCM_SUBSCRIPTION_KEY = "14b8cd90c80149a888d9986e22dbfb95";

export { INITIAL_SOURCE, API_URL, OCM_SUBSCRIPTION_KEY };