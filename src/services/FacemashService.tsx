import axios from "axios";
import { UserModel } from "../models/UserModel";
import { PhotoUserModel } from "../models/PhotoUserModel";
import { NewPhotosScoreUsersModel } from "../models/NewPhotosScoreUsersModel";
import { PhotoRankingTodayAndYesterdayModel } from "../models/PhotoRankingTodayAndYesterdayModel";
import { PhotoModelHasGraph } from "../models/photoModelHasGraph";
import { PhotoModel } from "../models/PhotoModel";

// eslint-disable-next-line react-refresh/only-export-components
// const MyHost: string = "http://127.0.0.1:3000";

// eslint-disable-next-line react-refresh/only-export-components
const MyHost: string = "https://facemash-app.onrender.com"; //ใช้ URL ที่ทำการ Deploy ไว้ใน render.com

export class FacemashService {

//============================================================================== api test
  async testAPI() {
    const url = MyHost + "/user";
    const response = await axios.get(url);
    console.log('testAPI : ' + response.data);
    return response.data;
  }
  

// //============================================================================== api สำหรับ log in
//   async login(email: string, password: string) {
//     const url = MyHost + '/user/login';
//     const body = {
//       "email":  email,
//       "password":  password,
//     };    
//     const response = await axios.post(url, body);
//     const user: UserModel = response.data;
//     return user;
//   }


// //========================================================================== api สำหรับ select user by id
//   async select_user_by_id(userUID: string) {
//     const url = MyHost + "/user/login/" + userUID;
//     const response = await axios.get(url);
//     const user: UserModel = response.data;
//     return user;
//   }









//============================================================================== api สำหรับ random รูปภาพเมื่อเปิดมาหน้า Vote Page ครั้งแรก
  async randomPhotoForFirstVotePage() {
    const url = MyHost + "/photo/randomPhoto";
    const response = await axios.get(url);
    const photosUser : PhotoUserModel = response.data;
    return photosUser;
  }

  
//=============================================================================== api เมื่อกด vote รูปภาพ
  async votePhoto(pid_1 : number , isWim_1 : number, pid_2 : number, isWim_2 : number) {
    // กำหนด body ที่จะส่งไป
    const body = {
      "vote_data": [
        {
          "PID": pid_1,
          "is_win": isWim_1
        },
        {
          "PID": pid_2,
          "is_win": isWim_2
        }
      ]
    }
    const url = MyHost + "/vote/votePhoto";
    const response = await axios.post(url, body);
    const newPhotosAndScore : NewPhotosScoreUsersModel = response.data;
    return newPhotosAndScore;
  }


  //=============================================================================== api แสดง ranking ของรูปภาพในวันนี้ และเมื่อวาน
  async rankingPhotosTodayAndYesterday() {
    const url = MyHost + "/photo/photosRanking";
    const response = await axios.get(url);
    const photosRankingTodayAndYesterday : PhotoRankingTodayAndYesterdayModel = response.data;
    return photosRankingTodayAndYesterday;
  }

