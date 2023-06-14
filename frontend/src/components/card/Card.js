import styles from "./Card.module.scss"

const Card = ({children, cardClass}) => {
    return (/* cardclass va fi aplicat pe componentele ce folosesc acest card */
    <div className={`${styles.card} ${cardClass}`}> 
        {children}
    </div>
    )
};

export default Card;