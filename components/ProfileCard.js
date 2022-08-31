/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import {
  Button,
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../utils/data/apiData/userData';

export default function ProfileCard() {
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const handleClick = () => {
    if (!user) {
      signIn();
    } else signOut();
    router.push('/');
  };
  const handleEdit = () => {
    router.push('/user/createUser');
  };
  const handleBack = () => {
    router.push('/');
  };
  useEffect(() => {
    getUser(user.uid).then(setUserProfile);
  }, [user]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={handleBack}>
          <IoIosArrowBack />
          Methods
        </Nav.Link>
        <Container>
          <h4>Profile Page</h4>
          <img src={userProfile?.photoUrl} width="50px" alt="profile" />
        </Container>
      </Navbar>
      <>
        <div>
          <div>
            {userProfile?.description
              ? (
                <>
                  <h1>Preferences</h1>
                  <div>
                    <h3>Favorite Method:{userProfile.brewMethod}</h3>
                    <h3>About:</h3>
                    <p>{userProfile.description}</p>
                    <h3>Favorite Roast:{userProfile.favRoast}</h3>
                  </div>
                  <div>
                    <br />
                    <h3>Edit you preferences?</h3>
                    <Button onClick={handleEdit} variant="success">Edit Profile</Button>
                  </div>
                </>
              )
              : (
                <div>
                  <h2>Seems empty in here</h2>
                  <p>Add your coffee preferences</p>
                  <Button onClick={handleEdit} variant="success">Edit Profile</Button>
                </div>
              )}
          </div>
        </div>
      </>
      <div>
        <Button variant={!user ? 'primary' : 'danger'} type="button" size="lg" className="copy-btn" onClick={handleClick}>
          {!user ? 'Sign In' : 'Sign Out'}
        </Button>
      </div>
    </>
  );
}
