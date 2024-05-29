import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../entities/user';
import { Subject } from 'rxjs';
// import { AuthService } from 'src/app/shared/api/api.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = new User();

  currentUserSubject:Subject<User> = new Subject<User>();
  public static isUser = true;

  listUser:User[]=[];

  params: any;
  userData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    // private authService: AuthService
  ) { }

  /*
*  Set the user informations.
*/
  setUserInformations(user: any) {
    this.currentUser = user;
    localStorage.setItem('user-data', JSON.stringify(user));
    
    //this.login.isLoggedIn = true;
  }


  emitUserData()
  {
    this.currentUserSubject.next(this.userData);
  }
  
  /*  
 *  get the user informations.
 */
getUserInformations() {
  console.log(JSON.parse(localStorage.getItem('user-data')));
  // tslint:disable-next-line:prefer-const
  const data: any = {
  // console.log(JSON.parse(localStorage.getItem('user-data')).result._id);
  field_id: JSON.parse(localStorage.getItem('user-data'))._id,
  field_adility: JSON.parse(localStorage.getItem('user-data')).adility,
  field_accountType: JSON.parse(localStorage.getItem('user-data')).accountType,
  field_address: JSON.parse(localStorage.getItem('user-data')).address,
  field_email : JSON.parse(localStorage.getItem('user-data')).adresse.email,
  field_language : JSON.parse(localStorage.getItem('user-data')).adresse.language,
  field_country : JSON.parse(localStorage.getItem('user-data')).adresse.country,
  field_city : JSON.parse(localStorage.getItem('user-data')).adresse.city,
  field_mobilePhone : JSON.parse(localStorage.getItem('user-data')).adresse.mobilePhone,
  field_phone : JSON.parse(localStorage.getItem('user-data')).adresse.phone,
  field_firstname : JSON.parse(localStorage.getItem('user-data')).firstname,
  field_lastname : JSON.parse(localStorage.getItem('user-data')).lastname,
  field_zip : JSON.parse(localStorage.getItem('user-data')).adresse.zip,
  field_contact : JSON.parse(localStorage.getItem('user-data')).contact,
  field_whatsappContact : JSON.parse(localStorage.getItem('user-data')).whatsappContact,
  field_image : JSON.parse(localStorage.getItem('user-data')).image,
  field_skype : JSON.parse(localStorage.getItem('user-data')).skype,
  field_websiteLink : JSON.parse(localStorage.getItem('user-data')).websiteLink,
};
  // console.log(data);
  return data;
}


  /*
  *  Get local user profile data.
  */
  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem('user-data'));
    this.emitUserData();
    return this.userData;
    /*if (this.userData) {
      this.login.isLoggedIn = true;
      return true;
    } else {
      this.login.isLoggedIn = false;
      return false;
    }*/
  }

  /*
  * resetPassword is used to reset your password.
  */
  resetPassword() {
    this.toastr.success('Email Sent');
    this.router.navigate(['login']);
  }

  

  // permet denvoyer le code au user par mail pour reset son password
  sendCodeUserByEmail(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        'email': data
      };
      this.api.post('api/v01/recover-user/by-email?_format=hal_json', JSON.stringify(params)).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // permet de valider le code renseigné par le user
  validateCodeEmailUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        'user.field_email': data.user.field_email,
        'user_code': data.user_code
      };
      this.api.post(`api/v01/recover-user/by-email/validate-code`, JSON.stringify(params)).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // permet de changer le password du user dès lors quil a renseigné le bon code
  changeUserPassword(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        'user.field_email': data.user.field_email,
        'user_code': data.user_code,
        'user.password': data.user.password
      };
      this.api.post(`api/v01/recover-user/by-email/change-password`, JSON.stringify(params)).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }


  // Permet de get le user connected en renvoyant toutes les infos nécessaires sur le profil du user
  userConnectedInformations(): Promise<any> {

    return new Promise((resolve, reject) => {
      // console.log('de nimporte quoi');
      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      };

      this.api.get('requester/profil', headers)
      .subscribe((response: any) => {
        if (response) {
          // let userData: any[];
          // userData['user.field_email'] = response.result.email;
          // userData['user.field_country'] = response.result.address.contray;
          // userData['user.field_phone'] = response.result.address.mobilePhone;
          // userData['user.field_id'] = response.result._id;
          // userData['user.field_firstName'] = response.result.firstname;
          // userData['user.field_lastName'] = response.result.lastname;

          resolve(response);
          this.userData = response.result;
          this.emitUserData();
          this.setUserInformations(response);
        }

      }, (error: any) => {

        if (error) {
          console.log(error);
          this.toastr.success(error.message);
          reject(error);
        }
      });
    });
  }

  parseDataFromApi(userApiData:Record<string | number,any>):User
  {
    let user:any;
    user.field_id= userApiData._id;
    user.field_firstName= userApiData.firstname;
    user.field_lastName= userApiData.lastname;
    user.field_email= userApiData.adresse.email;
    user.field_city= userApiData.localtions;
    user.field_country= userApiData.adresse.coutry;
    user.password= userApiData.password;
    user.field_contact= userApiData.adresse.mobilePhone;
    user.field_whatsappContact= userApiData.adresse.whatsAppNumber;
    // user.field_image=[];
    user.field_phone= userApiData.adresse.phone;
    user.field_skype= userApiData.adresse.skypeNumber;
    user.field_websiteLink= userApiData.adresse.websiteLink;
    return user;
  }

  parseDataToApi(user):Record<string|number,any>
  {
    return {
      "_id": user.field_id,
      "firstname": user.field_firstName,
      "lastname": user.field_lastName,
      "password": user.password,
      "adresse": {
        "email": user.field_email,
        "mobilePhone": user.field_contact,
        "phone": user.field_phone,
        "websiteLink": user.field_websiteLink,
        "whatsAppNumber": user.field_whatsappContact,
        "skypeNumber": user.field_skype,
        "country": user.field_country
      }
    }
  }

  
  // permet d'update les infos d'un user
  updateUser(userId: any, userData?: any): Promise<any> {
    console.log("upsate user: ", userData);

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
      }

      // const cheminUrl = `${this.api.url}/rest/type/user/user`;
      // this.params = {
      //   '_id': userData.id,

      //   'user.field_surname': [
      //     {
      //       'value': userData.user.field_surname
      //     }
      //   ],

      //   'user.field_username': [
      //     {
      //       'value': userData.user.field_username
      //     }
      //   ],

      //   'user.field_addresse_gps': [
      //     {
      //       'lat': 52.47878999999999649617166141979396343231201171875,
      //       'lng': -0.11067700000000000072619688040731489309109747409820556640625
      //     }
      //   ],

      //   'user.field_address': [
      //     {
      //       'value': userData.user.field_address
      //     }
      //   ],

      //   'user.field_mobile_phone_number': [
      //     {
      //       'value': userData.user.field_mobile_phone_number
      //     }
      //   ],

      //   'user.field_phone_number': [
      //     {
      //       'value': userData.user.field_phone_number
      //     }
      //   ],

      //   'user.field_whatsapp_number': [
      //     {
      //       'value': userData.user.field_whatsapp_number
      //     }
      //   ],
      // };

      this.params = userData;

      this.api.put(`user/profil/${userId}`, this.params, headers)
        .subscribe((response: any) => {
          // if (response) {
            if (response.statusCode === 201) {
              // this.registResult = true;
              // this.router.navigate(['login']);
              this.toastr.success("Your account has been created. You will receive a confirmation email.", 'Success', { timeOut: 7000 });
            }
            console.log("respose: ", response)
            resolve(response);
          //   return 0;
          // }
        }, (error: any) => {
          this.errorsService.errorsInformations(error, "update account")
          reject(error);
        });
      // this.api.patch(`user/${nid}?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
      //   resolve(success);
      // }, error => {
      //   reject(error);
      // });
    });
  }
  // permet d enregistrer les pays y compris les choix des villes fait par le user
  saveCountriesAndCities(token: string, data: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'L37xETNIYg_slJIQMKlJIti9b5uwdOmKaP_lOnnq4hE' || JSON.parse(localStorage.getItem('app-token'))
      }
      const cheminUrl = `${this.api.url}/rest/type/node/countries`;
      this.params = {
        '_links': {
          'type': {
            'href': cheminUrl
          }
        },
        // représente le nom du pays
        'title': [
          {
            'value': data.title
          }
        ],
        // représente le tableau de JSON des villes saisies
        'user.field_city': data.user.field_city || [],
        'type': [
          {
            'target_id': 'countries'
          }
        ]
      };
      this.api.post(`entity/node?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // Permet de get les infos des pays choisis y compris ces villes pour un user
  getCountriesCitiesUser(token: string, id_node: string): Promise<any> {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/hal+json',
      'Accept': 'application/json',
      'X-CSRF-Token': 'L37xETNIYg_slJIQMKlJIti9b5uwdOmKaP_lOnnq4hE' || JSON.parse(localStorage.getItem('app-token'))
    }
    return new Promise((resolve, reject) => {
      this.api.get(`node/${id_node}?_format=hal_json`, headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // Permet d enregistrer un document personnel du user (ID CARD, PROOF OF RESIDENCE, ...)
  saveUserDocument(token: string, data: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json'
      }
      const cheminUrl = `${this.api.url}/rest/type/file/image`;
      this.params = {
        '_links': {
          'type': {
            'href': cheminUrl
          }
        },
        // ici on mets le nom du fichier suivi de .pdf
        'filename': [{ 'value': data.filename }],
        // ou "application/pdf"
        'filemime': [{ 'value': 'application/octet-stream' }],
        // on mets la valeur du fichier converti en base64
        'data': [{ 'value': data.data }]
      };
      this.api.post(`entity/file?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  //recuperer les informations d'un utilisateur
  getUserById(id:String):Promise<any>
  {
    return new Promise<any>((resolve,reject)=>{
      let user:User=this.listUser.find((u)=>u.id==id);
      if(user!=undefined) resolve(user);
      else{
        this.api.get(`user/profil/${id}`,{
          'Authorization': 'Bearer ' + this.api.getAccessToken(),

        }).subscribe(success => {
          if(success)
          {
            // console.log("Success ",success)
            if(success.resultCode==0)
            {
              resolve(this.parseDataFromApi(success.result));
            }
            else reject(success)

          }
          else reject(success)
        }, error => {
          reject(error);
        })
      }
    })
  }

}
