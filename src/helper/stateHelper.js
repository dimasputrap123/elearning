import { store } from "../config/redux/store";
import { remove_tmp_rd } from "../config/redux/action/state";

const stateHelper = {
  /**
   * @param (array) tmp_result
   * @param (string) key
   * @param (boolean) removeTmp
   * @return (object)
   * {
   *    status: boolean => status dari result true/false
   *    key: string => identifier
   *    msg: string => messages dari result API
   *    data: any => data dari result API
   * }
   */
  getSpesificTmp: (tmp_result, key, removeTmp = true) => {
    let tmp = null;
    for (let i = 0; i < tmp_result.length; i++) {
      if (Array.isArray(key)) {
        for (let j = 0; j < key.length; j++) {
          if (tmp_result[i].key === key[j]) {
            tmp = { ...tmp_result[i] };
            if (removeTmp) {
              store.dispatch(remove_tmp_rd(tmp.key));
            }
            break;
          }
        }
      } else {
        if (tmp_result[i].key === key) {
          tmp = { ...tmp_result[i] };
          if (removeTmp) {
            store.dispatch(remove_tmp_rd(tmp.key));
          }
          break;
        }
      }
    }
    return tmp;
  },
};

export default stateHelper;
