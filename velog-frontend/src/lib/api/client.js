import axios from 'axios';

const client = axios.create();

// 글로벌 설정 참고: https://fkkmemi.github.io/nemv/nemv-053-axios-interceptor/

// //API 주소
//client.defaults.baseURL = 'http://localhost:8080/';
// //헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

client.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'; //json으로 던지기 위해서..

//client.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken'); //여기서 문제가 발생했네.. 초기값으록 고정됐나보다.

client.interceptors.request.use(
  (request) => {
    //request.headers.common.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    //console.log('Starting Request', JSON.stringify(request, null, 2));
    console.log('Starting Request', request);
    return request;
  },
  (error) => {
    //요청 실패시 뭐 할지
    return Promise.reject(error);
  },
);

//인터셉터 설정
client.interceptors.response.use(
  (response) => {
    //요청 성공 시 특정 작업 수행
    //console.log('응답값: ', response.data);
    //response.headers['withCredentials'] = true;
    console.log(response);
    return response;
  },
  (error) => {
    //요청 실패 시 특정 작업 수행
    console.error('error는: ', error);
    return Promise.reject(error);
  },
);

export default client;
