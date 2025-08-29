import { toPositive, withTwoDecimals } from "@/utils";

export type Transaction = {
  id?: string;
  payloadVersion: string;
  deviceId: string;
  transactionDate: string;
  lastUpdateDate: string;
  description: string;
  payload: ITransactionValues;
  coord: GPSCoordintateType;
};

export type GPSCoordintateType = {
  longitude: number;
  latitude: number;
};

export interface ITransactionValues {
  rate: number;
  sourceCurrency: string;
  targetCurrency: string;
  price: number;
  payment: number;
  due: number;
  change: number;
}

export interface ITransactionValuesCalculator {
  rate: number;
  sourceCurrency: string;
  targetCurrency: string;
  price: number;
  payment: number;
  due: CalculatorValue;
  change: CalculatorValue;
}

export type OrValue = {
  orValueGB: CalculatorValue;
  orValueRemainder: CalculatorValue;
};

export type CalculatorValue = {
  value: number;
  formattedValue: string;
  positiveFormattedValue: string;
};

export class TransactionClass implements ITransactionValuesCalculator {
  rate: number;
  sourceCurrency: string;
  targetCurrency: string;
  price: number;
  payment: number;

  /**
   * Gets the rate trimmed to two decimal places.
   * If the rate is zero, it returns 0.
   *
   * @returns {number} The rate trimmed to two decimal places.
   */
  get trimmedRate(): number {
    if (this.rate === 0) return 0;
    return Number(this.rate.toFixed(2));
  }

  get due(): CalculatorValue {
    // Check for no values
    if (!this.price || this.trimmedRate === 0) {
      return {
        value: 0,
        formattedValue: this._setDecimals(0),
        positiveFormattedValue: this._setDecimals(0),
      };
    }

    let result = this.price / this.trimmedRate;
    let integerPart = Math.floor(result);
    let decimalPart = result - integerPart;

    if (decimalPart > 0.5) {
      result = Math.ceil(result);
    } else if (decimalPart > 0) {
      result = integerPart + 0.5;
    }

    if (result < 1) result = 1;

    return {
      value: result,
      formattedValue: this._setDecimals(result),
      positiveFormattedValue: this._setDecimals(toPositive(result)),
    };
  }

  get change(): CalculatorValue {
    const result = this.trimmedRate * this.payment - this.price;
    return {
      value: result,
      formattedValue: this._setDecimals(result),
      positiveFormattedValue: this._setDecimals(toPositive(result)),
    };
  }

  get orObject(): OrValue {
    const gbValue = this._getOrValue();
    const remainderValue: number =
      (this.payment - gbValue) * this.trimmedRate - this.price;

    return {
      orValueGB: {
        value: gbValue,
        formattedValue: this._setDecimals(gbValue),
        positiveFormattedValue: this._setDecimals(toPositive(gbValue)),
      },
      orValueRemainder: {
        value: remainderValue,
        formattedValue: this._setDecimals(remainderValue),
        positiveFormattedValue: this._setDecimals(toPositive(remainderValue)),
      },
    };
  }

  private _getOrValue(): number {
    const divisionResult = this.change.value / this.trimmedRate;

    const isNegative = divisionResult < 0;

    let integerPart = isNegative
      ? Math.ceil(divisionResult)
      : Math.floor(divisionResult);

    let decimalPart = divisionResult - integerPart;
    decimalPart = toPositive(decimalPart);

    let adjusted;

    if (decimalPart >= 0.5) {
      adjusted = integerPart + (divisionResult > 0 ? 0.5 : -0.5);
    } else {
      adjusted = integerPart;
    }

    return adjusted;
  }

  constructor(
    rate: number,
    sourceCurrency: string,
    targetCurrency: string,
    price: number,
    payment: number
  ) {
    this.rate = rate;
    this.sourceCurrency = sourceCurrency;
    this.targetCurrency = targetCurrency;
    this.price = price;
    this.payment = payment;
  }

  private _setDecimals(value: number | string): string {
    if (this.targetCurrency !== "USDGB") return withTwoDecimals(value);
    return value.toString();
  }

  calculateChange(): number {
    return this.payment - Number(this.due);
  }

  updateRate(newRate: number): void {
    this.rate = newRate;
  }

  convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number {
    if (
      fromCurrency === this.sourceCurrency &&
      toCurrency === this.targetCurrency
    ) {
      return amount * this.rate;
    } else if (
      fromCurrency === this.targetCurrency &&
      toCurrency === this.sourceCurrency
    ) {
      return amount / this.rate;
    } else {
      throw new Error("Currency conversion not supported");
    }
  }
}
