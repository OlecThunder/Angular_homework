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

  getSingleShortening(id: number): Shortening {
    return this.getShortenings()[id];
  }

  saveShortenings(shortening: Shortening): void {
    this.shortening.push(shortening);
    this.updateStorage(this.shortening);
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem("shortenings", JSON.stringify(shortenings));
  }

  deleteItem(deleteId: number): void {
    this.shortening = this.shortening.filter(
      (item, index) => index !== deleteId
    );
    this.updateStorage(this.shortening);
  }
}
