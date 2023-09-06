import { getDatabase, ref, query, orderByKey, get } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        async function fetchAnswers() {
            //database related works
            const db = getDatabase();
            const answerRef = ref(db, "answers/" + videoID + "/questions");
            const answerQuery = query(
                answerRef,
                orderByKey(),
            );

            try {

                setError(false);
                setLoading(true);
                //request firebase database
                const result = await get(answerQuery);
                setLoading(false);
                if (result.exists()) {
                    setAnswers((prevAnswers) => {
                        return [...prevAnswers, ...Object.values(result.val())]
                    })
                }
            } catch (err) {
                setLoading(false);
                setError(true);
                console.log(err);
            }
        }
        fetchAnswers();
    }, [videoID]);

    return {
        loading,
        error,
        answers
    }
}