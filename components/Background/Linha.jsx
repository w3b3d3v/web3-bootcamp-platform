import styles from "./Linha.module.css"
import Subdivisao from "./Subdivisao"

export default function Linha({ numColunas }) {
    return (
        <div className={styles.linha}>
            {Array.from({ length: numColunas }).map((_, index) => (
                <Subdivisao key={index} />
            ))}
        </div>
    )
}
