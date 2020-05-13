/**
 * vuex中保存多个直接更新状态数据的方法的模块
 */
import {
  UPDATE_CATEGORIES,
  UPDATE_INDEX
} from './mutation-types';
export default {
  [UPDATE_CATEGORIES] (state, categoryList) {
    state.categoryList = categoryList;
  },
  [UPDATE_INDEX] (state, index) {
    state.currentIndex = index;
  }
}
