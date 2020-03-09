import { TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { AppService } from './app.service';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

describe('AppService', () => {
  let appService: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService
      ],
      imports: [HttpClientModule,  HttpClientTestingModule, ]
    });

    appService = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getMembers()',  fakeAsync(inject([HttpTestingController, AppService],
    (backend: HttpTestingController, memberService: AppService) => {
      const url = 'http://localhost:8000/api/members';
      let response = null;
      const responseObject = [
      {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      },
      {
        firstName: 'chao',
        lastName: 'xu',
        jobTitle: 'Driver',
        team: 'Deutsche Tourenwagen Masters - Car 118',
        status: true,
        id: 2
      },
    ];

      memberService.getMembers().subscribe(members => {
        response = members;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('GET');
      expect(response).toEqual(responseObject);

  })));

  it('should call getMemberById()',  fakeAsync(inject([HttpTestingController, AppService],
    (backend: HttpTestingController, memberService: AppService) => {
      const url = 'http://localhost:8000/api/member/1';
      let response = null;
      const responseObject = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      };

      memberService.getMemberById(1).subscribe(member => {
        response = member;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('GET');
      expect(response).toEqual(responseObject);

  })));


  it('should add new Member()',  fakeAsync(inject([HttpTestingController, AppService],
    (backend: HttpTestingController, memberService: AppService) => {
      const url = 'http://localhost:8000/api/addMember';
      let response = null;
      const responseObject = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      };

      const newMember = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true
      };

      memberService.addMember(newMember).subscribe(member => {
        response = member;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('POST');
      expect(response).toEqual(responseObject);

  })));

  it('should update Member()',  fakeAsync(inject([HttpTestingController, AppService],
    (backend: HttpTestingController, memberService: AppService) => {
      const url = 'http://localhost:8000/api/member/1';
      let response = null;
      const responseObject = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      };

      const updateMember = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      };

      memberService.updateMember(updateMember).subscribe(member => {
        response = member;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('PUT');
      expect(response).toEqual(responseObject);

  })));


  it('should delete Member()',  fakeAsync(inject([HttpTestingController, AppService],
    (backend: HttpTestingController, memberService: AppService) => {
      const url = 'http://localhost:8000/api/member/1';
      let response = null;
      const responseObject = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      };

      memberService.deleteMember(1).subscribe(member => {
        response = member;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('DELETE');
      expect(response).toEqual(responseObject);

  })));


  it('should get teams',  fakeAsync(inject([HttpTestingController, AppService],
    (backend: HttpTestingController, memberService: AppService) => {
      const url = 'http://localhost:8000/api/teams';
      let response = null;
      const responseObject = [
        {
          id: 1,
          teamName: 'Formula 1 - Car 77'
        },
        {
          id: 2,
          teamName: 'Formula 1 - Car 8'
        }
      ];

      memberService.getTeams().subscribe(member => {
        response = member;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('GET');
      expect(response).toEqual(responseObject);
  })));
});
