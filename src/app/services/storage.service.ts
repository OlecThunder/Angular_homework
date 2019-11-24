import { Shortening } from "./../models/shortening-response.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  shortening: Shortening[] = [];

  constructor() {
    this.shortening = this.getShortenings();
  }

  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem("shortenings");

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  getSingleShortening(id: string): Shortening {
    return this.getShortenings().filter(item => item.id === id)[0];
  }

  saveShortenings(shortening: Shortening): void {
    this.shortening.push(shortening);
    this.updateStorage(this.shortening);
  }

  updateStorage(shortenings: Shortening[]): void {
    debugger;
    localStorage.setItem("shortenings", JSON.stringify(shortenings));
  }

  deleteItem(deleteId: string): void {
    this.shortening = this.shortening.filter(item => item.id !== deleteId);
    this.updateStorage(this.shortening);
  }
}
