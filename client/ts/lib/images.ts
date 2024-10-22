
export const images: {[key: string]: ImageInfo} = {};

export interface ImageInfo {
    image?: HTMLImageElement;
    loaded: boolean;
    loadPromise?: Promise<ImageInfo>;
}

/**
 * Asynchronously fetches an image.
 */
export function loadImage({name, path, extension = 'png'} : {name: string, path: string, extension?: string}): Promise<ImageInfo> {
    const promise = new Promise<ImageInfo>((resolve, reject) => {
        if (images.hasOwnProperty(name)) {
            throw new Error(`Already loaded image ${name}.`);
        }

        if (!path.endsWith('/')) {
            path = path + '/';
        }
        const imagePath = `${path}${name}.${extension}`;

        images[name] = {
            loaded: false,
            image: undefined,
        };

        const image = new Image();
        image.onload = () => {
            images[name].image = image;
            images[name].loaded = true;
            resolve(images[name]);
        }
        image.onerror = () => {
            reject(`Error loading image ${name}.`)
        }
        image.src = imagePath;
    });
    images[name].loadPromise = promise;
    return promise;
}

export const Images = {
    loadImage,
    images,
}