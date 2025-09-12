import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const ProfileInformation = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: [''],
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/user/profile', {
          withCredentials: true,
        });
        setForm({
          name: data.name || '',
          email: data.email || '',
          mobile: data.mobile || '',
          address: data.address?.length ? data.address : [''],
          password: '',
          confirmPassword: '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        setLoading(false);
        if (err.response?.status === 401) navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e, index) => {
    if (e.target.name === 'address') {
      const updated = [...form.address];
      updated[index] = e.target.value;
      setForm({ ...form, address: updated });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addAddressField = () => setForm({ ...form, address: [...form.address, ''] });
  const removeAddressField = (i) => setForm({ ...form, address: form.address.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password && form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const updateData = { ...form };
      if (!updateData.password) delete updateData.password;
      delete updateData.confirmPassword;

      await axios.put('http://localhost:8000/api/user/profile/update', updateData, {
        withCredentials: true,
      });

      setSuccess('Profile updated successfully');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2 className="profile-title">Edit Profile</h2>
        {error && <p className="profile-error">{error}</p>}
        {success && <p className="profile-success">{success}</p>}

        <form onSubmit={handleSubmit} className="profile-form">
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Mobile:</label>
          <input type="text" name="mobile" value={form.mobile} onChange={handleChange} required />

          <label>Addresses:</label>
          {form.address.map((addr, i) => (
            <div key={i} className="address-field">
              <input type="text" name="address" value={addr} onChange={(e) => handleChange(e, i)} />
              {form.address.length > 1 && <button type="button" onClick={() => removeAddressField(i)}>Remove</button>}
            </div>
          ))}
          <button type="button" onClick={addAddressField}>Add Address</button>

          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Leave blank to keep current password" />

          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm new password" />

          <div className="profile-buttons">
            <button type="submit" className="profile-save-btn">Save</button>
            <button type="button" onClick={() => navigate('/profile')} className="profile-cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileInformation;
