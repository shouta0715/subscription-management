import { Yyyymmdd } from "@/common";

export const subscriptionBillingStartDateIsBeforeOrEqualToBillingEndDate = (
  billingStartDate: Yyyymmdd,
  billingEndDate: Yyyymmdd,
): boolean =>
  new Date(`${billingStartDate}T00:00:00Z`).getTime() <=
  new Date(`${billingEndDate}T00:00:00Z`).getTime();

export const subscriptionBillingStartDateIsBeforeOrEqualToCanceledDate = (
  billingStartDate: Yyyymmdd,
  canceledDate: Yyyymmdd,
): boolean =>
  new Date(`${billingStartDate}T00:00:00Z`).getTime() <=
  new Date(`${canceledDate}T00:00:00Z`).getTime();

type SubscriptionData = {
  billingStartDate: Yyyymmdd;
  billingEndDate: Yyyymmdd;
  canceledDate: Yyyymmdd;
};

export const isValidSubscriptionData = (data: SubscriptionData): boolean =>
  subscriptionBillingStartDateIsBeforeOrEqualToBillingEndDate(
    data.billingStartDate,
    data.billingEndDate,
  ) &&
  subscriptionBillingStartDateIsBeforeOrEqualToCanceledDate(
    data.billingStartDate,
    data.canceledDate,
  );
