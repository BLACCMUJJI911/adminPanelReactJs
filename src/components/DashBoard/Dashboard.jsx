import React, { useEffect, useState, useRef } from 'react';
import user from "../../assets/user.jpg"
import { storage, db, auth } from '../../config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { v4 } from "uuid";
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"

export default function Dashboard() {

    const [txt, setTxt] = useState('')
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [data, setData] = useState([])
    const [userData, setUserData] = useState([])

    const dashboardRef = useRef(null);
    const myPostsRef = useRef(null);
    const manageRequestsRef = useRef(null);

    const navigate = useNavigate();

    const handleUpload = (e) => {
        
        const imgs = ref(storage, `files/${img.name + "" + "_" + v4()}`)

        uploadBytes(imgs, e.target.files[0]).then(data => {

            console.log(data, "imgs")
            getDownloadURL(data.ref).then(val => {
                setImg(val)

            })

        })
    }

    const handleClick = async () => {

        const valRef = collection(db, 'Admin Data')

        await addDoc(valRef, { description: txt, imgUrl: img, title })
        
        toast("Posted")
        setTxt("--")
        setTitle("")
        setImg("")
        
        getData()

    }

    const getData = async () => {

        const valRef = await getDocs(collection(db, "Admin Data"));
        const filteredData = valRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setData(filteredData);

        const userRef = await getDocs(collection(db, "User Data"));
        const filteredUserData = userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserData(filteredUserData);

    };

    useEffect(() => {

        getData()

    }, []);

    const handleScrollTo = (ref) => {

        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }

    };

    const logOut = async e => {

        e.preventDefault();
        await signOut(auth)

        localStorage.clear()
        navigate("/", {replace:true})

    };

    return (
        <div className="container-fluid bg-light ">
            <div className="row">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block sidebar py-3">
                    <div className="position-sticky">
                        <ul className="nav d-flex flex-column gap-3">
                            <li className='liprof mb-4'>
                                <img
                                    src={user}
                                    alt="Profile"
                                    className="img-fluid rounded-circle"
                                />
                            </li>
                            <li className='mt-2' onClick={() => handleScrollTo(dashboardRef)}>Dashboard</li>
                            <li onClick={() => handleScrollTo(myPostsRef)}>My Posts</li>
                            <li onClick={() => handleScrollTo(manageRequestsRef)}>Manage Requests</li>
                            <li>Settings</li>
                            <li>Terms and Conditions</li>
                            <li className='lastChildLi' onClick={logOut}>Log Out</li>
                        </ul>
                    </div>
                </nav>

                <main ref={dashboardRef} className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-3">
                    <h1 className=' admin bg-warning m-1'>Admin Panel</h1>
                    <hr className='lineAdmin' />
                    <h2>Dashboard</h2>
                    <hr className='mt-4' />
                    <div className="post d-flex flex-column border align-items-center py-3 justify-content-center gap-2 mt-4">

                        <div className='posttxt py-3 w-50 d-flex flex-column align-items-center'>
                            <h3 className=''>Post</h3>
                            <hr className='mb-2 line' />
                        </div>

                        <input className='form-control w-50' onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' />
                        <input className='form-control w-50' onChange={e => setTxt(e.target.value)} placeholder='Description' type="text" />
                        <input className='form-control w-50' onChange={handleUpload} type="file" accept='.jpg' />
                        <small className='text-muted'> Wait 5 to 10 seconds to upload image</small>
                        <button className='btn w-50 bg-warning' onClick={handleClick}>Post</button>
                        <ToastContainer/>
                    </div>

                    <hr />

                    <h2 className='mt-4'>Admin Posts</h2>

                    <hr className='mt-4' />

                    <div ref={myPostsRef} className="userPosts w-100 border mt-4 d-flex flex-wrap gap-3 p-3 align-items-center">

                        {

                            data.map((value) => {
                                return (
                                    <>
                                        <Card style={{ width: '18rem', height: '20rem' }}>
                                            <Card.Img variant="top" className='img mt-2' src={value.imgUrl} />
                                            <hr className='line mx-auto' />
                                            <Card.Body>
                                                <Card.Title className='mt-2'> {value.title} </Card.Title>
                                                <Card.Text className='overflow-auto'>
                                                    {value.description}
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </>
                                )
                            })

                        }

                    </div>

                    <hr />

                    <h2 className='mt-4'>User Posts</h2>

                    <hr className='mt-4' />

                    <div className="userPosts w-100 border mt-4 d-flex flex-wrap gap-3 p-3 align-items-center">

                        {
                            userData.map((value) => {
                                return (
                                    <>

                                        <Card>
                                            <Card.Header>Donation</Card.Header>
                                            <Card.Body>
                                                <Card.Title> {value.donation} </Card.Title>
                                                <Card.Text>
                                                    {value.donation_type}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                            </Card.Body>
                                        </Card>

                                    </>
                                )
                            })
                        }

                    </div>

                    <section ref={manageRequestsRef}>
                        <hr />

                        <h2>Manage Requests</h2>

                        <hr className='mt-4' />

                        

                    </section>

                </main>
            </div>
        </div>
    );
};