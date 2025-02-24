import LayoutUpdateLesson from '@/components/pages/Lesson/UpdateLesson'
import { useLocation } from 'react-router-dom'

const PageUpdateLesson = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idLesson = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateLesson idLesson={idLesson} />
    </div>
  )
}

export default PageUpdateLesson
