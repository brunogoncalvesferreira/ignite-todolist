import styles from "./Task.module.css"
import { BsCheckCircleFill } from "react-icons/bs"
import { FaTrashAlt } from "react-icons/fa"
import { ImRadioUnchecked } from "react-icons/im"
import { TaskProps } from "../App"

interface Props {
  task: TaskProps
  onHandleDeleteTasks: (taskID: string) => void
  onHandleIsCompleted: (isCompletedID: string) => void
}

export function Task({
  task,
  onHandleDeleteTasks,
  onHandleIsCompleted,
}: Props) {
  function handleDelete() {
    onHandleDeleteTasks(task.id)
  }

  function handleIsCompleted() {
    onHandleIsCompleted(task.id)
  }

  return (
    <div className={styles.container}>
      <button onClick={handleIsCompleted} className={styles.check}>
        {task.isCompleted ? (
          <BsCheckCircleFill size={20} color="#5f61ce" />
        ) : (
          <ImRadioUnchecked size={20} color="#4ea8de" />
        )}
      </button>

      <p className={task.isCompleted ? styles.isCompleted : ""}>{task.title}</p>

      <button onClick={handleDelete} className={styles.trash}>
        <FaTrashAlt size={20} />
      </button>
    </div>
  )
}
