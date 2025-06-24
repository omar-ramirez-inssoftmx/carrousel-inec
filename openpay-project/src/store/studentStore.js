import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useStudentStore = create(
  devtools(
    persist(
      (set, get) => ({
        // Estado
        students: [],
        currentStudent: null,

        // Acciones
        setStudents: (students) => {
          set({ students }, false, 'setStudents');
          // Auto-select first student if available
          if (students && students.length > 0 && !get().currentStudent) {
            set({ currentStudent: students[0] }, false, 'setCurrentStudent');
          }
        },

        setCurrentStudent: (student) => set({ currentStudent: student }, false, 'setCurrentStudent'),

        clearStudents: () => set({ students: [], currentStudent: null }, false, 'clearStudents'),

        // Getters (computed values)
        getCurrentStudent: () => get().currentStudent || get().students[0] || null,

        hasStudents: () => get().students.length > 0,

        // Utilidades
        getCurrentStudentId: () => {
          const student = get().getCurrentStudent();
          return student?.id_alumno || null;
        },

        getCurrentStudentMatricula: () => {
          const student = get().getCurrentStudent();
          return student?.matricula || null;
        },

        getCurrentStudentOpenPayId: () => {
          const student = get().getCurrentStudent();
          return student?.open_pay_id || null;
        },
      }),
      {
        name: 'student-storage', // Clave para localStorage
        partialize: (state) => ({
          students: state.students,
          currentStudent: state.currentStudent
        }), // Solo persistir estos campos
      }
    ),
    {
      name: 'student-store', // Nombre para Redux DevTools
    }
  )
);

export default useStudentStore; 