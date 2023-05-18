const { getQueryResults } = require('../lib/bigQuery')
const { usersBySection, storeUsersPerCohort } = require('../build_analytics')

// Mocking the getQueryResults function
jest.mock('../lib/bigQuery', () => ({
  getQueryResults: jest.fn(),
}))


describe('usersBySection', () => {
  it('should retrieve query results and return the expected data', async () => {
    // Mock the query results
    const queryResults = [
      {
        course_id: 'course_1',
        sections: [
          {
            section: 'section_1',
            students: 10,
            photoUrls: ['url1', 'url2'],
          },
        ],
      },
    ]
    getQueryResults.mockResolvedValue(queryResults)

    // Call the function
    const result = await usersBySection()

    // Verify the function behavior
    expect(getQueryResults).toHaveBeenCalledWith(expect.any(String))
    expect(result).toEqual(queryResults)
  })
})

// Mock the Firestore collection and document reference
const collectionMock = jest.fn();
const docMock = jest.fn();
const getMock = jest.fn();
const whereMock = jest.fn(() => ({
  get: getMock,
}));
const analyticsRefMock = {
  where: whereMock,
  doc: docMock,
};
collectionMock.mockReturnValue(analyticsRefMock);
docMock.mockReturnValue({ set: jest.fn(), update: jest.fn() });

// Mock the Firestore database
const dbMock = {
  collection: collectionMock,
};

describe('storeUsersPerCohort', () => {
  it('should create a new document if no matching document is found', async () => {
    // Mock the input rows
    const rows = [
      {
        course_id: 'course_1',
        sections: [
          {
            section: 'section_1',
            students: 10,
            photoUrls: ['url1', 'url2'],
          },
        ],
      },
    ];

    // Mock the behavior of the get function to return an empty query snapshot
    getMock.mockResolvedValue({ empty: true });

    // Call the function
    await storeUsersPerCohort(dbMock, rows);

    // Verify the function behavior
    expect(dbMock.collection).toHaveBeenCalledWith('builds_analytics');
    expect(whereMock).toHaveBeenCalledWith('course_id', '==', 'course_1');
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(docMock).toHaveBeenCalledTimes(1);
    expect(docMock().set).toHaveBeenCalledWith({
      course_id: 'course_1',
      sections: [
        {
          section: 'section_1',
          students: 10,
          photoUrls: ['url1', 'url2'],
        },
      ],
    });
  });

  it('should update an existing document if a matching document is found', async () => {
    // Mock the input rows
    const rows = [
      {
        course_id: 'course_1',
        sections: [
          {
            section: 'section_1',
            students: 10,
            photoUrls: ['url1', 'url2'],
          },
        ],
      },
    ];

    // Mock the behavior of the get function to return a non-empty query snapshot
    const nonEmptyQuerySnapshotMock = {
      empty: false,
      docs: [
        {
          ref: {
            update: jest.fn(),
          },
        },
      ],
    };
    getMock.mockResolvedValue(nonEmptyQuerySnapshotMock);

    // Call the function
    await storeUsersPerCohort(dbMock, rows);

    // Verify the function behavior
    expect(dbMock.collection).toHaveBeenCalledWith('builds_analytics');
    expect(whereMock).toHaveBeenCalledWith('course_id', '==', 'course_1');
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(docMock).toHaveBeenCalledTimes(2);
    expect(nonEmptyQuerySnapshotMock.docs[0].ref.update).toHaveBeenCalledWith({
      sections: [
        {
          section: 'section_1',
          students: 10,
          photoUrls: ['url1', 'url2'],
        },
      ],
    });
  });
});