  //=============================================================================== api get users ออดมาทั้งหมด
  async getAllUsers() {
    const url = MyHost + "/user/admin/admin";
    const response = await axios.get(url);
    const users : UserModel[] = response.data;
    return users;
  }




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //============================================================================== api สำหรับ login
  async login(email: string, password: string) {
    const url = MyHost + '/user/login';
    const body = {
      "email":  email,
      "password":  password,
    };    
    const response = await axios.post(url, body);
    console.log(response.data);
    const user: UserModel = response.data[0];
    return user;
  }

//============================================================================== api สำหรับ signup
  async signup(name: string, email: string, password: string) {
    const url = MyHost + '/user/signup';
    const body = {
      "name": name,
      "email":  email,
      "password":  password,
    };    
    const response = await axios.post(url, body);
    return response.data;
  }


//========================================================================== api สำหรับ select user by id
  async select_user_by_id(uid: number) {
    const url = MyHost + "/user/" + uid;
    const response = await axios.get(url);
    //เนื่องจากว่า json ที่ถูกส่งออกมาเป็น List เเต่เราต้องการข้อมูลของ User เเค่คนนั้นๆก็เลยต้องใช้ [0]
    const user: UserModel = response.data[0];
    return user;
  }

//========================================================================== api สำหรับ ค้นหารูปภาพทั้งหมดของ User คนนั้นๆ
  async getAllPhoto(uid: number) {
    const url = MyHost + "/photo/user/" + uid;
    const response = await axios.get(url);
    const photo: PhotoModel[] = response.data;
    return photo;
  }

//========================================================================== api สำหรับ นับจำนวนรูปภาพของ User คนนั้นๆ
  async countImage(uid: number) {
    const url = MyHost + "/user/count/photo/" + uid;
    const response = await axios.get(url);
    return response.data[0];
  }

//========================================================================== api สำหรับเพิ่มรูปภาพของ User คนนั้นๆ โดยจะเพิ่มได้ไม่เกิน 5 รูป
  async addPhoto(uid: number, photoURL: string, photoName: string) {
    const url = MyHost + "/photo/";
    const body = {
      "name": photoName,
      "photo_url":  photoURL,
      "score":  0, // เมื่อเพิ่มรูปภาพใหม่กำหนดให้ score เป็น 0
      "UID": uid,
    };
    const response = await axios.post(url, body);
    // ทำการส่ง status กลับไป 201 คือเพิ่มรูปภาพสำเร็จ เเละ 205 คือเพิ่มรูปภาพไม่สำเร็จเนื่องจาก User คนนั้นๆจะเพิ่มรูปภาพได้ไม่เกิน 5 รูป
    return response.status;
  }

//========================================================================== api สำหรับเเสดงกราฟ 7 วันย้อนหลัง
  async getGrophForThePhoto(pid: number) {
    const url = MyHost + "/photo/thePhotoGraphs/" + pid;
    const response = await axios.get(url);
    const photoHasGraph: PhotoModelHasGraph = response.data;
    return photoHasGraph;
  }

//========================================================================== api สำหรับค้นหารูปภาพด้วย PID
  async getPhotoById(pid: number) {
    const url = MyHost + "/photo/" + pid;
    const response = await axios.get(url);
    const photo: PhotoModel = response.data[0];
    return photo;
  }

//========================================================================== api สำหรับลบรูปภาพของผู้ใช้คนนั้นๆ
  async deletePhotoById(pid: number) {
    const url = MyHost + "/photo/" + pid;
    const response = await axios.delete(url);
    return response.status;
  }

//========================================================================== api สำหรับเปลี่ยนรูปภาพได้ (ข้อมูลเดิมของรูปภาพจะหายไป และรูปภาพต้องถูกลบออกจากเครื่อง)
  async changeUserPhoto(pid: number, name: string, photo_url: string) {
    const url = MyHost + "/photo/" + pid;
    const body = {
      "name": name,
      "photo_url":  photo_url,
    };
    const response = await axios.put(url, body);
    return response.data;
  }

  //========================================================================== api สำหรับอับเดตข้อมูลของ User
  async update_user_information(uid: number, name: string, image: string, email: string, password: string) {
    const url = MyHost + "/user/update/information/" + uid;
    const body = {
      "name": name,
      "email":  email,
      "password": password,
      "image": image,
    };
    const response = await axios.put(url, body);
    return response.data;
  }

  //========================================================================== api สำหรับ upload photo ไปที่ filebase
  async uploadPhoto(file: File) {
    const url = MyHost + "/upload/";
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(url, formData);
    return response.data;
  }

  //=========================================================================== api สำหรับ delete รูปใน filebase
  async deletePhotoInFilebase( path: string ) {
    const url = MyHost + "/upload/deleadimageFirebase?path=" + path;
    const response = await axios.delete(url);
    return response;
  }
}
