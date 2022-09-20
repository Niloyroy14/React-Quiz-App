import { getDatabase,ref,query, orderByKey, get, startAt, limitToFirst } from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList(page) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            //database related works
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(8)
            );

            try {

                setError(false);
                setLoading(true);
                // request firebase database
                const result = await get(videoQuery);
                setLoading(false);
                if (result.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(result.val())]
                    })
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                setLoading(false);
                setError(true);
               
                console.log(err);
            }
        }
        fetchVideos();
    }, [page]);

    return {
        loading,
        error,
        videos,
        hasMore
    }
}