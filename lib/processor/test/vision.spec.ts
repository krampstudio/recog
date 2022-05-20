/**
 * @jest-environment jsdom
 */
import visisionProcessor from '../vision';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('The processore', () => {
    afterEach(() => {
        fetchMock.resetMocks();
    });
    it('calls the vision API and returns shapes', async () => {
        const responses = {
            responses: [
                {
                    localizedObjectAnnotations: [
                        {
                            name: 'cat',
                            score: 0.9876,
                            boundingPoly: {
                                normalizedVertices: [
                                    { x: 0, y: 10 },
                                    { x: 10, y: 10 },
                                    { x: 20, y: 20 },
                                    { x: 0, y: 20 }
                                ]
                            }
                        }
                    ]
                }
            ]
        };
        fetchMock.mockResponseOnce(JSON.stringify(responses), {
            status: 200
        });
        const image = new File(['content'], 'photo.jpg', {
            type: 'image/jpg'
        });
        const result = await visisionProcessor.process(
            'http://vision.foo.bar',
            image,
            { width: 100, height: 100 }
        );

        expect(result).toEqual([
            {
                label: 'cat 98.760%',
                poly: [
                    { x: 0, y: 1000 },
                    { x: 1000, y: 1000 },
                    { x: 2000, y: 2000 },
                    { x: 0, y: 2000 }
                ]
            }
        ]);
        expect(fetchMock.mock.calls).toHaveLength(1);
        expect(fetchMock).toHaveBeenCalledWith('http://vision.foo.bar', {
            body: JSON.stringify({
                requests: [
                    {
                        image: { content: 'Y29udGVudA==' },

                        features: [
                            { maxResults: 10, type: 'OBJECT_LOCALIZATION' }
                        ]
                    }
                ]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        });
    });
});
