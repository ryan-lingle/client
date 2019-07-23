import client from "../index";
import gql from "graphql-tag";

const CREATE_REK_VIEW = gql`
  mutation CreateRekView($rekId: Int!) {
    createRekView(rekId: $rekId) {
      rek {
        id
      }
    }
  }
`
const viewed = {};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
}

function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 1) {
      const rekId = parseInt(entry.target.id.split("-")[1]);
      if (!viewed[rekId]) {
        viewed[rekId] = true;
        client.mutate({
          mutation: CREATE_REK_VIEW,
          variables: {
            rekId
          }
        })
      }
    }
  });
};


const observer = new IntersectionObserver(callback, options);
export { observer };
