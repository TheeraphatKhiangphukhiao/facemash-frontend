// import { Avatar, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
// import "./photos_page.css";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";

// export default function PhotosPage() {


//   const navigate = useNavigate();

//   // ไปหน้าแสดงข้อมูลของรูปภาพนี้
//   function navigateToViewThePhoto() {
//     navigate('/viewThePhoto');
//   }

  
//   // function สำหรับแสดง card photo (รูปภาพทั้งของ user คนนี้)
//   function cardPhoto(photo: string) {
//     return (
//       <>
//         <Card sx={{ borderRadius: '50px' }} className="photos_page_photo">
//           <CardActionArea onClick={() => navigateToViewThePhoto()}>
//             <CardMedia
//               component="img"
//               height="245"
//               image="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K33D8UsYlVoZhvx0yzpePduqLtPwGMxc9httjGfZwzXgUzimzR.jpg"
//               alt="green iguana"
//               // className="photos_page_photo_cardmedia_grow"
//             />
//             <CardContent>
//               <Typography variant="body2" className="photos_page_photo_CardContent">
//                 <p>ชื่อ: {photo}</p>
//                 <p>คะแนน: {"15"}</p>
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </>
//     );
//   }


//   // ===============================================================================================
//   return (

//     <div className="photos_page_body">

//       {/*======================================================= ส่วนหัว */}
//       <div className="photos_page_heard">
//         {/*============================ แสดงรูป และชื่อ */}
//           <div className="photos_page_heard_avatar_name">
//             <Avatar
//             alt="name..."
//             src="https://live.staticflickr.com/65535/52715000158_f090710c83_b.jpg"
//             sx={{
//               width: 120,
//               height: 120,
//               border: "5px ridge rgb(97, 82, 192, 1)",
//             }}
//             className="photos_page_photo_cardmedia_grow"
//             />
//             <h1 className="photos_page_heard_name">Amarin Setthamanop</h1>
//           </div>

//         {/*============================= ปุ่มเพิ่มรูป */}
//         <IconButton sx={{ backgroundColor: "rgb(97, 82, 192, 1)" }}>
//           <AddIcon
//             sx={{ width: 50, height: 50 }}
//             className="photos_page_heard_btn_add"
//           />
//         </IconButton>
//       </div>


//       {/* ======================================================= ส่วนแสดงรูปภาพหลายรูป */}
//       <div className="photos_page_photos">
//         {/* แสดงรูปหลายรูป */}
//         {
//           ["1", "2", "3", "4", "5"].map((value) => cardPhoto(value))
//         }
//       </div>
//     </div>
//   );
// }











import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import "./photos_page.css";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FacemashService } from "../../services/FacemashService";
import { PhotoModel } from "../../models/PhotoModel";
import { UserModel } from "../../models/UserModel";

