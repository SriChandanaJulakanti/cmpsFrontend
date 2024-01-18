import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class StudentInfoService {
  private uploadUrl = 'http://localhost:8080/student/importData';
  private apiUrlForConcentrations = 'http://localhost:8080/student/getAllConcentrations';
  private apiUrl= 'http://localhost:8080/student';
  constructor(
    private http: HttpClient,
  ) { }

  public getStudentInfo(uNumber : string): Observable<any> {
    const httpParams = new HttpParams().set('uNumber', uNumber);
    return this.http.get('http://localhost:8080/cmpsWeb/student/getStudentDetail',
      {
        params: httpParams
      });
  }

  public getConcentrationInfo(): Observable<any> {
    return this.http.get('http://localhost:8080/cmpsWeb/student/concentrations');
  }

  public reportDownloadUrl(): Observable<any> {
    return this.http.get('http://localhost:8080/cmpsWeb/student/report-download-url',
      {
        headers: new HttpHeaders().append('Accept', 'application/pdf'),
        responseType: 'blob'
      });
  }

  addCourse(courseData: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/addCourse`, courseData, { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getConcentrations(): Observable<any> {
    return this.http.get(this.apiUrlForConcentrations);
  }

  addConcentration(name: string, createdBy: string): Observable<string> {
    const url = 'http://localhost:8080/student/addConcentration';
    
    const params = new HttpParams()
      .set('name', name)
      .set('createdBy', createdBy);

      return this.http.post(url, params.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        responseType: 'text' // Change the response type to 'text'
      });
  }
}
