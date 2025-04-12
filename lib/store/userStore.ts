import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '@/types/user'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        console.log('Guardando usuario en store:', user);
        if (user) {
          localStorage.setItem('user-storage', JSON.stringify({ state: { user } }));
        }
        set({ user });
      },
      clearUser: () => {
        localStorage.removeItem('user-storage');
        set({ user: null });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
) 