import React, { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Recipes from '../../components/Recipes';
import getMethodRecipesDefault from '../../utils/data/apiData/mergeData';

export default function MethodRecipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [method, setMethod] = useState({});
  const getRoutedRecipes = useCallback(() => {
    getMethodRecipesDefault(router.query.fbKey).then((methodObj) => {
      setRecipes(methodObj.defaultRecipes);
      setMethod(methodObj);
      console.warn(methodObj);
    });
  }, [router.query.fbKey]);
  useEffect(() => {
    getRoutedRecipes();
  }, [getRoutedRecipes]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={router.back}>
          <IoIosArrowBack />
          Methods
        </Nav.Link>
        <Container>
          <Navbar.Brand href="/">
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            {method.name} Recipes
          </Navbar.Brand>
        </Container>
        <Nav.Link href="/">
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      <div>
        {recipes.map((recipe) => (
          <Recipes key={recipe.fbKey} recipeObj={recipe} methodObj={method} />
        ))}
      </div>
    </>
  );
}