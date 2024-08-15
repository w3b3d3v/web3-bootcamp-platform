import { fetchDB } from '../tests/lib/fetchDB'

const db = {
  sectionsCompleted: null,
  userLessonsCompletedBySection: null,
  user_id: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
}

describe('Tabs util functions', () => {
  beforeEach(async () => {
    const { sectionsCompleted, userLessonsCompletedBySection } = await fetchDB()
    db.sectionsCompleted = sectionsCompleted
    db.userLessonsCompletedBySection = userLessonsCompletedBySection
  })

  it('should ', () => {
    expect(db.sectionsCompleted).toHaveLength(15)
  })
  it('should ', () => {
    const expectedResult = {
      Section_0: 1,
      Section_1: 5,
      Section_2: 5,
      Section_3: 2,
      Section_4: 2,
    }
    expect(db.userLessonsCompletedBySection).toStrictEqual(expectedResult)
  })
})
