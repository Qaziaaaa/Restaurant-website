import { motion } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { User, Mail, Shield, LogOut, Package, ChevronRight, UtensilsCrossed, MapPin, Key, Save, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { orderService } from '../services/order.service';
import { userService, type Address } from '../services/user.service';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';
import { useState, useEffect } from 'react';

export function Profile() {
  const { user, setAuth, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPhone, setEditPhone] = useState('');
  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<Address>({ street: '', city: '', state: '', zipCode: '', country: 'US' });
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [profileMsg, setProfileMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  const { data: orders } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderService.getMyOrders,
    enabled: isAuthenticated,
  });

  const { data: addresses, refetch: refetchAddresses } = useQuery({
    queryKey: ['my-addresses'],
    queryFn: userService.getAddresses,
    enabled: isAuthenticated,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: { name?: string; email?: string; phone?: string }) => userService.updateProfile(data),
    onSuccess: (updatedUser) => {
      setAuth(updatedUser, useAuthStore.getState().accessToken || '');
      setProfileMsg('Profile updated successfully');
      setIsEditing(false);
    },
    onError: (err: any) => setProfileMsg(err.message || 'Update failed'),
  });

  const changePasswordMutation = useMutation({
    mutationFn: () => userService.changePassword(pwCurrent, pwNew),
    onSuccess: () => {
      setPwMsg('Password changed successfully');
      setPwCurrent('');
      setPwNew('');
      setShowPasswordForm(false);
    },
    onError: (err: any) => setPwMsg(err.message || 'Password change failed'),
  });

  const createAddressMutation = useMutation({
    mutationFn: (addr: Address) => userService.createAddress(addr),
    onSuccess: () => {
      refetchAddresses();
      setShowAddressForm(false);
      setAddressForm({ street: '', city: '', state: '', zipCode: '', country: 'US' });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) => userService.updateAddress(id, data),
    onSuccess: () => {
      refetchAddresses();
      setEditingAddressId(null);
      setAddressForm({ street: '', city: '', state: '', zipCode: '', country: 'US' });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (id: string) => userService.deleteAddress(id),
    onSuccess: () => refetchAddresses(),
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startEditAddress = (addr: Address) => {
    setAddressForm({ street: addr.street, city: addr.city, state: addr.state, zipCode: addr.zipCode, country: addr.country, isDefault: addr.isDefault });
    setEditingAddressId(addr._id || null);
    setShowAddressForm(true);
  };

  if (!user) {
    return null;
  }

  const totalOrders = orders?.length || 0;
  const totalSpent = orders?.reduce((sum: number, o: any) => sum + (o.pricingBreakdown?.total || 0), 0) || 0;

  const handleSaveProfile = () => {
    updateProfileMutation.mutate({ name: editName, email: editEmail, phone: editPhone || undefined });
  };

  const handleSaveAddress = () => {
    if (editingAddressId) {
      updateAddressMutation.mutate({ id: editingAddressId, data: addressForm });
    } else {
      createAddressMutation.mutate(addressForm);
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-premium overflow-hidden ring-1 ring-gray-100"
          >
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 relative">
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
                  <div className="w-full h-full bg-primary text-white rounded-xl flex items-center justify-center font-bold text-3xl">
                    {user.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              {isEditing ? (
                <div className="space-y-3 w-full max-w-md">
                  <input value={editName} onChange={e => setEditName(e.target.value)} placeholder="Name" className="w-full px-4 py-2 bg-gray-50 rounded-xl font-bold text-ink outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                  <input value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-2 bg-gray-50 rounded-xl text-ink outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                  <input value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="Phone" className="w-full px-4 py-2 bg-gray-50 rounded-xl text-ink outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                  {profileMsg && <p className="text-sm text-green-600">{profileMsg}</p>}
                  <div className="flex gap-2">
                    <button onClick={handleSaveProfile} disabled={updateProfileMutation.isPending} className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all">
                      {updateProfileMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                    <button onClick={() => { setIsEditing(false); setProfileMsg(''); }} className="bg-gray-50 text-ink px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-100 transition-all ring-1 ring-gray-200">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-serif font-bold text-ink">{user.name}</h1>
                  <div className="flex items-center gap-2 text-ink/60 mt-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3 flex-wrap">
                {!isEditing && (
                  <button onClick={() => { setEditName(user.name); setEditEmail(user.email); setIsEditing(true); }} className="bg-gray-50 text-ink px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-100 transition-all ring-1 ring-gray-200">
                    <User className="w-4 h-4" /> Edit Profile
                  </button>
                )}
                {user.role === 'admin' && (
                  <button onClick={() => window.open('http://localhost:3001', '_blank')} className="bg-ink text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all">
                    <Shield className="w-4 h-4" /> Admin Dashboard
                  </button>
                )}
                <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-100 transition-all border border-red-100">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-ink/40 mb-6">Account Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink/60">Total Orders</span>
                    <span className="text-sm font-bold text-ink">{totalOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink/60">Total Spent</span>
                    <span className="text-sm font-bold text-primary">${totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink/60">Role</span>
                    <span className="text-xs font-black uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary rounded-full">{user.role}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 col-span-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-ink/40 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/orders" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="font-bold text-ink">Order History</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-primary transition-all" />
                  </Link>
                  <Link to="/menu" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <UtensilsCrossed className="w-5 h-5 text-primary" />
                      <span className="font-bold text-ink">Browse Menu</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-primary transition-all" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Password Change */}
          <motion.div className="bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100">
            <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-ink">Change Password</h2>
            </button>
            {showPasswordForm && (
              <div className="space-y-4 max-w-md">
                <input type="password" value={pwCurrent} onChange={e => setPwCurrent(e.target.value)} placeholder="Current password" className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                <input type="password" value={pwNew} onChange={e => setPwNew(e.target.value)} placeholder="New password" className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                {pwMsg && <p className={`text-sm ${pwMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{pwMsg}</p>}
                <button onClick={() => changePasswordMutation.mutate()} disabled={changePasswordMutation.isPending || !pwCurrent || !pwNew} className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2">
                  {changePasswordMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Update Password
                </button>
              </div>
            )}
          </motion.div>

          {/* Address Book */}
          <motion.div className="bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-serif font-bold text-ink">Address Book</h2>
              </div>
              <button onClick={() => { setShowAddressForm(!showAddressForm); setEditingAddressId(null); setAddressForm({ street: '', city: '', state: '', zipCode: '', country: 'US' }); }} className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/20 transition-all">
                <Plus className="w-4 h-4" /> Add Address
              </button>
            </div>

            {showAddressForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl space-y-3 max-w-lg">
                <input value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} placeholder="Street" className="w-full px-4 py-3 bg-white rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} placeholder="City" className="w-full px-4 py-3 bg-white rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                  <input value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} placeholder="State" className="w-full px-4 py-3 bg-white rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input value={addressForm.zipCode} onChange={e => setAddressForm({ ...addressForm, zipCode: e.target.value })} placeholder="Zip Code" className="w-full px-4 py-3 bg-white rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                  <input value={addressForm.country} onChange={e => setAddressForm({ ...addressForm, country: e.target.value })} placeholder="Country" className="w-full px-4 py-3 bg-white rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSaveAddress} disabled={createAddressMutation.isPending || updateAddressMutation.isPending} className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2">
                    {editingAddressId ? 'Update' : 'Save'} Address
                  </button>
                  <button onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }} className="bg-gray-200 text-ink px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-300 transition-all">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {addresses?.map((addr: Address) => (
                <div key={addr._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-ink">{addr.street}</p>
                    <p className="text-sm text-ink/60">{addr.city}, {addr.state} {addr.zipCode}</p>
                    {addr.isDefault && <span className="text-xs font-bold text-primary uppercase tracking-widest">Default</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditAddress(addr)} className="text-ink/40 hover:text-primary transition-all p-2"><User className="w-4 h-4" /></button>
                    <button onClick={() => deleteAddressMutation.mutate(addr._id!)} className="text-ink/40 hover:text-red-500 transition-all p-2"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {(!addresses || addresses.length === 0) && !showAddressForm && (
                <p className="text-ink/40 text-sm">No addresses saved yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
