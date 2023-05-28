import styles from "./App.module.css"
import { Empty } from "./components/Empty"
import { Header } from "./components/Header"

import { AiOutlinePlusCircle } from "react-icons/ai"
import { Task } from "./components/Task"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export interface TaskProps {
  id: string
  title: string
  isCompleted: boolean
}

export function App() {
  const [text, setText] = useState("")
  const [tasks, setTasks] = useState<TaskProps[]>([])

  function loadingGetTask() {
    const saved = localStorage.getItem("tasks")
    saved ? setTasks(JSON.parse(saved)) : ""
  }

  useEffect(() => {
    loadingGetTask()
  }, [])

  function localStorageSetTask(newTask: TaskProps[]) {
    setTasks(newTask)
    localStorage.setItem("tasks", JSON.stringify(newTask))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
  }

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value)
  }

  function handleNewTask() {
    const newTask = {
      id: crypto.randomUUID(),
      title: text,
      isCompleted: false,
    }
    localStorageSetTask([...tasks, newTask])
    setText("")
  }

  function handleDeleteTasks(taskID: string) {
    const actionDeleteTask = tasks.filter((task) => {
      return task.id !== taskID
    })
    localStorageSetTask(actionDeleteTask)
  }

  function handleIsCompleted(isCompletedID: string) {
    const actionIsCompleted = tasks.map((task) => {
      if (task.id === isCompletedID) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task
    })
    localStorageSetTask(actionIsCompleted)
  }

  const taskQuality = tasks.length
  const taskCompleted = tasks.filter((task) => task.isCompleted).length

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.wrapper}>
        <form onSubmit={handleSubmit} action="">
          <input
            onChange={handleChangeText}
            value={text}
            type="text"
            placeholder="Adicione uma tarefa"
          />
          <button onClick={handleNewTask} type="submit">
            Criar <AiOutlinePlusCircle size={20} />
          </button>
        </form>

        <div className={styles.countTask}>
          <strong>
            Tarefas criadas <span>{taskQuality}</span>
          </strong>

          <strong>
            Concluídas <span>{taskCompleted}</span>
          </strong>
        </div>

        {tasks.length === 0 && <Empty />}

        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onHandleDeleteTasks={handleDeleteTasks}
            onHandleIsCompleted={handleIsCompleted}
          />
        ))}
      </main>
    </div>
  )
}
