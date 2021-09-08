import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member} from './members/models/member.model';
// import { createFeatureSelector } from '@ngrx/store';
import { throwError } from 'rxjs';
// interface APIErrorResponse extends HttpErrorResponse {
//   error: {
//      id?: string
//      links?: { about: string }
//      status: string
//      code?: string
//      title?: string
//      detail?: string
//      source?: {
//         pointer?: string
//         parameter?: string
//      }
//      meta?: any
//   };
// }

const headerOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) {}

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.api}/member/${id}`, headerOptions)
    .pipe(catchError(this.handleError));
 }

 // add new member
 addMember(member: Member) {
  if (this.isMemberInvalid(member)) {
    const err: HttpErrorResponse = {
      name: 'HttpErrorResponse',
      message: 'invalid model',
      status: 500,
      ok: false,
      headers: null,
      statusText: 'error adding new member',
      url: '',
      type: null,
      error: {
         status:  '500',
      }
    };
    throw throwError(err);
  } else {
    const mem = {
      firstName: member.firstName,
      lastName: member.lastName,
      jobTitle: member.jobTitle,
      team: member.team,
      status: member.status
    };

    return this.http.post<Member>(`${this.api}/addMember`, mem, headerOptions)
    .pipe(catchError(this.handleError));
  }
 }

 private isMemberInvalid(member: Member): boolean {
  if (!member.firstName || !member.lastName || !member.jobTitle || !member.team || member.status === null) {
    return true;
  } else {
    return false;
  }
 }

 // update existing member
 updateMember(member: Member) {
  if (this.isMemberInvalid(member)) {
    const err: HttpErrorResponse = {
      name: 'HttpErrorResponse',
      message: 'invalid member model',
      status: 500,
      ok: false,
      headers: null,
      statusText: 'error updating member',
      url: '',
      type: null,
      error: {
         status:  '500',
      }
    };
    throw throwError(err);
  } else {
    const json = {
      firstName: member.firstName,
      lastName: member.lastName,
      jobTitle: member.jobTitle,
      team: member.team,
      status: member.status
     };
    return this.http.put<Member>(`${this.api}/member/${member.id}`, json, headerOptions)
     .pipe(catchError(this.handleError));
 }
}

 // delete existing member
 deleteMember(id: number): Observable<Member> {
    return this.http.delete<Member>(`${this.api}/member/${id}`, headerOptions)
    .pipe(catchError(this.handleError));
 }

  setUsername(name: string): void {
    this.username = name;
  }

  // get all teams
  getTeams() {
    return this.http
    .get(`${this.api}/teams`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
