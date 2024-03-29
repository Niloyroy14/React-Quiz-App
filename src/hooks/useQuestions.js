import { getDatabase, ref, query, orderByKey, get } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuestions() {
            //database related works
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoID + "/questions");
            const quizQuery = query(
                quizRef,
                orderByKey(),
            );

            try {

                setError(false);
                setLoading(true);
                //request firebase database
                const result = await get(quizQuery);
                setLoading(false);
                if (result.exists()) {
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(result.val())]
                    })
                }
            } catch (err) {
                setLoading(false);
                setError(true);
                console.log(err);
            }
        }
        fetchQuestions();
    }, [videoID]);

    return {
        loading,
        error,
        questions
    }
}