import { createSelector } from "reselect";
/**
 * getSpesificTmp
 * @param {object} state
 * {
 *    stateReducer: object
 * }
 * @param {string} key
 * @return {object}
 * {
 *    status: boolean => status dari result true/false
 *    key: string => identifier
 *    msg: string => messages dari result API
 *    data: any => data dari result API
 * }
 */
export const getSpesificTmp = createSelector(
  (state) => state.stateReducer.tmp_result,
  (_, _key) => _key,
  (tmp_result, _key, _removeTmp) => {
    const tmp = tmp_result.filter((e) => e.key === _key);
    return tmp.length > 0 ? tmp[0] : null;
  }
);

/**
 * checkLoadingStatus
 * @param (array) loading_stack
 * @param (string) key
 * @return (boolean)
 */
export const checkLoadingStatus = createSelector(
  (state) => state.stateReducer.loading_stack,
  (_, _key) => _key,
  (loading_stack, _key) => {
    return loading_stack.includes(_key);
  }
);
