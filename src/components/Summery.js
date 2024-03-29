
import { useMemo } from "react";
import classes from "../styles/Summery.module.css";
import Successimage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";

export default function Summery({ score, noq }) {

    const getKeyword = useMemo(() => {
        if ((score / (noq * 5)) * 100 < 50) {
            return "failed";
        } else if ((score / (noq * 5)) * 100 < 75) {
            return "good";
        } else if ((score / (noq * 5)) * 100 < 100) {
            return "very good";
        } else {
            return "excellent";
        }
    }, [score, noq]);

    const { loading, error, result } = useFetch(`https://api.pexels.com/v1/search?query=${getKeyword}`, "GET", {
        Authorization: process.env.REACT_APP_PEXELS_API_KEY
    });

    const image = result ? result.photos[0].src.medium : Successimage;


    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>

            {loading && <div className={classes.badge}>Loading Your Badge ... </div>}
            {error && <div className={classes.badge}>An Error Occured ... </div>}

            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={image} alt="Success" />
                </div>
            )}

        </div>
    );



}