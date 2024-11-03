import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/forms/loginForm";
import RequireAuth from './middlewares/RequireAuth';
import Dashboard from './components/dashboard';
import EmployeeList from './components/employees/employeeList';
import EvaluationList from './components/evaluations/evaluationsList';
import EvaluationDetails from './components/evaluations/detail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="h-screen bg-slate-50 dark:bg-slate-800">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route element={<RequireAuth allowedRoles={['Admin', 'Manager']} />}>
              <Route path="/employees" element={<EmployeeList />} />
            </Route>
            <Route path="/employees/:employeeId/evaluations" element={<EvaluationList />} />
            <Route path="/evaluations/:evaluationId" element={<EvaluationDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
