
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Employee } from '../types';

const initialEmployees: Employee[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Frontend Developer', status: 'Active', avatarUrl: 'https://picsum.photos/id/1027/200/200' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', role: 'Backend Developer', status: 'Active', avatarUrl: 'https://picsum.photos/id/1005/200/200' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'UI/UX Designer', status: 'On Leave', avatarUrl: 'https://picsum.photos/id/1012/200/200' },
  { id: '4', name: 'Diana Miller', email: 'diana@example.com', role: 'Project Manager', status: 'Active', avatarUrl: 'https://picsum.photos/id/1011/200/200' },
  { id: '5', name: 'Ethan Davis', email: 'ethan@example.com', role: 'QA Engineer', status: 'Inactive', avatarUrl: 'https://picsum.photos/id/1025/200/200' },
];

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id' | 'avatarUrl'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = (employee: Omit<Employee, 'id' | 'avatarUrl'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: new Date().getTime().toString(),
      avatarUrl: `https://picsum.photos/seed/${new Date().getTime()}/200/200`,
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
