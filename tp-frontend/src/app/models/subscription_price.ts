interface ISubscriptionPrice {
    effectiveDate: Date;
    price: number;
}

export class SubscriptionPrice implements ISubscriptionPrice {
    effectiveDate: Date = new Date();
    price: number = 0.0;
}