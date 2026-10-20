import { useEffect, useState } from 'react';
import './App.css';

type Employee = {
  id: number;
  name: string;
  email: string;
};

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState<'home' | 'form'>('home');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    designation: '',
    location: '',
    salary: '',
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load employees');
        return response.json();
      })
      .then((data: Employee[]) => setEmployees(data))
      .catch(() => setMessage('Could not load employee data. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Form validated successfully. No data was submitted.');
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2>PeopleDesk</h2>
        <div className="nav-links">
          <button onClick={() => { setPage('home'); setMessage(''); }}>
            Home
          </button>
          <button onClick={() => { setPage('form'); setMessage(''); }}>
            Employee Form
          </button>
        </div>
      </nav>

      <main className="container">
        {page === 'home' ? (
          <>
            <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
            <h1>Employee Dashboard</h1>
            <p className="subtitle">Employee directory and contact information</p>

            <section className="card">
              <h2>Employee Directory</h2>
              {loading ? (
                <p>Loading employees...</p>
              ) : message && employees.length === 0 ? (
                <p>{message}</p>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        ) : (
          <>
            <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
            <h1>Employee Form</h1>
            <p className="subtitle">Enter employee details below</p>

            <section className="card">
              <h2>Employee Information</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </label>

                <label>
                  Designation
                  <input
                    required
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="Enter designation"
                  />
                </label>

                <label>
                  Location
                  <input
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </label>

                <label>
                  Salary
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    placeholder="Enter salary"
                  />
                </label>

                <button className="submit-button" type="submit">
                  Validate Details
                </button>
                {message && <p className="message">{message}</p>}
              </form>
            </section>
          </>
        )}
      </main>

      <footer>PeopleDesk · React Employee Dashboard</footer>
    </div>
  );
}