import { Yyyymmdd } from "../common";

type SubscriptionData = {
  billingStartDate: Yyyymmdd;
  billingEndDate: Yyyymmdd;
  canceledDate: Yyyymmdd;
};

export const isValidSubscriptionData = (data: SubscriptionData): boolean => {
  const { billingStartDate, billingEndDate, canceledDate } = data;

  const startTimestamp = new Date(`${billingStartDate}T00:00:00Z`).getTime();
  const canceledTimestamp = new Date(`${canceledDate}T00:00:00Z`).getTime();
  const endTimestamp = new Date(`${billingEndDate}T00:00:00Z`).getTime();

  return (
    startTimestamp <= canceledTimestamp && canceledTimestamp <= endTimestamp
  );
};
