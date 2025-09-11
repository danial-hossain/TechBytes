// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useState, useEffect } from 'react';

const useAuth = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        setUserInfo(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Initial load
    handleStorageChange();
    setLoading(false);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (newUserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return { userInfo, loading, login, logout };
};

export default useAuth;