export default function PhotosPage() {
  // State ที่เอาไว้เก็บข้อมูลรูปภาพของ User คนนั้นๆ โดยมีชนิดเป็น PhotoModel
  const [photos, setPhotos] = useState<PhotoModel[]>([]);
  // State ที่เอาไว้เก็บข้อมูล User คนนั้นๆ โดยมีชนิดเป็น UserModel
  const [user, setUser] = useState<UserModel>();

  // ตัวดึงตัวค่ามาจาดตัวแปลใน path
  const [searchParams] = useSearchParams();

  // ดึง UID มาจาก path ที่ส่งมาจาด หน้า VotePage กับ AllUsersPage
  const uidFrom_VotePage_AllUsersPage = searchParams.get("UID"); //รับ PID

  // object ของ service
  const service = new FacemashService();
  const navigate = useNavigate();

  // ไปหน้าแสดงข้อมูลของรูปภาพนี้
  function navigateToViewThePhoto(pid: number) {
    if (uidFrom_VotePage_AllUsersPage) {
      navigate("/viewThePhoto?PID=" + pid + "&UID=" + uidFrom_VotePage_AllUsersPage); //ทำการส่ง pid ของรูปภาพที่เลือกไปยังหน้า แสดงข้อมูลของรูปภาพ
    }
    else {
      navigate("/viewThePhoto?PID=" + pid); //ทำการส่ง pid ของรูปภาพที่เลือกไปยังหน้า แสดงข้อมูลของรูปภาพ
    }
  }
  // ไปหน้าสำหรับเพิ่มรูปภาพของ User คนนั้นๆ โดยสามารถอัพโหลดรูปภาพได้ไม่เกิน 5 รูป
  function navigateToAddPhoto() {
    navigate("/addPhoto");
  }

  useEffect(() => {
    setPhotos([]);
    if (uidFrom_VotePage_AllUsersPage) {
      const loadDataAsync = async () => {
          const userData = await service.select_user_by_id(Number(uidFrom_VotePage_AllUsersPage));
          setUser(userData);
          const response = await service.getAllPhoto(userData.UID);
          setPhotos(response); // ทำการ setState ให้มีข้อมูล Photo โดยเอาข้อมูลมาจาก database
      };
      loadDataAsync();
    }
    else {
      const loadDataAsync = async () => {
        // ดึงข้อมูลของ User จาก localStorage ที่ได้ Login ไว้มาใช้งานโดยดึงข้อมูลจาก key userObjStr
        const localStorageData = localStorage.getItem("userObjStr");
        if (localStorageData) {
          // ทำการเเปลงข้อมูลของ User ที่เป็น json string ไปเป็น object
          const userData = JSON.parse(localStorageData);
          setUser(userData); // ทำการ setState ให้มีข้อมูล User โดยเอาข้อมูลมาจาก localStorage
          const uid = userData.UID; // นำข้อมูล UID ของผู้ใช้ออกมา
  
          const response = await service.getAllPhoto(uid);
          setPhotos(response); // ทำการ setState ให้มีข้อมูล Photo โดยเอาข้อมูลมาจาก database
        }
      };
      loadDataAsync();
    }
  }, [uidFrom_VotePage_AllUsersPage]);

  // function สำหรับแสดง card photo (รูปภาพทั้งของ user คนนี้)
  function cardPhoto(photo: PhotoModel) {
    return (
      <>
        <Card sx={{ borderRadius: "50px" }} className="photos_page_photo">
          <CardActionArea onClick={() => navigateToViewThePhoto(photo.PID)}>
            <CardMedia
              component="img"
              height="245"
              image={photo.photo_url}
              alt="green iguana"
              // className="photos_page_photo_cardmedia_grow"
            />
            <CardContent>
              <Typography
                variant="body2"
                className="photos_page_photo_CardContent"
              >
                <p>ชื่อ: {photo.name}</p>
                <p>คะแนน: {photo.score.toFixed(0)}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }

  // ===============================================================================================
  return (
    <div className="photos_page_body">
      {/*======================================================= ส่วนหัว */}
      <div className="photos_page_heard">
        {/*============================ แสดงรูป และชื่อ */}
        <div className="photos_page_heard_avatar_name">
          <Avatar
            alt="name..."
            src={user?.image}
            sx={{
              width: 120,
              height: 120,
              border: "5px ridge rgb(97, 82, 192, 1)",
            }}
            className="photos_page_photo_cardmedia_grow"
          />
          <h1 className="photos_page_heard_name">{user?.name}</h1>
        </div>

        {/*============================= ปุ่มเพิ่มรูป */}
        {
          (uidFrom_VotePage_AllUsersPage)
            ? null
            : <IconButton sx={{ backgroundColor: "rgb(97, 82, 192, 1)" }} onClick={() => navigateToAddPhoto()}>
                <AddIcon
                  sx={{ width: 50, height: 50 }}
                  className="photos_page_heard_btn_add"
                />
              </IconButton>
        }
      </div>

      {/* ======================================================= ส่วนแสดงรูปภาพหลายรูป */}
      <div className="photos_page_photos">
        {/* แสดงรูปหลายรูป */}
        {
          (photos.length > 0)
            ? photos.map((photo) => cardPhoto(photo)

            // ถ้าไม่มีรูปภาพ
          ) : <h1 className="photos_page_photos_is_null">ไม่มีรูปภาพ กรุณาเพิ่มรูปภาพ</h1>
        }
      </div>

      <div className="photos_page_body_endsclipt">
        <p>.</p>
      </div>

    </div>
  );
}