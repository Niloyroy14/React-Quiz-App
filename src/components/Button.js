import classes from "../styles/Button.module.css";
export default function Button({className, children}) {
    return (
        <div class={` ${classes.button} ${className}`}>
            {children}
        </div>
    );
}