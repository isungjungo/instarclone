import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import {logUserOut} from "../apollo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";


export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment

      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const logUserOutClick = () => {
  logUserOut();
};

function Home() {
  const { data } = useQuery(FEED_QUERY);
  console.log(data)
  return (
    <div>
   <button onClick={logUserOutClick}>Log out</button>
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo}/>
      ))}
    </div>
   

   
</div>
  );
}
export default Home;