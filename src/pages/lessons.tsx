import { ReactElement } from "react"
import { Layout } from "../common/components/Layout"
import { Lesson } from "../modules/Lessons"

const Lessons = () => {
  return <Lesson />
}

Lessons.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
  }
  
export default Lessons
