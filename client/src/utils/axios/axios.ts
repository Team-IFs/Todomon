
import { AxiosRequestConfig } from 'axios';
import { instance } from './instance'

const defaultOptions: AxiosRequestConfig<any> = {
};

export const GET = (
  url: string,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  return instance.get(url, options);
};

export const POST = (
  url: string,
  data: any,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  const formmated = data;
  return instance.post(url, formmated, options);
};

export const PATCH = (
  url: string,
  data: any,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  const formmated = JSON.stringify(data);
  return instance.patch(url, formmated, options);
};

export const PATCH_NODATA = (
  url: string,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  return instance.patch(url, options);
};

export const DELETE = (
  url: string,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  return instance.delete(url, options);
};
