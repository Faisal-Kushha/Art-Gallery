import Navbar from "react-bootstrap/Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import Button from "react-bootstrap/Button";

export default function NavBar() {
  const { user } = useUser();

  return (
    user && (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Art Gallery</Navbar.Brand>

        <a href="/">
          <Button variant="success">Home</Button>
        </a>
        <a href="/profile">
          <Button variant="success">Profile</Button>
        </a>
      </Navbar>
    )
  );
}
