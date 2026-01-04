import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { createMMKV } from "react-native-mmkv";

export const storageClient = createMMKV();

const storageClientHandlers = {
  setItem: (key: string, value: string) => {
    storageClient.set(key, value);
  },
  getItem: (key: string) => {
    const value = storageClient.getString(key);

    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storageClient.remove(key);
  },
};

export const persistStorageClient = createAsyncStoragePersister({
  storage: storageClientHandlers,
});
