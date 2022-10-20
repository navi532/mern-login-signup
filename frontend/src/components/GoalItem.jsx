import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.timestamp).toLocaleString('en-US')}</div>
      <h2>{goal.deviceid}</h2>
      <h2>{goal.devicetype}</h2>
      <h2>{goal.location}</h2>
      
      <button onClick={() => dispatch(deleteGoal(goal.deviceid))} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem
