/**
 * vuex中保存多个简洁更新状态数据的方法的模块
 */
import {reqCategoryList} from '../api';
import {
  UPDATE_CATEGORIES,
  UPDATE_INDEX
} from './mutation-types';
export default {
  // 定义获取分类列表数据的异步action
  async getCategoryList ({commit}) {
    const result = await reqCategoryList();
    if (result.code === 0) {
        commit(UPDATE_CATEGORIES, result.data);
    } else {
      console.log('获取数据失败');
    }
  },
  updateIndex ({commit}, index) {
    commit(UPDATE_INDEX, index)
  }
}
