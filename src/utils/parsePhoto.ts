import { PhotoType } from "../types/userType";

export function parsePhoto<T extends { photo?: string | PhotoType }>(data: T) {
    let photoName: string | undefined;

    if (typeof data.photo === 'object' && data.photo !== null) {
        for (const key in data.photo) {
            if (Object.hasOwn(data.photo, key)) {
                const photo = data.photo[key];
                photoName = photo?.name;
                break;
            }
        }
    }

    return photoName;
}
