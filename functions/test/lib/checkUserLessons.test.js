const { userCompletedCourse } = require('../../lib/checkUserLessons');
const admin = require('firebase-admin');
admin.initializeApp();

describe('Check User Lessons', () => {
  describe('userCompletedCourse', () => {
    const db = admin.firestore();
    const mockCollection = jest.fn();
    const mockDoc = jest.fn();
    const mockGet = jest.fn();
    const mockWhere = jest.fn();
    const mockData = jest.fn();

    db.collection = mockCollection;
    mockCollection.mockReturnValue({
      doc: mockDoc,
      where: mockWhere,
    });
    mockDoc.mockReturnValue({
      get: mockGet,
    });
    mockWhere.mockReturnValue({
      get: mockGet,
    });
    mockGet.mockResolvedValueOnce({
      docs: [
        {
          data: () => ({ lesson: 'Lesson_1_What_is_a_Smart_Contract.md' }),
        },
      ],
    });
    mockGet.mockResolvedValueOnce({
      data: () => ({
        sections: {
          Section_0: [
            { file: 'Lesson_1_What_is_a_Smart_Contract.md' },
            { file: 'Lesson_2_Finalize_Celebrate.md' },
          ],
        },
      }),
    });

    it('should return false beacuse user has not completed the course', async () => {
      const userId = 'hX5ELaRUTCd4ApsRQ2YJ0bJai1w2';
      const courseId = 'Test';

      const result = await userCompletedCourse(userId, courseId, db);

      expect(result).toBe(false);
    });

    mockGet.mockResolvedValueOnce({
        docs: [
          {
            data: () => ({ lesson: 'Lesson_1_What_is_a_Smart_Contract.md' }),
          },
          {
            data: () => ({ lesson: 'Lesson_2_Finalize_Celebrate.md' }),
          },
        ],
      });
      mockGet.mockResolvedValueOnce({
        data: () => ({
          sections: {
            Section_0: [
              { file: 'Lesson_1_What_is_a_Smart_Contract.md' },
              { file: 'Lesson_2_Finalize_Celebrate.md' },
            ],
          },
        }),
      });
  
      it('should return true if the user completed the course', async () => {
        const userId = 'hX5ELaRUTCd4ApsRQ2YJ0bJai1w2';
        const courseId = 'Test';
  
        const result = await userCompletedCourse(userId, courseId, db);
  
        expect(result).toBe(true);
      });
  });
});
