export function FormDataController<T extends object>(data: T) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value);
        } else {
            formData.append(key, String(value ?? ''));
        }
    });
    return formData;
}
