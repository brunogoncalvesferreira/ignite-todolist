import styles from "./Empty.module.css"
import empty from "../assets/empty.svg"

export function Empty() {
  return (
    <div className={styles.empty}>
      <div className={styles.content}>
        <img src={empty} alt="Ícone de uma prancheta" />
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          Crie tarefas e organize seus itens a fazer
        </p>
      </div>
    </div>
  )
}
