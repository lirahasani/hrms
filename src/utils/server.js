import Vue from 'vue'
import axios from 'axios'

import {
  throttleAdapterEnhancer
} from 'axios-extensions';

const throttleConfig = {
  threshold: 2 * 1000 // 2 seconds
}

const site_axios = axios.create({
  timeout: 0,
  keepAlive: false,
  headers: {
    'Cache-Control': 'no-cache',
    "Content-Type": "application/json",
  },
  responseType: 'json', // default
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, throttleConfig)
})


site_axios.interceptors.request.use(function (config) {
  const token = Vue.$cookies.get("token");
  if (token != null) {
     config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (err) {
  return Promise.reject(err);
});


export const API_CONFIG = {
  SITE_AXIOS: site_axios,
  API_ENDPOINT: 'http://localhost:8000/api/'
}
