import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import Button from "react-bootstrap/Button";
import NavBar from "./navbar";
import Search from "./search";
import styles from "../styles/Home.module.css";
import Footer from "./footer";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>... loading</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <>
        <NavBar />
        <h1>Welcome {user.name} to Art Gallery</h1>
        <a href="/api/auth/logout">
          <Button variant="success">Logout</Button>
        </a>
        <div className={styles.container}>
          <Head>
            <title>Art Gallery</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />{" "}
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Search />

          <Footer />
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Welcome to the Art Gallery please login to proceed</h1>
      <a href="/api/auth/login">
        {" "}
        <Button variant="success">Login</Button>
      </a>
    </>
  );
}
