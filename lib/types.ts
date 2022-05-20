export type Size = {
    width: number;
    height: number;
};

export type Point = {
    x: number;
    y: number;
};

export type Shape = {
    label: string;
    poly: Point[];
};

export interface Processor {
    process(url: string, image: File, size: Size): Promise<Shape[]>
}
