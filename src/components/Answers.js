import Checkbox from "./CheckBox";
import classes from "../styles/Answers.module.css";

export default function Answers({ options = [], handleChange }) {
    // console.log(options);
    // const getCheckbox = (option, index) => {
    //     <Checkbox className={classes.answer} text={option?.title} value={index} checked={option?.checked} onchange={(e) => handleChange(e, index)} />

    return (
        <div className={classes.answers}>

            {options.map((option, index) =>
                <Checkbox className={classes.answer} key={index} text={option?.title} value={index} checked={option?.checked} onChange={(e) => handleChange(e, index)} />

            )}
        </div>
    )
}