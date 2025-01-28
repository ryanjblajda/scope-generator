import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  public saveData(key: string, value:string):boolean {
    let success = false;
    try {
      localStorage.setItem(key, value);
      success = true;
    }
    catch(error) {
      console.log(`Error Saving Project Data: ${error}`);
    }
    return success;
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}