const { userCompletedCourse, usersIdsCompletedBootcamp, usersToSend2ndChance } = require('../../lib/checkUserLessons');
const admin = require('firebase-admin');
admin.initializeApp();

describe('Check User Lessons', () => {
  describe('userCompletedCourse', () => {
    const db = admin.firestore();
    let mockCollection, mockDoc, mockGet, mockWhere, mockData;

    beforeEach(() => {
      // Reset mock functions before each test
      mockCollection = jest.fn();
      mockDoc = jest.fn();
      mockGet = jest.fn();
      mockWhere = jest.fn();
      mockData = jest.fn();

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
    });

    it('should return false because the user has not completed the course', async () => {
      const userId = 'hX5ELaRUTCd4ApsRQ2YJ0bJai1w2';
      const courseId = 'Test';

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

      const result = await userCompletedCourse(userId, courseId, db);

      expect(result).toBe(false);
    });

    it('should return true if the user completed the course', async () => {
      const userId = 'hX5ELaRUTCd4ApsRQ2YJ0bJai1w2';
      const courseId = 'Test';

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

      const result = await userCompletedCourse(userId, courseId, db);

      expect(result).toBe(true);
    });
  });

  describe('usersIdsCompletedBootcamp', () => {
    const db = admin.firestore();
    let mockCollection, mockWhere, mockGet, mockData;

    beforeEach(() => {
      // Reset mock functions before each test
      mockCollection = jest.fn();
      mockWhere = jest.fn();
      mockGet = jest.fn();
      mockData = jest.fn();

      db.collection = mockCollection.mockReturnValue({
        where: mockWhere,
      });
      mockWhere.mockReturnValue({
        get: mockGet,
      });
    });

    it('should return an array of user IDs who completed the bootcamp', async () => {
      const mockUserId1 = 'user123';
      const mockUserId2 = 'user456';
      mockGet.mockResolvedValueOnce({
        docs: [
          {
            data: () => ({ user_id: mockUserId1 }),
          },
          {
            data: () => ({ user_id: mockUserId2 }),
          },
        ],
      });

      const result = await usersIdsCompletedBootcamp(db);

      expect(result).toEqual([mockUserId1, mockUserId2]);
    });
  });

  describe('usersToSend2ndChance', () => {
    const db = admin.firestore();
    let mockCollection, mockWhere, mockGet;
  
    beforeEach(() => {
        mockCollection = jest.fn()
        mockWhere = jest.fn()
        mockGet = jest.fn()

        db.collection = mockCollection.mockReturnValue({
            where: mockWhere,
        });
        mockWhere.mockReturnValue({
            get: mockGet,
        })
    });

    it('should include user in the second chance list if not completed bootcamp', async () => {  
      
      const mockFirestoreResponse = { 
        docs: [
          {
            data: () => ({ uid: 'user1', user_id: 'user1'}, { uid: 'user23', user_id: 'user2' }),
          }
        ]
      };
      mockGet.mockResolvedValue(mockFirestoreResponse);
  
      const mockCohortId = 'cohort789';
      const result = await usersToSend2ndChance(db, mockCohortId);

      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockWhere).toHaveBeenCalledWith('cohort_ids', 'array-contains', mockCohortId);
      expect(mockGet).toHaveBeenCalled();
      expect(result).toContainEqual({ uid: 'user23', 'user_id': 'user2' });
    });
  });
});
