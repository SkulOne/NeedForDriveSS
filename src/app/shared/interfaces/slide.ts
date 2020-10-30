export interface Slide {
    title: string;
    subtitle: string;
    img: string;
    btnBackground: cssBackgroundClass;
}

type cssBackgroundClass =
    | 'green-background'
    | 'blue-background'
    | 'red-background'
    | 'violet-background';
