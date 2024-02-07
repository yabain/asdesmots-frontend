
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
// import { database } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  formImage: FormGroup;
  currency: any;

  public url = environment.url;
  public urlProd = environment.urlProd;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initImageForm();
    this.currency = [];
  }



  // Init the image form
  initImageForm() {
    this.formImage = this.fb.group({
      filename: ['', Validators.required],
      filemime: ['', Validators.required],
      data: ['', Validators.required],
      self: ['', Validators.required],
      type: ['', Validators.required],
      uuid: ['', Validators.required],
      lang: [''],
      alt: [''],
      title: [''],
      width: ['', Validators.required],
      height: ['', Validators.required]
    });
  }


  // Add the an image

  addImage(event: any): Promise<any> {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length > 0) {

        const file = event.target.files[0];
        console.log(file);
        reader.readAsDataURL(file);

        reader.onload = () => {

          const imageData: any = reader.result;
          this.formImage.get('filename').setValue(file.name);
          this.formImage.get('filemime').setValue(file.type);
          this.formImage.get('data').setValue(imageData.split(',')[1]);
          this.formImage.get('self').setValue('');
          this.formImage.get('type').setValue('');
          this.formImage.get('uuid').setValue('');
          this.formImage.get('lang').setValue('');
          this.formImage.get('alt').setValue('');
          this.formImage.get('title').setValue('');
          this.formImage.get('width').setValue('');
          this.formImage.get('height').setValue('');
          resolve(this.formImage.value);

        };
      } else {
        reject(null);
      }
    });
  }

  // Set the user access token.
  setAccessToken(token: string) {
    return localStorage.setItem('access-token', token);
  }


  // Get the user access token.
  getAccessToken() {
    return localStorage.getItem('access-token');
  }


  // Set the user refresh token.
  setRefreshToken(token: string) {
    return localStorage.setItem('refresh-token', JSON.stringify(token));
  }

  // Get the user refresh token.
  getRefreshToken() {
    return JSON.parse(localStorage.getItem('refresh-token'));
  }

  // Construct data params
  // tslint:disable-next-line:ban-types
  constructParam(keys: Array<any>, values: Array<any>): Object {

    const param = new Object();

    for (let i = keys.length - 1; i >= 0; i--) {
      Object.defineProperty(param, keys[i], { value: values[i] });
    }

    return param;

  }

  // This service must be call in app.component.ts

  // Get the app token
  getAppToken() {

    this.http.get(`${this.url}/rest/session/token`).subscribe(success => {
      localStorage.setItem('app-token', JSON.stringify(success));
    }, error => {
      localStorage.setItem('app-token', JSON.stringify(error.error.text));
    });
  }


  // Set the request Header
  setHeaders(jsonHeader: boolean, urlEncoded: boolean, token: boolean, accept: boolean, authorization: boolean): any {

    let header = {};

    if (jsonHeader) {
      const headerJson = {
        'Content-Type': 'application/json'
      };
      header = headerJson;
    }

    if (urlEncoded) {
      const header0 = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      };
      header = header0;
    }

    if (accept) {
      const header1 = {
        'Content-Type': 'application/hal+json',
        Accept: 'application/json'
      };
      header = header1;
    }


    if (token) {
      const header2 = {
        'Content-Type': 'application/hal+json',
        'X-CSRF-Token': JSON.parse(localStorage.getItem('app-token')),
        Accept: 'application/json'
      };
      header = header2;
    }

    if (authorization) {
      const header3 = {
        'Content-Type': 'application/hal+json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access-token')),
        Accept: 'application/json',
        'X-CSRF-Token': JSON.parse(localStorage.getItem('app-token')) || '97dKe-0-qukVOMY1YNBhsZ-POfPUArpL11YLfRJFD94'
      };
      header = header3;
    }

    return header;

  }

  // Set image entity
  setImageEntity(data: any) {

    const imageEntity = {
      _links: {
        self: data.links,
        type: {
          href: this.url + '/jsonapi/file/image'
        }
      },
      uuid: [{ value: data.attributes.uuid }],
      lang: data.attributes.langcode || 'fr',
      alt: data.attributes.field_image_alt_text,
      title: data.attributes.field_image_title_text,
      url: data.attributes.url,
      width: '259',
      height: '195'
    };

    console.log(imageEntity);

    return imageEntity;
  }

  // Post an image to the platformBrowserDynamic

  postImages(token: string, data: any) {

    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/hal+json',
      Accept: 'application/json',
      'X-CSRF-Token': 'Nr9nsDXPcTIk3bqDGb2K93KLaRe_z5kH7htvDy81xSc' || JSON.parse(localStorage.getItem('app-token'))
    };


    return new Promise((resolve, reject) => {

      if (data) {
        const param = {

          data: {
            type: 'file--image',
            attributes: {
              data: data.data,
              uri: `public://${data.filename}`
            }
          }

        };
        this.post('jsonapi/file/image?_format=hal_json', param, headers).subscribe(reponse => {
          resolve(reponse.data);
        }, error => {
          reject(error);
          // Manage Error here
        });
      } else {
        resolve(null);
      }
    });
  }




  // HTTP get
  get(endpoint: string, options?: any, body?: Record<string, any>): Observable<any> {
    if (body) {
      let req: String = '';
      // tslint:disable-next-line:forin
      for (const key in body) {
        req += `${key}=${body[key]}&`;
      }
      endpoint += '?' + req;
    }
    console.log(this.url + '/' + endpoint);
    return this.http.get(this.url + '/' + endpoint, { 'headers': options });
  }

  // HTTP post
  post(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.post(this.url + '/' + endpoint + '/', body, { 'headers': options });
  }

  // post1(endpoint: string, body: any, options?: any): Observable<any> {

  //   const headers = options;
  //   return this.http.post(this.url + '/' + endpoint, body, {
  //     headers
  //   });
  // }

  // HTTP put

  put(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.put(this.url + '/' + endpoint + '/', body, { 'headers': options });
  }

  // put(endpoint: string, body: any, options?: any): Observable<any> {

  //   const headers = options;

  //   return this.http.put(this.url + '/' + endpoint, JSON.stringify(body), {
  //     headers
  //   });
  // }

  // HTTP delete
  delete(endpoint: string, options?: any): Observable<any> {
    const headers = options;
    console.log('delete url request', this.url + '/' + endpoint)
    return this.http.delete(this.url + '/' + endpoint, { headers, body: body });
  }

  // HTTP pact
  patch(endpoint: string, body?: any, options?: any): Observable<any> {
    const headers = options;

    return this.http.patch(this.url + '/' + endpoint, JSON.stringify(body), { 'headers': options });
  }


  // Drupal ends point

  /**
   *  Get a node
   */
  getaNode(resource: string, nid: string): Observable<any> {
    const header = this.setHeaders(false, false, false, false, true);
    return this.get(`api/v01/${resource}/${nid}?_format=hal_json`, header);
  }


  /**
   *  Get all a node
   */
  getNodes(resource: string): Observable<any> {
    const header = this.setHeaders(false, false, false, false, true);
    return this.get(`api/v01/${resource}?_format=hal_json`, header);
  }

  /*
  *  Add  a node
  */
  addNode(param: any): Observable<any> {
    const header = this.setHeaders(false, false, false, false, true);
    return this.post(`node?_format=hal_json`, JSON.stringify(param), header);
  }

  /*
  *  Update  a node
  */
  updateNode(nid: string, param: any): Observable<any> {
    const header = this.setHeaders(false, false, false, false, true);
    return this.patch(`node/${nid}?_format=hal_json`, JSON.stringify(param), header);
  }


  /**
   *  Update  a node
   */
  deleteNode(nid: string): Observable<any> {

    const header = this.setHeaders(false, false, false, false, true);
    return this.delete(`node/${nid}?_format=hal_json`, header);

  }


  /**
   *  Refresh the access token
   */
  refreshAccesToken(): Promise<any> {

    return new Promise((resolve, reject) => {

      const params = new URLSearchParams();

      params.append('grant_type', 'refresh_token');
      params.append('client_id', '8a4f8634-4f16-4b6e-b617-554664897bbe');
      params.append('client_secret', 'sdkgames2015');
      params.append('refresh_token', this.getRefreshToken());


      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      };

      this.post('auth/token', params.toString(), headers).subscribe((success: any) => {

        resolve(success);
        this.setAccessToken(success.access_token);
        this.setRefreshToken(success.refresh_token);

      }, (error: any) => {


        if (error && error.error === 'invalid_request') {
          this.toastr.success(error.message);
        }

        reject(error);

      });
    });

  }


  /**
   *  Manage server error
   */
  manageServerError(error: any) {

    console.log(error);

    switch (error.status) {

      case 0:
        this.toastr.success('Please check your internet connexion.');
        break;

      case 403:
        this.refreshAccesToken();
        if (error && error.error && error.error.message) {
          this.toastr.success(error.error.message);
        }
        break;

      default:
        break;

    }
  }

  // Get the node data
  getNodeData(uuid: string, nodes: any): string {

    const nodedata = null;
    if (nodes && nodes.length > 0) {
      nodes.forEach(node => {
        if (node.uuid[0].value === uuid) {
          return node;
        }
      });
    }
    return nodedata;
  }

  // generate random string with
  randomString() {

    let randomtext = '';
    let ramdomnumber = '';
    let text = '';
    const alpha = 'ABCDEFGHJKLMPQRSTUVWXYZabcdefghjklmpqrstuvwxyz';
    const chiffre = '0123456789';
    const date = new Date();

    randomtext = alpha.charAt(Math.floor(Math.random() * alpha.length));
    ramdomnumber = chiffre.charAt(Math.floor(Math.random() * chiffre.length));
    text = date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours()
      + date.getMinutes() + date.getSeconds() + ramdomnumber;


    return parseInt(text, 10);
  }

  /**
   * Returns the week number for this date.  dowOffset is the day of week the week
   * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
   * the week returned is the ISO 8601 week number.
   * @param number dowOffset
   * @return number
   */

  getWeek(dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    const date = new Date();
    let nYear;
    let nday;

    dowOffset = typeof (dowOffset) === 'number' ? dowOffset : 0; // default dowOffset to zero
    const newYear = new Date(date.getFullYear(), 0, 1);
    let day = newYear.getDay() - dowOffset; // the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    const daynum = Math.floor((date.getTime() - newYear.getTime() -
      (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
    let weeknum;
    // if the year starts before the middle of a week
    if (day < 4) {
      weeknum = Math.floor((daynum + day - 1) / 7) + 1;
      if (weeknum > 52) {
        nYear = new Date(date.getFullYear() + 1, 0, 1);
        nday = nYear.getDay() - dowOffset;
        nday = nday >= 0 ? nday : nday + 7;
        /*if the next year starts before the middle of
          the week, it is week #1 of that year*/
        weeknum = nday < 4 ? 1 : 53;
      }
    } else {
      weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
  }

  // filte by day
  hourfilter(data: any[], hour: number) {

    const hoursValid = [];
    let dateFormat;
    data.forEach(item => {
      if (item && item.created && item.created[0].value) {
        dateFormat = new Date(item.created[0].value);
        if (dateFormat.getHours() === hour) {
          hoursValid.push(item);
        }
      }
    });

    return hoursValid;
  }


  // filte by day
  dayfilter(data: any[], day: number) {

    const daysValid = [];
    let dateFormat;
    data.forEach(item => {
      if (item && item.created && item.created[0].value) {
        dateFormat = new Date(item.created[0].value);
        if (dateFormat.getDay() === day) {
          daysValid.push(item);
        }
      }
    });

    return daysValid;

  }


  // filte by day
  datefilter(data: any[], date: number) {

    const datesValid = [];
    let dateFormat;
    data.forEach(item => {
      if (item && item.created && item.created[0].value) {
        dateFormat = new Date(item.created[0].value);
        if (dateFormat.getDate() === date) {
          datesValid.push(item);
        }
      }
    });

    return datesValid;

  }

  // count string occurence in array
  getStringOccurenceMenu(data: any[], nomRepas: string) {

    let occurence = 0;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (data[i].field_nom_repas[0].value === nomRepas) {
        occurence++;
      }
    }
    return occurence;
  }

  // count string occurence in array
  removeStringOccurenceMenu(data: any[], nomRepas: string) {

    for (let i = 0; i < data.length; i++) {
      if (data[i].field_nom_repas[0].value === nomRepas) {
        data.splice(i, 1);
      }
    }
    return data;
  }


  // count string occurence in array
  getStringOccurenceExtras(data: any[], nomRepas: string) {

    let occurence = 0;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (data[i].field_nom_repas[0].value === nomRepas) {
        occurence++;
      }
    }
    return occurence;
  }

  // count string occurence in array
  removeStringOccurenceExtras(data: any[], nomRepas: string) {

    for (let i = 0; i < data.length; i++) {
      if (data[i].field_nom_repas[0].value === nomRepas) {
        data.splice(i, 1);
      }
    }
    return data;
  }

  // count string occurence in array
  getStringOccurenceUser(data: any[], nomUser: string) {

    let occurence = 0;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (data[i].name[0].value === nomUser) {
        occurence++;
      }
    }
    return occurence;
  }

  // count string occurence in array
  removeStringOccurenceUser(data: any[], nomUser: string) {

    for (let i = 0; i < data.length; i++) {
      if (data[i].name[0].value === nomUser) {
        data.splice(i, 1);
      }
    }
    return data;
  }




  // filte by day
  getfulldatefilter(data: any[], date: string) {

    const datesValid = [];
    let dateFormat;
    const currentDate = new Date(date);
    data.forEach(item => {
      if (item && item.created && item.created[0].value) {
        dateFormat = new Date(item.created[0].value);
        if (dateFormat.getFullYear() === currentDate.getFullYear() && dateFormat.getMonth() === currentDate.getMonth()
          && dateFormat.getDate() === currentDate.getDate()) {
          datesValid.push(item);
        }
      }
    });
    return datesValid;
  }

  // count string occurence in array
  getStringOccurenceDate(data: any[], date: string) {

    let occurence = 0;

    let dateFormat;
    const currentDate = new Date(date);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      dateFormat = new Date(data[i].created[0].value);
      if (dateFormat.getFullYear() === currentDate.getFullYear() && dateFormat.getMonth() === currentDate.getMonth()
        && dateFormat.getDate() === currentDate.getDate()) {
        occurence++;
      }
    }
    return occurence;
  }

  // count string occurence in array
  removeStringOccurenceDate(data: any[], date: string) {

    let dateFormat;
    const currentDate = new Date(date);

    for (let i = 0; i < data.length; i++) {
      dateFormat = new Date(data[i].created[0].value);
      if (dateFormat.getFullYear() === currentDate.getFullYear() && dateFormat.getMonth() === currentDate.getMonth()
        && dateFormat.getDate() === currentDate.getDate()) {
        data.splice(i, 1);
      }
    }
    return data;
  }



}
