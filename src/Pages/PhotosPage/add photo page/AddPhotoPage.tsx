import { useNavigate } from "react-router-dom";
import css from "./AddPhotoPage.module.css";
import { Card, CardContent, Typography, TextField } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useRef, useState } from "react";
import { FacemashService } from "../../../services/FacemashService";

function AddPhotoPage() {
    //เก็บข้อมูล photoURL ที่เป็นรูปภาพออนไลน์
    const [photoURL, setPhotoURL] = useState<string>();

    //เก็บข้อมูล photoName ที่เป็นชื่อรูปภาพที่ User ต้องการใช้
    const photoName = useRef<HTMLInputElement>();

    // object ของ service
    const service = new FacemashService();
    
    //create hook
    const navigate = useNavigate(); //useNavigate hook 
    //ไปยังหน้าเเสดงรูปภาพทั้งหมดของ user คนนั้น
    function navigateToPhotos() {
        navigate("/Drawer/photos");
    }


    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            //console.log('ไฟล์ที่เลือก:', file);
            const responsePhotoURL = await service.uploadPhoto(file);
            setPhotoURL(responsePhotoURL);
        }
    }



    // function สำหรับเพิ่มรูปภาพของผู้ใช้งาน โดยจะเพิ่มได้ไม่เกิน 5 รูป
    function addPhoto() {
        const loadDataAsync = async () => {
            // ทำการเช็คว่าผู้ใช้ป้อนข้อมูล photoURL เเละ photoName เข้ามาหรือไม่
            if (photoURL && photoName) {
                // ดึงข้อมูลของ User จาก localStorage ที่ได้ Login ไว้มาใช้งานโดยดึงข้อมูลจาก key userObjStr
                const localStorageData = localStorage.getItem("userObjStr");
                if (localStorageData) {
                    // ทำการเเปลงข้อมูลของ User ที่เป็น json string ไปเป็น object
                    const userData = JSON.parse(localStorageData);
                    const response = await service.addPhoto(userData.UID, photoURL, String(photoName.current?.value));
                    if (response == 201) {
                        navigate("/Drawer/photos");
                    } else {
                        confirm("ไม่สามารถอัพโหลดรูปภาพได้เกิน 5 รูป");
                    }
                }
            } else {
                confirm("กรุณากรอกข้อมูลของรูปภาพให้ครบ");
            }   
        };
        loadDataAsync();
    }
    

    
    return(
        <>
            <div className={css.add_photo_page_body}>
                <div className={css.add_photo_page_head}>
                    <div className={css.add_photo_page_head_btnback_name}>
                        <button
                          className={css.add_photo_page_head_btnback}
                          onClick={() => navigateToPhotos()}
                        >
                            <h1>{"< Back"}</h1>
                        </button>
                    </div>
                </div>
                <Card
                  sx={{
                    borderRadius: '25px'
                  }}
                  className={css.add_photo_page_photo}
                >
                    <CardContent className={css.add_photo_page_card_content}>
                        <Typography component="div">
                            <InsertPhotoIcon
                              sx={{
                                width: 250,
                                height: 250
                              }}
                            />
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography component="div">
                            <input 
                              type="file" 
                              alt="*" 
                              onChange={handleFileUpload}
                              style={{
                                fontFamily: 'Kanit',
                              }}
                            />
                        </Typography>
                        <br />
                        <Typography component="div">
                            <TextField 
                              id="outlined-multiline-flexible"
                              label="Photo Name"
                              multiline
                              maxRows={4}
                              sx={{ width: '100%' }}
                              inputRef={photoName}
                            />
                        </Typography>
                    </CardContent>
                    <CardContent className={css.add_photo_page_card_content}>
                        <Typography component="div">
                            <button 
                              className={css.custom_button}
                              onClick={() => addPhoto()}
                            >
                                Add
                            </button>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
export default AddPhotoPage;