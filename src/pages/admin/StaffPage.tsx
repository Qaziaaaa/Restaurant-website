import { useState } from 'react';
import { UserPlus, Shield } from 'lucide-react';

const mockStaff = [
  { _id: '1', name: 'Alice Johnson', email: 'alice@restaurant.com', role: 'manager' },
  { _id: '2', name: 'Bob Chen', email: 'bob@restaurant.com', role: 'chef' },
  { _id: '3', name: 'Carol Smith', email: 'carol@restaurant.com', role: 'chef' },
];

export default function StaffPage() {
  const [staff] = useState(mockStaff);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink">Staff Management</h1>
          <p className="text-ink/50 mt-1">Manage restaurant staff and roles.</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary hover:brightness-110 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
          <UserPlus className="h-4 w-4" />
          <span>Invite Staff</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-premium ring-1 ring-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staff.map((person) => (
                <tr key={person._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-ink">{person.name}</td>
                  <td className="px-6 py-4 text-sm text-ink/50">{person.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary capitalize">{person.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-ink/30 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                      <Shield className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
