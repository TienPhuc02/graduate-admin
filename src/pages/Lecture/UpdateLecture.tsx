import LayoutUpdateLecture from '@/components/pages/Lecture/UpdateLecture'
import { useLocation } from 'react-router-dom'

const PageUpdateLecture = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idLecture = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateLecture idLecture={idLecture} />
    </div>
  )
}

export default PageUpdateLecture
