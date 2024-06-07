import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FacemashService } from "../../../services/FacemashService";
import { PhotoModel } from "../../../models/PhotoModel";
import css from "./EditThePhotoPage.module.css";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField } from '@mui/material';

function EditThePhotoPage() {
    const [searchParams] = useSearchParams();
    const pid = searchParams.get("PID"); //รับ PID ของรูปภาพที่ส่งเข้ามาจากหน้า ViewThePhoto เพื่อใช้ในการเเก้ไขรูปภาพนั้นๆ

    // State ที่เอาไว้เก็บข้อมูลรูปภาพของ User คนนั้นๆ โดยมีชนิดเป็น PhotoModel
    const [photo, setPhoto] = useState<PhotoModel>();


    //เก็บข้อมูล photoURL ที่เป็นรูปภาพออนไลน์
    const [photoURL, setPhotoURL] = useState<string>();


    // object ของ service
    const service = new FacemashService();
    //create hook
    const navigate = useNavigate(); //useNavigate hook 

    // //เก็บข้อมูล photoURL ที่เป็นรูปภาพออนไลน์
    // const photoURL = useRef<HTMLInputElement>();

    //เก็บข้อมูล photoName ที่เป็นชื่อรูปภาพที่ User ต้องการเเก้ไข
    const photoName = useRef<HTMLInputElement>();

    // const [checkURL, setCheckURL] = useState<string>();
    // const [checkName, setCheckName] = useState<string>();

    //ไปยังหน้าเเสดงข้อมูลรูปภาพเเละ กราฟ โดยส่ง PID ของรูปภาพกลับไปด้วย
    function navigateToViewThePhoto() {
        navigate("/viewThePhoto?PID=" + pid);
    }



    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            //console.log('ไฟล์ที่เลือก:', file);
            const responsePhotoURL = await service.uploadPhoto(file); //อัปโหลดรูปภาพไปยัง Firebase Storage เเล้วรับ URL ของรูปภาพกลับมาเพื่อนำไปเเสดงผมเเละบันทึกลง database
            if (photo?.photo_url) {
                //ลบรูปภาพเก่าจาก Firebase Storage
                await service.deletePhotoInFilebase(photo.photo_url);
            }
            //ทำการกำหนด URL ของรูปภาพใหม่
            setPhotoURL(responsePhotoURL);

            if (photo) {
                photo.photo_url = responsePhotoURL; //กำหนด URL ของรูปภาพใหม่ให้กับ photo
                setPhoto({ ...photo }); //อัปเดตข้อมูล photo
            }
        }
      }



    //ไปยังหน้าเเสดงรูปภาพทั้งหมดของ User คนนั้นๆ
    function navigateToPhotos() {
        const loadDataAsync = async () => {
            // ทำการเช็คว่า URL ของรูปภาพมีการเปลี่ยนเเปลงหรือไม่ ต้องมีการเปลี่ยนเเปลงเท่านั้นจึงจะ เปลี่ยนรูปภาพได้
            // if (photoURL) {
            //     confirm("กรุณาเปลี่ยนรูปภาพ(URL) ที่ต้องการบันทึก");
            // } else {
                const response = await service.changeUserPhoto(Number(pid), String(photoName.current?.value), String(photoURL));
                console.log(response);
                // ทำการ navigate ไปยังหน้า VotePage
                navigate("/Drawer/photos");
            // }
        };
        loadDataAsync();
    }





    
    useEffect(()=>{
        const loadDataAsync = async () => {
            // ทำการค้นหาข้อมูลของรูปภาพที่ User ต้องการเเก้ไขโดยค้นหาจาก PID ของรูปภาพนั้นๆ
            const response = await service.getPhotoById(Number(pid));
            setPhoto(response); // setState เพื่อให้ Page นี้มีข้อมูลรูปภาพ
            setPhotoURL(response.photo_url);
            // setCheckName(response.name);
        };
        loadDataAsync();
    }, []);






    return(
        <>
            <div className={css.edit_the_photo_page_body}>
                <div className={css.edit_the_photo_page_head}>
                    <div className={css.edit_the_photo_page_head_btnback_name}>
                        <button
                          className={css.edit_the_photo_page_head_btnback}
                          onClick={() => navigateToViewThePhoto()}
                        >
                            <h1>{"< Back"}</h1>
                        </button>
                    </div>
                </div>
                <Card
                  sx={{
                    borderRadius: '25px'
                  }}
                  className={css.edit_the_photo_page_photo}
                >
                    <CardContent className={css.edit_the_photo_page_card_content}>
                        <Typography component="div">
                            <img 
                              style={{ 
                                width: 250, height: 250 
                              }} 
                              src={photo?.photo_url || photoURL} 
                              alt={photo?.photo_url || photoURL} 
                            />
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography component="div">
                            <input style={{ fontFamily: 'Kanit' }} type="file" alt="*" onChange={handleFileUpload}/>
                        </Typography>
                        <br />
                        <Typography component="div">
                            <TextField 
                              id="outlined-multiline-flexible"
                              defaultValue={photo?.name}
                              multiline
                              maxRows={4}
                              sx={{ width: '100%' }}
                              inputRef={photoName}
                            />
                        </Typography>
                    </CardContent>
                    <CardContent className={css.edit_the_photo_page_card_content}>
                        <Typography component="div">
                            <button
                              className={css.custom_button}
                              onClick={() => navigateToPhotos()}
                            >
                                Save
                            </button>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
export default EditThePhotoPage;