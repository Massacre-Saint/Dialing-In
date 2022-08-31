import { useRouter } from 'next/router';
import React from 'react';
import Card from 'react-bootstrap/Card';

export default function CreateName() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/recipes/createrecipe');
  };
  return (
    <Card style={{ width: 'auto' }} onClick={handleClick}>
      {/* <Image src={methodObj.imageUrl} alt={methodObj.name} width={50} height={50} /> */}
      <Card.Body>
        <Card.Title>Create Recipe Name</Card.Title>
        <Card.Text />
        <div>
          {/* <span>{recipeObj.brewTime}</span>
          <span>{recipeObj.dose}</span>
          <span>{recipeObj.amount}</span> */}
        </div>
      </Card.Body>
    </Card>
  );
}
