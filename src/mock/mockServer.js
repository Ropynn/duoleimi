import Mock from 'mockjs';
import apiData from './data.json';

Mock.mock('/api/home', {code:0, data:apiData.home});
Mock.mock('/api/member', {code:0, data:apiData.member});
Mock.mock('/api/payment',{code:0,data:apiData.payment})
