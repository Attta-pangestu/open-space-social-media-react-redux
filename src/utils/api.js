const api = (() => {

    const BASE_URL = "https://openspace-api.netlify.app/v1";
    
    function putAccessToken(token) {
        localStorage.setItem('accessToken',token);
    }

    function getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    async function _fetchWithAuth(url, options={}) {
        return fetch(url, {
            ...options, 
            headers : {
                Authorization : `Bearer ${getAccessToken()},`
            }
        })
    }
    
    async function register({id, name, password}) {
        const response =  await fetch(`${BASE_URL}/users`, {
            method: 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({id,name, password}),
        });

        const responseJSON = response.json();
        const {status, message} = responseJSON;

        if(status !== 'success'){
            throw new Error(message);
        }
        const {data : {user}} = responseJSON;
        return user ;
    }

    async function login({id, password}) {
        const response =  await fetch(`${BASE_URL}/login`, {
            method: 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({id, password}),
        });

        const responseJSON = response.json();
        const {status, message} = responseJSON;

        if(status !== 'success'){
            throw new Error(message);
        }
        const {data : {token}} = responseJSON;
        return token;
    }

    async function getOwnProfile() {
        const response =  await _fetchWithAuth(`${BASE_URL}/users/me`) ; 

        const responseJSON = response.json();
        const {status, message} = responseJSON;

        if(status !== 'success'){
            throw new Error(message);
        }
        const {data : {user}} = responseJSON;
        return user;
    }

    async function getAllUsers(){
        const response = await fetch(`${BASE_URL}/users`);
        const responseJSON = await response.json();
        const {status, message, data : {users}} = responseJSON;
        
        if(status !== 'success') {
            throw new Error(message);
        }
        return users;
    }

    async function getAllTalks(){
        const response = await fetch(`${BASE_URL}/talks`);
        const responseJSON = await response.json();
        const {status, message, data : {talks}} = responseJSON;
        
        if(status !== 'success') {
            throw new Error(message);
        }

        return talks;
    }

    async function getDetailTalks(id){
        const response = await fetch(`${BASE_URL}/talks/${id}`);
        const responseJSON = await response.json();
        const {status, message, data : {talks}} = responseJSON;
        
        if(status !== 'success') {
            throw new Error(message);
        }

        return talks;
    }

    async function createNewTalk(text, replyTo){
        const response = await _fetchWithAuth(`${BASE_URL}/talks`, {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({text, replyTo}), 
        });
        const responseJSON = await response.json();
        const {status, message, data : {talk}} = responseJSON;
        
        if(status !== 'success') {
            throw new Error(message);
        }

        return talk;
    }

    async function toggleLikeTalk(talkId) {
        const response = await _fetchWithAuth(`${BASE_URL}/talks/like`, {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({talkId}), 
        });
        const responseJSON = await response.json();
        const {status, message} = responseJSON;
        
        if(status !== 'success') {
            throw new Error(message);
        }

    }

    return {
        putAccessToken, 
        getAccessToken, 
        register, 
        login,
        getOwnProfile,
        getAllUsers, 
        getAllTalks, 
        createNewTalk,
        toggleLikeTalk, 
        getDetailTalks, 
    }
    

}) ();

export default api;
