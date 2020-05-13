/**
 * 管理多个接口函数的模块
 */
import ajax from './ajax';

export const reqCategoryList = () => ajax('/categorylist');
export const reqHomeData = () => ajax('/home');
