import { ActivityResponse, CreateActionBody } from '@/types/activity.types';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_ACTIVITY_API,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    params,
  });

  return instance;
};

const ActivityServices = {
  getActivityList: (): Promise<AxiosResponse<ActivityResponse>> => {
    return API().get('/todo-list.json');
  },
  editAction: (
    actionId: string,
    body: CreateActionBody,
  ): Promise<AxiosResponse> => {
    return API().put(`/todo-list/${actionId}.json`, body);
  },
  createAction: (body: CreateActionBody): Promise<AxiosResponse> => {
    return API().post('/todo-list.json', body);
  },
  deleteAction: (actionId: string): Promise<AxiosResponse> => {
    return API().delete(`/todo-list/${actionId}.json`);
  },
};

export default ActivityServices;
