
import React from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { Employee } from '../types';

const StatusBadge: React.FC<{ status: Employee['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold leading-5 rounded-full';
  const statusClasses = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'On Leave': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const DashboardPage: React.FC = () => {
  const { employees } = useEmployees();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Team Dashboard</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                      <img className="w-10 h-10 rounded-full" src={employee.avatarUrl} alt={`${employee.name} avatar`} />
                      <div className="pl-3">
                        <div className="text-base font-semibold">{employee.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={employee.status} />
                  </td>
                  <td className="px-6 py-4">
                    {employee.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {employees.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p>No team members found.</p>
          </div>
        )}
    </div>
  );
};

export default DashboardPage;
