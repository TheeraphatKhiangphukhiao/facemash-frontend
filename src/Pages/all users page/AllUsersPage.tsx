import { Avatar, Card, CardContent, TextField } from '@mui/material';
import './all_users_page.css'
import { UserModel } from '../../models/UserModel';
import { useEffect, useState } from 'react';
import { FacemashService } from '../../services/FacemashService';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

export default function AllUsersPage() {

    // สร้าง object ของ class FacemashService
    const services = new FacemashService();

    // users ทั้งหมด
    const [users, setUsers] = useState<UserModel[]>([]);
    
    const navigate = useNavigate();
    //========================================================================== เปลี่ยนหน้าไปที่ หน้าแสดงข้อมูลของ user คนนี้
    // โดยรับ UID ของคนนั้นมา
    function navigateToTheUser( uid : number ) {
        navigate('/Drawer/account/?UID=' + uid);
    }



    //======================================================= component สำหรับสาร้าง Card หนึ่งตัว
    function userCard( user : UserModel ) {
        return (
            <Card className='alluserspage_body_card' sx={{ borderRadius: '25px' }}>
                <CardContent className='alluserspage_body_card_contents'>
                    {/* Card content ส่วนของ รูปและชื่อ */}
                    <div className="alluserspage_body_card_contents_imageAndName">
                        <Avatar
                            alt={""+user?.name}
                            src={user?.image}
                            sx={{ width: 100, height: 100 }}
                            className='alluserspage_body_card_contents_image'
                            />
                        <h4 className='alluserspage_body_card_contents_Name'>{user?.name}</h4>
                    </div>
                    {/* ส่วนของปุ่ม view */}
                    <div className="alluserspage_body_card_contents_button_div">
                        <button className='alluserspage_body_card_contents_button_view'
                            onClick={() => navigateToTheUser(user?.UID)}
                        >
                            view
                        </button>
                    </div>


                </CardContent>
            </Card>
        );
    }


    //==========================================================================================
    useEffect(() => {
        const callAPI = async () => {
            const usersData : UserModel[] = await services.getAllUsers();
            setUsers(usersData);
        };
        callAPI();
    }, []);


    return (
    <>
        <div className="alluserspage_body">
            {/*=================================================== header ส่วนหัว Users และ ปุ่ม */}
            <div className="alluserspage_body_head">
                {/*============================ Users */}
                <h1 className='alluserspage_body_head_title' >Users</h1>
                {/*============================ Button */}
                <div className='alluserspage_body_head_textField_button'>
                    <TextField
                        // required
                        className='alluserspage_body_head_textField'
                        placeholder='Time'
                        defaultValue={5}
                        size='small'
                    />
                    <button className='alluserspage_body_head_button'>
                        Set time for voting {"(s)"}
                    </button>
                </div>
            </div>

            {/* Cards ส่วนแสดง cards ของ user หลายตัว */}
            <div className="alluserspage_body_cards">
                {
                    (users.length > 0)
                        ? users.map((user) => userCard(user))

                        // ถ้ายังไม่มีข้อมูลส่งมา
                        : <div className="alluserspage_body_cards_loading">
                            <CircularProgress/>
                          </div>
                }
            </div>

        </div>
    </>
    );
}