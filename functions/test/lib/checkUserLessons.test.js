jest.mock('../../lib/initDb', () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn(),
    doc: jest.fn().mockReturnThis(),
  },
}))

const {
  userCompletedCourse,
  usersIdsCompletedBootcamp,
  usersToSend2ndChance,
} = require('../../lib/checkUserLessons')

const { db } = require('../../lib/initDb')

describe('Check User Lessons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('userCompletedCourse', () => {
    it('should return false because the user has not completed the course', async () => {
      const userId = 'testUser'
      const courseId = 'testCourse'

      // Mock para lessons_submissions
      db.get.mockResolvedValueOnce({
        docs: [{ data: () => ({ lesson: 'Lesson_1_What_is_a_Smart_Contract.md' }) }],
      })

      // Mock para o documento do curso
      db.get.mockResolvedValueOnce({
        data: () => ({
          metadata: {
            en: {
              sections: {
                Section_0: [
                  { file: 'Lesson_1_What_is_a_Smart_Contract.md' },
                  { file: 'Lesson_2_Finalize_Celebrate.md' },
                ],
              },
            },
          },
        }),
      })

      const result = await userCompletedCourse(userId, courseId)
      expect(result).toBe(false)
    })

    it('should return true if the user completed the course', async () => {
      const userId = 'testUser'
      const courseId = 'testCourse'

      // Mock para lessons_submissions
      db.get.mockResolvedValueOnce({
        docs: [
          { data: () => ({ lesson: 'Lesson_1_What_is_a_Smart_Contract.md' }) },
          { data: () => ({ lesson: 'Lesson_2_Finalize_Celebrate.md' }) },
        ],
      })

      // Mock para o documento do curso
      db.get.mockResolvedValueOnce({
        data: () => ({
          metadata: {
            en: {
              sections: {
                Section_0: [
                  { file: 'Lesson_1_What_is_a_Smart_Contract.md' },
                  { file: 'Lesson_2_Finalize_Celebrate.md' },
                ],
              },
            },
          },
        }),
      })

      const result = await userCompletedCourse(userId, courseId)
      expect(result).toBe(true)
    })
  })

  describe('usersIdsCompletedBootcamp', () => {
    it('should return an array of user IDs who completed the bootcamp', async () => {
      db.get.mockResolvedValueOnce({ docs: [{ data: () => ({ user_id: 'user1' }) }] })

      const result = await usersIdsCompletedBootcamp()
      expect(result).toEqual(['user1'])
    })
  })

  describe('usersToSend2ndChance', () => {
    it('should include user in the second chance list if not completed bootcamp', async () => {
      db.get.mockResolvedValueOnce({ docs: [] }) // Nenhum usuário completou o bootcamp
      db.get.mockResolvedValueOnce({ docs: [{ data: () => ({ uid: 'user1' }) }] })

      const result = await usersToSend2ndChance('cohortId')
      expect(result).toEqual([{ uid: 'user1' }])
    })
  })
})
