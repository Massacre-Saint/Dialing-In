/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { GiCoffeeBeans } from 'react-icons/gi';
import { IoTimeSharp, IoWaterSharp } from 'react-icons/io5';
import { Image } from 'react-bootstrap';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';
import { deleteProcess } from '../../utils/data/apiData/process';
import { deleteRecipeSteps, deleteUserRecipeEquipment, getSingleRecipeUser } from '../../utils/data/apiData/mergeData';

export default function Recipes({ recipeObj, render }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const convertTime = (total) => {
    if (total >= 3600) {
      const result = new Date(total * 1000).toISOString().slice(11, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };
  const handleClick = () => {
    router.push(`/create/process/${recipeObj.firebaseKey}`);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteUserRecipeEquipment(recipeObj.firebaseKey);
    deleteRecipeSteps(recipeObj.firebaseKey).then(() => {
      deleteProcess(recipeObj.processId);
      render();
    });
  };
  const getUser = () => {
    getSingleRecipeUser(recipeObj.firebaseKey).then((obj) => { setUser(obj); });
  };
  useEffect(() => {
    getUser();
  }, [recipeObj]);
  return (
    <>
      {
        recipeObj.completed === false
          ? (
            <Card
              style={{ width: 'auto' }}
              onClick={handleClick}
            >
              <Card.Body>
                <Card.Title>{recipeObj.recipeName}</Card.Title>
                <div>
                  <p>Choose to to finish recipe</p>
                </div>
                {
                  recipeObj.uid
                    ? (
                      <button aria-label="delete" className="card-delete btn-stripped card-delete-btn" onClick={handleDelete} type="button"><MdDeleteForever /></button>
                    )
                    : (
                      ''
                    )
                }
                <Card.Text />
              </Card.Body>
            </Card>
          )
          : (
            <div className="recipe-card" onClick={() => { handleClick(); }} onKeyDown={handleClick} role="button" tabIndex={0}>
              <div>
                <div className="recipe-title">{recipeObj.recipeName}</div>
                <div>
                  <div>
                    <Image className="user-photo-small" referrerPolicy="no-referrer" src={user.userObject?.photoUrl} />
                    {user.userObject?.name}
                  </div>
                  <span>
                    <IoTimeSharp />
                    {convertTime(recipeObj.brewTime)}&nbsp;&nbsp;
                  </span>
                  <span>
                    <GiCoffeeBeans />
                    {recipeObj.dose}g&nbsp;&nbsp;
                  </span>
                  <span>
                    <IoWaterSharp />
                    {recipeObj.weight}g&nbsp;&nbsp;
                  </span>
                  {
                  recipeObj.uid
                    ? (
                      <button aria-label="delete" className="card-delete btn-stripped card-delete-btn" onClick={handleDelete} type="button"><MdDeleteForever /></button>
                    )
                    : (
                      ''
                    )
                }
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}

Recipes.propTypes = {
  recipeObj: PropTypes.shape(
    {
      brewTime: PropTypes.number,
      grindId: PropTypes.string,
      weight: PropTypes.number,
      methodId: PropTypes.string,
      recipeName: PropTypes.string,
      dose: PropTypes.number,
      waterTemp: PropTypes.number,
      favorite: PropTypes.bool,
      completed: PropTypes.bool,
      firebaseKey: PropTypes.string,
      uid: PropTypes.string,
      processId: PropTypes.string,
    },
  ),
  render: PropTypes.func,
};
Recipes.defaultProps = {
  recipeObj: PropTypes.shape(
    {
      brewTime: 0,
      grindId: '',
      weight: 0,
      methodId: '',
      recipeName: '',
      dose: 0,
      waterTemp: 0,
      favorite: false,
      completed: false,
      firebaseKey: '',
      uid: '',
      processId: '',
    },
  ),
  render: () => {},
};
