import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public serverUrl: string = 'http://127.0.0.1:3000/api/';

    constructor(private http: Http) { }

    login(username: string, password: string): Observable<Response> {
        let loginObject = { email: username, password: password };
        return this.http.post('/api/authenticate', loginObject)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if (response) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', response.json().token);
                    localStorage.setItem('currentUser', JSON.stringify(response.json()));
                }
                return response;
            });
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    createAuthorizationHeader(): Headers {
        let headers = new Headers();
        headers.append('x-access-token', localStorage.getItem('token'));
        return headers;
    }

}
