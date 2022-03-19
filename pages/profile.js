import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import NavBar from "./navbar";
import Footer from "./footer";
export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <>
        <NavBar />
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={user.picture} alt={user.name} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>{user.email}</Card.Text>
          </Card.Body>
        </Card>
        <Footer />
      </>
    )
  );
}
