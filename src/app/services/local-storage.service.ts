import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    // Helper method to get and parse item from local storage
    getFromLocalStorage(key: string) {
        const item = localStorage.getItem(key);
        if (item) {
            try {
                return JSON.parse(item);
            } catch (error) {
                console.error(
                    `Error parsing ${key} from local storage:`,
                    error
                );
            }
        }
        return null;
    }

    // Helper method to set item to local storage
    setToLocalStorage(key: string, value: any) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting item ${key} to local storage:`, error);
        }
    }
}
