import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import styles from "../styles/Home.module.css";
import { createApi } from "unsplash-js";
import like from "../photo/like.png";
import like2 from "../photo/like2.png";
import Image from "next/image";
export default function Search() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [isLike, setLike] = useState("");
  const client_id = "UTIVFUxSnxtVfZq1TgOPrUOio55AlY7pCsO_vUr-9Gs";
  const serverApi = createApi({
    accessKey: client_id,
  });
  const fetchImages = async () => {
    if (query) {
      await serverApi.search
        .getPhotos({
          query: query,
          page: page,
        })
        .then((result) => {
          if (result.errors) {
            console.log("error occurred: ", result.errors[0]);
          } else {
            setData([...data, ...result.response.results]);
            console.log(result.response);
            setPage(page + 1);
          }
        });
    } else {
      await serverApi.photos.list({ page: page }).then((result) => {
        if (result.errors) {
          console.log("error occurred: ", result.errors[0]);
        } else {
          setData([...data, ...result.response.results]);
          setPage(page + 1);
        }
      });
    }
  };
  const searchImages = (event) => {
    console.log(event);
    if (event.keyCode === 13) {
      setQuery(event.target.value);
      setData([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query]);
  return (
    <main className={styles.main}>
      <div className="App flex">
        <input
          type="text"
          onKeyDown={(event) => searchImages(event)}
          placeholder="Search For Images 🔎"
        />
        <InfiniteScroll
          dataLength={data.length}
          next={fetchImages}
          hasMore={loadMore}
          loader={<p>Load more...</p>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>This is the END</b>
            </p>
          }
        >
          <div className="main flex">
            <Row xs={1} md={4} className="g-4">
              {data.map((obj, id) => (
                <div className="container" key={id}>
                  <Card style={{ width: "18rem" }} key={id}>
                    <Card.Img
                      variant="top"
                      src={obj.urls.small}
                      className="image"
                    />
                    <Card.Body>
                      <div
                        onClick={() => {
                          setLike(obj.id);
                        }}
                      >
                        {obj.id === isLike && (
                          <span>
                            <Image
                              src={like2.src}
                              alt="Like Button"
                              width={23}
                              height={23}
                            />
                          </span>
                        )}
                        {obj.id != isLike && (
                          <span>
                            <Image
                              src={like.src}
                              alt="Dislike Button"
                              width={23}
                              height={23}
                            />
                          </span>
                        )}
                      </div>
                      <Card.Title>{obj.alt_description}</Card.Title>
                      <Card.Text>
                        Photo by: {obj.user.name}
                        <br />
                        Instagram: {obj.user.instagram_username}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
}
