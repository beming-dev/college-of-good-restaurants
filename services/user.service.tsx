import { BehaviorSubject, Observable } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import { fetchWrapper } from '../helpers/fetch-wrapper';

type loginF = (username:string, password:string) => Promise<any>
type logoutF = () => void
type getAllF = () => Promise<any>
interface userService{
    user:Observable<boolean|null>
    userValue : any
    login:loginF
    logout:logoutF
    getAll:getAllF
}

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

//타입 문제 있음 string||null
const userSubject:BehaviorSubject<boolean|null> = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user') || "null"));

const login:loginF = (username, password) => {
    return fetchWrapper.post(`${baseUrl}/user-management/login`, {username, password})
    .then(user => {
        userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        Router.push("/");
        return user;
    })
}

const logout:logoutF = () => {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}

const getAll:getAllF = () => {
    return fetchWrapper.get(baseUrl);
}

export const userService:userService = {
    user:userSubject.asObservable(),
    get userValue () {return userSubject.value},
    login, 
    logout,
    getAll
}