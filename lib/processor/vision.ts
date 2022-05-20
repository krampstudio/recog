import type { Shape, Size, Processor } from '../types';

/**
 * Map objects received by the Vision API to Shapes
 * @param {Object[]} objectAnnotations - the list of annotations received from the API
 * @param {Size} size - the size of the image, required to calculate the position of the vertices in pixels
 * @returns {Shape[]} the list of shapes
 */
function mapObjectAnnotationsToShapes(
    objectAnnotations: any[],
    size: Size
): Shape[] {
    return objectAnnotations.map(objectAnnotation => ({
        label: `${objectAnnotation.name} ${(
            objectAnnotation.score * 100
        ).toFixed(3)}%`,
        poly: objectAnnotation.boundingPoly.normalizedVertices.map(vertice => ({
            x: vertice.x * size.width,
            y: vertice.y * size.height
        }))
    }));
}

/**
 * Encode a file to base64 using data url.
 * @param {File} file
 * @returns {Promise<string>} resolves with the b64 string
 */
function encodeFileToB64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.substr(result.indexOf(',') + 1));
        };
        reader.onerror = err => reject(err);
    });
}

/**
 * The processor for the GoogleCloud Vision API
 */
const visisionProcessor: Processor = {
    /**
     * Call the Vision API and return a list of shapes
     * @param {string} apiUrl - the vision api URL
     * @param {File} image
     * @param {Size} size - the size of the image, the size can be scaled as the shape points
     * @returns {Promise<Shape[]>} resolves with the shapes
     */
    async process(url: string, image: File, size: Size): Promise<Shape[]> {
        try {
            const encodedFile = await encodeFileToB64(image);
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requests: [
                        {
                            image: {
                                content: encodedFile
                            },
                            features: [
                                {
                                    maxResults: 10,
                                    type: 'OBJECT_LOCALIZATION'
                                }
                            ]
                        }
                    ]
                })
            });
            if (response.ok) {
                const result = await response.json();

                return mapObjectAnnotationsToShapes(
                    result?.responses[0]?.localizedObjectAnnotations,
                    size
                );
            }
            throw new Error(response.statusText);
        } catch (err) {
            throw new Error(err);
        }
    }
};

export default visisionProcessor;
