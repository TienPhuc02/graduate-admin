import LayoutUpdateComment from '@/components/pages/Comment/UpdateComment'
import { useLocation } from 'react-router-dom'

const PageUpdateComment = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idComment = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateComment idComment={idComment} />
    </div>
  )
}

export default PageUpdateComment
