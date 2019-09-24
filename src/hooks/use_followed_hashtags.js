import { useState, useEffect } from "react";
import { SUBSRIBE_HASHTAGS } from '../actions'

function useFollowedHashtags(props) {
  const [hashtags, setHashtags] = useState(props.hashtags);

  const handleUpdate = ({ follow, hashtag }) => {
    follow ? addHashtag(hashtag) : removeHashtag(hashtag.id);
  }

  const addHashtag = (hashtag) => {
    setHashtags(hashtags.concat([ hashtag ]))
  }

  const removeHashtag = (id) => {
    const newHashtags = hashtags.filter(hashtag => hashtag.id !== id.toString());
    setHashtags(newHashtags);
  }

  useEffect(() => {
    const subscription = props.client.subscribe({
      query: SUBSRIBE_HASHTAGS
    }).subscribe({
      next({ data: { hashtags } }) {
        handleUpdate(hashtags);
      },
      error(err) { console.error(err); },
    });

    return () => subscription.unsubscribe();
  })

  return hashtags;
}

export default useFollowedHashtags;
