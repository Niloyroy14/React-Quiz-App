import Analysis from "../Analysis";
import Summery from "../Summery";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import _ from "lodash";


export default function Result() {

    const { id } = useParams();
    const { state } = useLocation();
    const { qna } = state;

    const { loading, error, answers } = useAnswers(id);

    //console.log(answers);

    function calculate() {
        let score = 0;
        answers.forEach((question, index1) => {
            let correctIndexes = [];
            let checkedIndexes = [];
            question.options.forEach((option, index2) => {
                if (option.correct == true) {
                    correctIndexes.push(index2);
                }

                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });

            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + 5;
            }
        });

        return score;
    }


    const userScore = calculate();


    return (
        <div>
            {loading && <div>Loading ... </div>}
            {error && <div>There Was an Error ... </div>}

            {answers && answers.length > 0 && (
                <>
                    <Summery score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}

        </div>
    );
}