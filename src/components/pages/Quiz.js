import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import useQuestions from "../../hooks/useQuestions";
import _ from 'lodash';
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";

const intialState = null;

const reducer = (state, action) => {
    switch (action.type) {

        case "questions":
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                })
            });

            return action.value;

        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value;
            return questions;
        default:
            return state;
    }
}

export default function Quiz() {

    const { id } = useParams();
    const { loading, error, questions } = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [qna, dispatch] = useReducer(reducer, intialState);
    const { currentUser } = useAuth();


    const navigate = useNavigate();
    const getVideotitle = useLocation(); // get from route state

    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions
        });
    }, [questions]);



    function handleAnswerChange(e, index) {
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked
        });

    }


    //handle when user clicks the next button to get the next question

    function nextQuestion() {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent + 1);
        }
    }

    //handle when user clicks the prev button to get the previous question

    function prevQuestion() {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent - 1);
        }
    }

    //submit quiz
    async function submit() {
        const { uid } = currentUser;
        const db = getDatabase();

        const resultRef = ref(db, `result/${uid}`); //this is the way to update the existing node
        await set(resultRef, {
            [id]: qna
        })


        navigate(`/result/${id}`, {
            state: {
                qna,
            },
        });

    }


    //calculate percentage of progress
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    return (
        <div>
            {loading && <div>Loading ... </div>}
            {error && <div>There Was an Error ... </div>}
            {!loading && !error && qna && qna?.length > 0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers input={true} options={qna[currentQuestion]?.options} handleChange={handleAnswerChange} />
                    <ProgressBar next={nextQuestion} prev={prevQuestion} submit={submit} progress={percentage} />
                    <MiniPlayer videoId={id} videoTitle={getVideotitle.state.videoTitle} />
                </>
            )}
        </div>
    );
}