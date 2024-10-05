import { db } from '../firebase/initFirebase'
import { doc, getDoc } from 'firebase/firestore'

describe('Firestore Connection', () => {
  it('should read a document from Firestore', async () => {
    const course_id = 'Rust_State_Machine'
    const docRef = doc(db, 'courses', course_id)
    const courseDoc = await getDoc(docRef)
    expect(courseDoc.exists()).toBe(true)
    const course = { id: course_id, ...courseDoc.data() }
    expect(course).toHaveProperty('id')
    expect(course).toHaveProperty('image_url')
    expect(course).toHaveProperty('active')
    expect(course).toHaveProperty('index')
    expect(course).toHaveProperty('home')
    expect(course).toHaveProperty('tags')
    expect(course.tags).toBeInstanceOf(Array)
  })
})
