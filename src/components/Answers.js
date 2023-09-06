import Checkbox from "./CheckBox";
import classes from "../styles/Answers.module.css";
import { Fragment } from "react";

export default function Answers({ options = [], handleChange, input }) {
    return (
        <div className={classes.answers}>

            {options.map((option, index) =>
                <Fragment key={index}>
                    {input ? (
                        <Checkbox className={classes.answer} key={index} text={option?.title} value={index} checked={option?.checked} onChange={(e) => handleChange(e, index)} />
                    ) : (
                        <Checkbox className={`${classes.answer} 
                            ${option.correct == true
                                ? classes.correct
                                : option.checked
                                    ? classes.wrong : null
                            }`}
                            key={index} text={option?.title} value={index} defaultChecked={option?.checked} disabled />
                    )}
                </Fragment>
            )}
        </div>
    )
}