import Navbar from "react-bootstrap/Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import Button from "react-bootstrap/Button";
import Link from "next/link";
export default function NavBar() {
  const { user } = useUser();

  return (
    user && (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Art Gallery</Navbar.Brand>

        <Link href="/">
          <Button variant="success">Home</Button>
        </Link>
        <Link href="/profile">
          <Button variant="danger">Profile</Button>
        </Link>
      </Navbar>
    )
  );
}
