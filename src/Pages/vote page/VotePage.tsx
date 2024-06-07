import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./vote_page.css";
import { useEffect, useState } from "react";
import { PhotoModel } from "../../models/PhotoModel";
import { FacemashService } from "../../services/FacemashService";
import CircularProgress from '@mui/material/CircularProgress';
import { NewPhotosScoreUsersModel } from "../../models/NewPhotosScoreUsersModel";
import { UpdateScoreModel } from "../../models/UpdateScoreModel";
import { PhotoUserModel } from "../../models/PhotoUserModel";
import { UserModel } from "../../models/UserModel";
import { useNavigate } from "react-router-dom";

export default function VotePage() {

  // สร้าง object ของ class FacemashService
  const services = new FacemashService();

  // สร้าง object เพื่อใช้สำหรับเปลี่ยนหน้า โดยสามารถส่งตัวแปลไปหน้านั้นๆ ได้
  const navigate = useNavigate();


  // ข้อมูลของรูปภาพ
  const [photos, setPhotos] = useState<PhotoModel[]>([]);
  // ผลการแข่งขันเมื่อ vote รูปใดรูปหนึ่ง ได้ทั้งของคนที่ 1 และ 2
  const [updateScore, setUpdateScore] = useState<UpdateScoreModel[]>([]);
  // user ที่เป็นเจ้ารูปภาพที่ 1 และ 2
  const [users, setUsers] = useState<UserModel[]>([]);


  // การแสดงค่าที่ได้ หรือเสียหลังจาก vote ค่าเริ่มต้นคือ false (ไม่แสดง)
  // const [showScore, setShowScore] = useState(false);


  //========================================================================= time out สำหรับหน่วงเวลา
  // ตั้งเวลาให้ setTimeout เป็น 3 วินาที
  // const timeout = setTimeout(() => {
  //   // เมื่อเวลาผ่านไป 3 วินาที ให้กำหนดข้อความใหม่ให้กับ state
  //   // setShowScore(false);
  //   console.log('Timeout has elapsed!');
  // }, 1*1000);


  //========================================================================== เปลี่ยนหน้าไปที่ หน้าแสดงข้อมูลของ user คนนี้
  // โดยรับ UID ของคนนั้นมา
  function navigateToTheUser( uid : number ) {
    navigate('/Drawer/account/?UID=' + uid);
  }


//======================================================================================= เมื่อกด vote รูปภาพใดรูปภาพหนึง จะทำการสุ่มใหม่
  async function votePhoto(pid_1 : number, isWim_1: number, pid_2 : number, isWim_2 : number) {
    // เริ่มแสดง ค่าที่ได้ หรือเสีย
    // setShowScore(true);
    // สั่งให้รอ x วินาที
    // timeout
    // // clart timeout
    // clearTimeout(timeout);

    setPhotos([]);
    setUsers([]);
    setUpdateScore([]);

    const newPhotosScoreUser : NewPhotosScoreUsersModel = await services.votePhoto(pid_1, isWim_1, pid_2, isWim_2);
    // รูปภาพใหม่ที่ได้จากการสุ่ม อต่งรูปที่ชนะจะได้อยู่ต่อ
    setPhotos(newPhotosScoreUser.newPhotoRandom);
    // เจ้าของรูปภาพที่ 2 อัน
    setUsers(newPhotosScoreUser.users);
    // ผลการแข่งขันของทั้ง 2 ฝ่ายว่า ได้ หรือ เสียกีคะแนน
    setUpdateScore(newPhotosScoreUser.updateScore);


    console.log(newPhotosScoreUser);
  }



//======================================================================================= useEffect ทำงานครั้งแรกเสมอเมื่อ load Vote Page ขึ้นมา
  useEffect(() => {
    // เรียก api เพื่อ set ข้อมูลให้กับ photos (มี 2 รูปที่ได้กลับมาจาก api)
    const callAPI = async () => {
      const photosUsersData : PhotoUserModel = await services.randomPhotoForFirstVotePage(); 
      setPhotos(photosUsersData.photos);
      setUsers(photosUsersData.users);
      console.log(photosUsersData);
    };
    // เรียกใช้ function ที่สร้าง
    callAPI();
  }, []);

  

  //==================================================================================
  return (
    <div className="vote_page_body">

      <h1 className="h1">Vote Page</h1>

      <div className="vote_page_photos">


        {/* Card ที่ 1 */}
        {
          (updateScore.length > 0)
            ?<>{updateScore[0].score.toFixed(0)}</>
            :<></>
        }
        {
          (photos.length > 0)
            ? 
              <div className="vote_page_photos_photoCard_and_userAvatar">
                {/* รูปภาพที่ 1 */}
                <Card className="vote_page_image_grow" sx={{ maxWidth: 345, borderRadius: '30px', border: '5px ridge rgb(97, 82, 192, 1)' }}>
                  <CardActionArea
                    // ถ้ากดที่รูปนี้ แสดงว่า รูปนี้ ชนะ แต่รูปอีกฝั่งจะแพ้
                    onClick={() => votePhoto(photos[0].PID, 1, photos[1].PID, 0)}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={photos[0].photo_url}
                      alt={photos[0].name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" className="vote_page_image_text">
                        <h5>{photos[0].name}</h5>
                        {/* toFixed(0) คือ ไม่แสดงจุดทศนิยม ( >= 0.5 ปัดขึ้น) */}
                        <p>คะแนน: {photos[0].score.toFixed(0)}</p>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                {/* คนที่เป็นเจ้าของรูปภาพที่ 1 */}
                {
                  (localStorage.getItem('userObjStr'))
                  ? <Avatar
                    className="vote_page_photos_userAvatar"
                    alt={users[0]?.name}
                    src={users[0]?.image}
                    sx={{ width: 80, height: 80 }}
                    onClick={() => navigateToTheUser(users[0]?.UID)}
                  />
                  :null
                }
              </div>

              // ถ้ายังไม่มีข้อมูลจะแสดงการ load
            :<div className="votePage_cardLoading">
                <CircularProgress/>
             </div>
        }


        <h1>VS</h1>


        {/* Card ที่ 2 */}
        {
          (updateScore.length > 0)
            ?<>{updateScore[1].score.toFixed(0)}</>
            :<></>
        }
        {
          (photos.length > 0)
            ?
              <div className="vote_page_photos_photoCard_and_userAvatar">
                <Card className="vote_page_image_grow" sx={{ maxWidth: 345, borderRadius: '30px', border: '5px ridge rgb(97, 82, 192, 1)' }}>
                  <CardActionArea
                    // ถ้ากดที่รูปนี้ แสดงว่า รูปนี้ ชนะ แต่รูปอีกฝั่งจะแพ้
                    onClick={() => votePhoto(photos[0].PID, 0, photos[1].PID, 1)}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={photos[1].photo_url}
                      alt={photos[1].name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" className="vote_page_image_text">
                        <h5>{photos[1].name}</h5>
                        {/* toFixed(0) คือ ไม่แสดงจุดทศนิยม ( >= 0.5 ปัดขึ้น) */}
                        <p>คะแนน: {photos[1].score.toFixed(0)}</p>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                {/* คนที่เป็นเจ้าของรูปภาพที่ 2 */}
                {
                  (localStorage.getItem('userObjStr'))
                  ? <Avatar
                    className="vote_page_photos_userAvatar"
                    alt={users[1]?.name}
                    src={users[1]?.image}
                    sx={{ width: 80, height: 80 }}
                    onClick={() => navigateToTheUser(users[1]?.UID)}
                  />
                  :null
                }
              </div>

              // ถ้ายังไม่มีข้อมูลจะแสดงการ load
            :<div className="votePage_cardLoading">
                <CircularProgress/>
             </div>
        }
      </div>


      <div className="vote_page_text">
        <p>ระหว่างสองรูปภาพนี้</p>
        <p>คุณชอบรูปภาพไหนมากกว่ากัน</p>
      </div>
    </div>
  );
}
