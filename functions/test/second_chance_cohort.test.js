const { getNextCohort, updateCohortIds, changeUserCohort } = require('../second_chance_cohort')
const admin = require('firebase-admin')

jest.mock('firebase-admin');

test('getNextCohort returns the correct data', async () => {
  const db = {
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      docs: [{
        data: () => ({ name: 'Cohort 1', endDate: new Date('2023-05-15') }),
        id: 'cohort1'
      }]
    })
  }
  
  const course_id = 'course1'
  const result = await getNextCohort(course_id, db)

  expect(db.collection).toHaveBeenCalledWith('cohorts')
  expect(db.where).toHaveBeenCalledWith('course_id', '==', course_id)
  expect(db.where).toHaveBeenCalledWith('endDate', '>', expect.any(Date))
  expect(db.orderBy).toHaveBeenCalledWith('endDate')
  expect(db.get).toHaveBeenCalled()
  expect(result).toEqual({ name: 'Cohort 1', endDate: new Date('2023-05-15'), id: 'cohort1' })
})

describe('updateCohortIds', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })
  
    it('should update userRef with cohort_ids', async () => {
      const userRef = {
        get: jest.fn(() => Promise.resolve({
          data: () => ({ cohorts: [{ cohort_id: 'cohort1' }, { cohort_id: 'cohort2' }] })
        })),
        set: jest.fn()
      }
  
      await updateCohortIds(userRef)
  
      expect(userRef.get).toHaveBeenCalled()
      expect(userRef.set).toHaveBeenCalledWith({ cohort_ids: ['cohort1', 'cohort2'] }, { merge: true })
    })
})
