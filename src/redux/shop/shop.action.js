import ShopActionType from "./shop.types";

export const updateCollections = (collectionMap) => ({
  type: ShopActionType.UPDATE_COLLECTIONS,
  payload: collectionMap,
});
