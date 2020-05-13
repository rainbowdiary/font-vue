/**
 * 用来管理分类页状态数据的模块
 */
import {reqCategoryList} from '../../api';

import {
  RECEIVE_CATEGORIES,
  UPDATE_INDEX
} from '../mutation-types';

const state = {
  categoryList: [], // 分类数据
  currentIndex: 0 // 当前选中的下标
};
const mutations = {
  [RECEIVE_CATEGORIES] (state, categoryList) {
    state.categoryList = categoryList;
  },
  [UPDATE_INDEX] (state, index) {
    state.currentIndex = index;
  }
};
const actions = {
  // 定义获取分类列表数据的异步action
  async getCategoryList ({commit}) {
    const result = await reqCategoryList();
    if (result.code === 0) {
      commit(RECEIVE_CATEGORIES, result.data.categoryL1List);
    } else {
      console.log('获取数据失败');
    }
  },
  updateIndex ({commit}, index) {
    commit(UPDATE_INDEX, index)
  }
};
const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters
}
