import { useContext } from 'react';
import { DashboardContext } from '../../context/dashboard';
import DashboardTodoEntry from '../DashboardTodoEntry';
import './index.css';

const DashboardTodo = () => {
  const { todos } = useContext(DashboardContext);

  return (
    <div className='dashboard-todo__wrapper'>
      <div className='dashboard-todo__heading'>To Do</div>
      <table className='dashboard-todo__table'>
        <thead>
          <tr className='dashboard-todo__table-head'>
            <th className='dashboard-todo__col-1 dth__cols'>Gift</th>
            <th className='dashboard-todo__col-2 dth__cols'>Friend</th>
            <th className='dashboard-todo__col-3 dth__cols'>prepared</th>
            <th className='dashboard-todo__col-4 dth__cols'>sent</th>
            <th className='dashboard-todo__col-5 dth__cols'>delivered</th>
          </tr>
        </thead>
        <tbody>
          <tr className='dashboard-todo__table-head_placeholder' />
          {
          todos.map(todo => (
            <DashboardTodoEntry key={todo.id} todo={todo} />
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTodo;
